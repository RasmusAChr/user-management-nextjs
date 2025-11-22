import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        const hashedPassword = await bcrypt.hash(data.password, 12);

        const user = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                phoneNumber: data.phoneNumber,
                country: data.country,
                passwordHash: hashedPassword,
            },
        });

        return NextResponse.json(user, { status: 201 });
  } catch (e: any) {
    console.error('Error creating user:', e);
    return NextResponse.json({ error: e.message ?? 'Server error' }, { status: 500 });
  }
}