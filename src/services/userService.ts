import { RegisterUserFormData } from '@/types/user';

export async function createUser(data: RegisterUserFormData) {
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