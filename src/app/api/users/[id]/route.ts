import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UserResponseDto } from '@/dto/user.dto';

function toUserResponseDto(user: any): UserResponseDto {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        country: user.country,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

// Get a single user by ID
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id, 10);
        
        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(toUserResponseDto(user), { status: 200 });
    } catch (e: any) {
        console.error('Error fetching user:', e);
        return NextResponse.json({ error: e.message ?? 'Server error' }, { status: 500 });
    }
}

// Delete a user by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id, 10);
        
        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        await prisma.user.delete({
            where: { id: userId }
        });

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (e: any) {
        console.error('Error deleting user:', e);
        return NextResponse.json({ error: e.message ?? 'Server error' }, { status: 500 });
    }
}

// Update a user by ID
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id, 10);
        
        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const data = await request.json();

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if username or email is being changed and if it's already taken
        if (data.username || data.email) {
            const existingUser = await prisma.user.findFirst({
                where: {
                    AND: [
                        { id: { not: userId } },
                        {
                            OR: [
                                data.username ? { username: data.username } : {},
                                data.email ? { email: data.email } : {}
                            ]
                        }
                    ]
                }
            });

            if (existingUser) {
                return NextResponse.json(
                    { error: 'Username or email already taken' },
                    { status: 409 }
                );
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                phoneNumber: data.phoneNumber,
                country: data.country,
            }
        });

        return NextResponse.json(toUserResponseDto(updatedUser), { status: 200 });
    } catch (e: any) {
        console.error('Error updating user:', e);
        return NextResponse.json({ error: e.message ?? 'Server error' }, { status: 500 });
    }
}
