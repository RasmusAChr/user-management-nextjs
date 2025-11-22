"use client"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    type?: 'success' | 'error' | 'info';
}

export default function Modal({ isOpen, onClose, title, description, type = 'info' }: ModalProps) {
    if (!isOpen) return null;

    const getIconAndColor = () => {
        switch (type) {
            case 'success':
                return {
                    icon: (
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-100'
                };
            case 'error':
                return {
                    icon: (
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-100'
                };
            default:
                return {
                    icon: (
                        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-100'
                };
        }
    };

    const { icon, bgColor, borderColor } = getIconAndColor();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    {/* Icon */}
                    <div className={`flex justify-center pt-3 pb-3 ${bgColor} ${borderColor} border-b`}>
                        {icon}
                    </div>
                    
                    {/* Header */}
                    <div className="px-6 pt-3 pb-3">
                        <h2 className="text-2xl font-semibold text-gray-900 text-center">
                            {title}
                        </h2>
                    </div>
                    
                    {/* Content */}
                    <div className="px-6 pb-6">
                        <p className="text-gray-600 text-base leading-relaxed text-center">
                            {description}
                        </p>
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                        <button
                            onClick={onClose}
                            className="px-8 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
