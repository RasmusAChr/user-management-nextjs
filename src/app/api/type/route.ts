import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Count total types
        const count = await prisma.type.count();

        if (count === 0) {
            return NextResponse.json({ message: 'No types found' }, { status: 404 });
        }

        // Fetch all types
        const types = await prisma.type.findMany();

        // Return types
        return NextResponse.json(types);
    } catch (error) {
        console.error('Error fetching types:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}