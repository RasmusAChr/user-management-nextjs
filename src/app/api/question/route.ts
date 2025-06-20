import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// In-memory storage for shown questions per session
// Structure: Map<sessionId, Set<questionId>>
const sessionQuestions = new Map<string, Set<number>>();

// Clean up old sessions (run every hour)
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
const sessionTimestamps = new Map<string, number>();

// Cleanup function
const cleanupOldSessions = () => {
    const now = Date.now();
    for (const [sessionId, timestamp] of sessionTimestamps.entries()) {
        if (now - timestamp > SESSION_TIMEOUT) {
            sessionQuestions.delete(sessionId);
            sessionTimestamps.delete(sessionId);
        }
    }
};

// Extend global type to include cleanupInterval
declare global {
    // eslint-disable-next-line no-var
    var cleanupInterval: NodeJS.Timeout | undefined;
}

// Set up cleanup interval (only once)
if (typeof global.cleanupInterval === 'undefined') {
    global.cleanupInterval = setInterval(cleanupOldSessions, CLEANUP_INTERVAL);
}

function generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function GET(request: NextRequest) {
    try {
        // Get or create session ID
        let sessionId = request.cookies.get('quiz-session')?.value;

        if (!sessionId) {
            sessionId = generateSessionId();
        }

        // Update session timestamp
        sessionTimestamps.set(sessionId, Date.now());

        // Get shown questions for this session
        let shownQuestions = sessionQuestions.get(sessionId);
        if (!shownQuestions) {
            shownQuestions = new Set<number>();
            sessionQuestions.set(sessionId, shownQuestions);
        }

        // Get URL parameters for filtering by type
        const url = new URL(request.url);
        const typeId = url.pathname.split('/').pop();
        const isAllCategories = typeId === 'question'; // Base route means all categories

        const whereClause: { typeId?: number } = {};
        if (!isAllCategories && typeId && typeId !== 'all') {
            whereClause.typeId = parseInt(typeId);
        }

        // Count total questions (with filter if applicable)
        const totalCount = await prisma.question.count({
            where: whereClause
        });

        if (totalCount === 0) {
            return NextResponse.json({ message: 'No questions found' }, { status: 404 });
        }

        // Get available questions (exclude shown ones)
        const availableQuestions = await prisma.question.findMany({
            where: {
                ...whereClause,
                id: {
                    notIn: Array.from(shownQuestions)
                }
            },
            select: { id: true }
        });

        let selectedQuestion;

        if (availableQuestions.length === 0) {
            // All questions have been shown, reset the session and pick randomly
            shownQuestions.clear();

            // Get a random question from all questions
            const randomIndex = Math.floor(Math.random() * totalCount);
            const randomQuestions = await prisma.question.findMany({
                where: whereClause,
                skip: randomIndex,
                take: 1,
                include: {
                    answers: true,
                    type: true,
                },
            });
            selectedQuestion = randomQuestions[0];
        } else {
            // Pick a random question from available ones
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            const selectedId = availableQuestions[randomIndex].id;

            selectedQuestion = await prisma.question.findUnique({
                where: { id: selectedId },
                include: {
                    answers: true,
                    type: true,
                },
            });
        }

        if (!selectedQuestion) {
            return NextResponse.json({ message: 'No questions found' }, { status: 404 });
        }

        // Add question to shown questions
        shownQuestions.add(selectedQuestion.id);

        // Create response with session cookie
        const response = NextResponse.json(selectedQuestion);

        // Set session cookie (httpOnly for security, expires in 24 hours)
        response.cookies.set('quiz-session', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60, // 24 hours
            path: '/'
        });

        return response;

    } catch (error) {
        console.error('Error fetching random question:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}