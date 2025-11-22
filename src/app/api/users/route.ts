import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Throw an error if user with username or email already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: data.username },
                    { email: data.email }
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User with this username or email already exists' }, { status: 409 });
        }

        // Hash the password before storing
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