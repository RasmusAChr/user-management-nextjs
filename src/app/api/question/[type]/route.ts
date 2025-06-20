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

// Set up cleanup interval (only once)
if (typeof global.cleanupInterval === 'undefined') {
    global.cleanupInterval = setInterval(cleanupOldSessions, CLEANUP_INTERVAL);
}

function generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ type: string }> }
) {
    try {
        // Await the params since they're now a Promise in Next.js 15
        const { type: typeParam } = await context.params;

        // Convert typeParam to number since it's the ID
        const typeId = parseInt(typeParam);
        if (isNaN(typeId)) {
            return NextResponse.json(
                { message: `Invalid type ID: ${typeParam}` },
                { status: 400 }
            );
        }

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

        // Count total questions of this type
        const totalCount = await prisma.question.count({
            where: { typeId: typeId }
        });

        if (totalCount === 0) {
            return NextResponse.json(
                { message: `No questions found for type ID: ${typeParam}` },
                { status: 404 }
            );
        }

        // Get available questions (exclude shown ones)
        const availableQuestions = await prisma.question.findMany({
            where: {
                typeId: typeId,
                id: {
                    notIn: Array.from(shownQuestions)
                }
            },
            select: { id: true }
        });

        let selectedQuestion;

        if (availableQuestions.length === 0) {
            // All questions of this type have been shown, reset the session and pick randomly
            shownQuestions.clear();

            // Get a random question from all questions of this type
            const randomIndex = Math.floor(Math.random() * totalCount);
            const randomQuestions = await prisma.question.findMany({
                where: { typeId: typeId },
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
            return NextResponse.json(
                { message: `No questions found for type ID: ${typeParam}` },
                { status: 404 }
            );
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
        console.error(`Error fetching random question of type:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}