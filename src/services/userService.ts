import { CreateUserDto, UpdateUserDto } from '@/dto/user.dto';

export async function createUser(data: CreateUserDto) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || response.statusText);
    }
    return response.json();
}

export async function updateUser (id: number, data: UpdateUserDto) {
    const response = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || response.statusText);
    }
    return response.json();
}

export async function fetchUsers() {
    const response = await fetch('/api/users', {
        method: 'GET',
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || response.statusText);
    }
    return response.json();
}