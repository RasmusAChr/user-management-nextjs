import { RegisterUserFormData } from '@/types/user';

export async function createUser(data: RegisterUserFormData) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create user: ' + response.statusText);
    }
    return response.json();
}