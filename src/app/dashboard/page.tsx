import Link from 'next/link';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col items-center justify-center px-4">
            <div className="relative z-10 text-center max-w-2xl w-full">
                {/* Header */}
                <h1 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
                    Dashboard
                </h1>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/dashboard/add-user">
                        <button className="bg-gray-900 text-white py-3 px-8 rounded-xl font-medium text-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                            Add User
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}