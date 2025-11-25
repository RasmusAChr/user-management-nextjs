'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { UpdateUserDto, UserResponseDto } from '@/dto/user.dto';
import { Gender } from '@/types/user';
import countries from '@/data/countries.json';
import { updateUser } from '@/services/userService';

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.id as string;
    
    const [user, setUser] = useState<UserResponseDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // For editing
    const [formData, setFormData] = useState<UpdateUserDto>({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            gender: '' as Gender,
            phoneNumber: '',
            country: ''
        });

    // When editing fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        loadUser();
    }, [userId]);

    const loadUser = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/users/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to load user');
            }
            const data = await response.json();
            setUser(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load user');
        } finally {
            setLoading(false);
        }
    };

    const loadEditingFields = async () => {
        try {
            if (user) {
                setFormData({
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    phoneNumber: user.phoneNumber,
                    country: user.country
                });
            }
        } catch (err: any) {
            alert(err.message || 'Failed to load editing fields');
        }
    }

    const handleEdit = async () => {
        await loadEditingFields();
        setIsEditing(true);
    }

    const handleSaveEdit = async () => {
        try {
            // If data is not changed, do nothing
            if (user &&
                formData.email === user.email &&
                formData.phoneNumber === user.phoneNumber &&
                formData.gender === user.gender &&
                formData.country === user.country) {
                setIsEditing(false);
                return;
            }

            const updatedUser = await updateUser(parseInt(userId, 10), formData);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error: any) {
            alert(error.message);
        }
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            router.push('/dashboard');
        } catch (err: any) {
            alert(err.message || 'Failed to delete user');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-4">
                        <p className="font-medium">Error loading user</p>
                        <p className="text-sm">{error || 'User not found'}</p>
                    </div>
                    <Link href="/dashboard" className="text-gray-900 hover:text-gray-700 font-medium">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
                    ← Back to Dashboard
                </Link>

                {/* User Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-12">
                        <div className="flex items-center">
                            <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600">
                                {user.firstName[0]}{user.lastName[0]}
                            </div>
                            <div className="ml-6 text-white">
                                <h1 className="text-3xl font-bold mb-1">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-blue-100">@{user.username}</p>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="px-8 py-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Email
                                </label>
                                { isEditing ? (
                                    <>
                                    <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter email"
                                    required
                                    />
                                    </>
                                    ) : (
                                    <>
                                    <p className="text-gray-900">{user.email}</p>
                                    </>
                                ) }
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Phone Number
                                </label>
                                    { isEditing ? (
                                    <>
                                    <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter phone number"
                                    required
                                    />
                                    </>
                                    ) : (
                                    <>
                                    <p className="text-gray-900">{user.phoneNumber}</p>
                                    </>
                                ) }
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Gender
                                </label>
                                    { isEditing ? (
                                    <>
                                    <input
                                    type="text"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter gender"
                                    required
                                    />
                                    </>
                                    ) : (
                                    <>
                                    <p className="text-gray-900 capitalize">{user.gender}</p>
                                    </>
                                ) }
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Country
                                </label>
                                { isEditing ? (
                                    <>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                                        required
                                        >
                                        <option value="">Select country</option>
                                        {countries.map((country: { code: string; name: string }) => (
                                            <option key={country.code} value={country.code}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                    </>
                                    ) : (
                                    <>
                                    <p className="text-gray-900">{user.country}</p>
                                    </>
                                ) }
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Created At
                                </label>
                                <p className="text-gray-900">
                                    {new Date(user.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Last Updated
                                </label>
                                <p className="text-gray-900">
                                    {(() => {
                                        console.log('User updatedAt:', user);
                                        return null;
                                    })()}
                                    {new Date(user.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-4">
                        { isEditing ? (
                        <>
                        <button 
                            onClick={handleSaveEdit}
                            className="bg-green-900 text-white py-2 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-green-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Save
                        </button>
                        </>
                        ) : (
                        <>
                        <button 
                            onClick={handleEdit}
                            className="bg-gray-900 text-white py-2 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Edit
                        </button>
                        
                        </>
                        ) }
                        { isEditing ? (
                        <>
                        <button 
                            onClick={handleCancelEdit}
                            className="bg-red-900 text-white py-2 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-red-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Cancel
                        </button>
                        </>
                        ) : (
                        <>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white py-2 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Delete User
                        </button>
                        </>
                    ) }
                    </div>
                </div>
            </div>
        </div>
    );
}
