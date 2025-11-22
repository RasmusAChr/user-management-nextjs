"use client"
import { useState } from 'react';
import countries from '@/data/countries.json';
import Link from 'next/link';
import { RegisterUserFormData, genderOptions } from '@/types/user';
import { createUser } from '@/services/userService';
import Modal from '@/components/modal';
import { hasCorrectEmailFormat } from '@/lib/utils';

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        description: '',
        type: 'info' as 'success' | 'error' | 'info'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Form validation: all fields must be filled and email must be valid
    const isFormValid = hasCorrectEmailFormat(formData.email.trim()) && Object.values(formData).every(val => String(val).trim() !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent submission if form is invalid (should not happen due to button disable)
        if (!isFormValid) return;
        
        try {
            const created = await createUser(formData);
            setModalConfig({
                title: 'Successfully Created User',
                description: 'The user has been created successfully and added to the system.',
                type: 'success'
            });
            setIsModalOpen(true);
        } catch (error: any) {
            console.error('Error creating user:', error);
            setModalConfig({
                title: 'Error',
                description: error.message,
                type: 'error'
            });
            setIsModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4">
            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalConfig.title}
                description={modalConfig.description}
                type={modalConfig.type}
            />
            <form onSubmit={handleSubmit} noValidate className="relative z-10 max-w-2xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/dashboard"
                    aria-label="Back to dashboard"
                    className="absolute -top-0 -left-0 inline-flex items-center gap-1 rounded-full px-3 py-2 bg-white/90 backdrop-blur border border-gray-200 text-xs font-medium text-gray-600 shadow-sm hover:text-gray-900 hover:bg-white transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </Link>
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-200">
                        <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-extralight text-gray-900 mb-3 tracking-tight">
                        Create User
                    </h1>
                    <p className="text-gray-600 text-lg font-light">
                        Fill in the details below to add a new member to your system
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
                                type="submit"
                                disabled={!isFormValid} // Disable submit button if form is invalid
                                aria-disabled={!isFormValid}
                                className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 active:translate-y-0 text-white ${
                                    isFormValid
                                        ? 'bg-gray-900 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
                                        : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            >
                                {isFormValid ? 'Add User' : 'Fill all fields'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}