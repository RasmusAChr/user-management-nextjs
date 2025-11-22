"use client"
import { useState } from 'react';
import countries from '@/data/countries.json';
import Link from 'next/link';
import { RegisterUserFormData, genderOptions } from '@/types/user';
import { createUser } from '@/services/userService';

export default function App() {
    const [formData, setFormData] = useState<RegisterUserFormData>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        country: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('User data:', formData);
        // Handle form submission here
        try {
            const created = await createUser(formData);
            console.log('User created successfully:', created);
        } catch (error) {
            console.error('Error creating user:', error);
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(156,163,175,0.3) 1px, transparent 0)',
                backgroundSize: '20px 20px'
            }}></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-200">
                        <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-extralight text-gray-900 mb-3 tracking-tight">
                        Add New User
                    </h1>
                    <p className="text-gray-600 text-lg font-light">
                        Create a new user account with complete information
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    {/* Account Information Section */}
                    <div className="p-8 border-b border-gray-100">
                        <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            Account Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter secure password"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="p-8 border-b border-gray-100">
                        <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                                    required
                                >
                                    <option value="">Select gender</option>
                                    {genderOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                </label>
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
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="p-8">
                        <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-end space-x-4">
                            <Link href="/dashboard">
                                <button
                                    type="button"
                                    className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer text-gray-900 placeholder-gray-500"
                                >
                                    Cancel
                                </button>
                            </Link>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 cursor-pointer text-gray-900 placeholder-gray-500"
                            >
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}