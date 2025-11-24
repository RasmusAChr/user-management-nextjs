'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchUsers } from '@/services/userService';
import { UserResponseDto } from '@/dto/user.dto';

export default function Dashboard() {
    const [users, setUsers] = useState<UserResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await fetchUsers();
            setUsers(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-light text-gray-900 tracking-tight">
                        User Management
                    </h1>
                    <Link href="/dashboard/add-user">
                        <button className="bg-gray-900 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                            + Add User
                        </button>
                    </Link>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-4">
                        <p className="font-medium">Error loading users</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Users Table */}
                {!loading && !error && (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        {users.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg mb-4">No users found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Username
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Country
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Created
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                                                onClick={() => window.location.href = `/dashboard/users/${user.id}`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                            {user.firstName[0]}{user.lastName[0]}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.firstName} {user.lastName}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {user.gender}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">@{user.username}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.country}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={`/dashboard/users/${user.id}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-gray-900 hover:text-gray-700 font-medium"
                                                    >
                                                        View Details →
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}