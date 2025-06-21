export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col items-center justify-center px-4">           
            {/* Main content */}
            <div className="relative z-10 text-center max-w-md w-full">
                {/* Logo/Icon */}
                <div className="mb-8 inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>

                {/* Heading */}
                <h1 className="text-5xl font-extralight text-gray-900 mb-3 tracking-tight">
                    User Management
                </h1>
                
                {/* Subtitle */}
                <p className="text-gray-600 text-lg mb-12 font-light leading-relaxed">
                    Manage accounts with ease
                </p>

                {/* Buttons */}
                <div className="space-y-4 w-full">
                    <button className="w-full bg-gray-900 text-white py-4 px-8 rounded-xl font-medium text-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                        Sign In
                    </button>
                </div>

                {/* Footer text */}
                <p className="text-gray-500 text-sm mt-8 font-light">
                    Created by <a href="https://github.com/RasmusAChr" className="text-gray-700 hover:text-gray-900 font-medium">RasmusAChr</a>.<br />
                </p>
            </div>
        </div>
    );
}