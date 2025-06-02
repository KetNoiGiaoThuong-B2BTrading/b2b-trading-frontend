import React, { useState, useEffect } from 'react';
import { CheckCircle, Info, AlertCircle, AlertTriangle, X } from 'react-feather';

type ToastProps = {
    title: string;
    message: string;
    type?: 'success' | 'info' | 'warning' | 'error';
    duration?: number;
    onClose?: () => void;
};

const iconMap = {
    success: <CheckCircle className="h-6 w-6 text-green-500" />,
    info: <Info className="h-6 w-6 text-blue-500" />,
    warning: <AlertTriangle className="text-yellow-500" />,
    error: <AlertCircle className="h-6 w-6 text-red-500" />,
};

const borderMap = {
    success: 'border-green-500',
    info: 'border-blue-500',
    warning: 'border-yellow-500',
    error: 'border-red-500',
};

export const Toast: React.FC<ToastProps> = ({ title, message, type = 'info', duration = 5000, onClose }) => {
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        setExiting(true);
        const timer = setTimeout(() => {
            onClose?.();
        }, duration + 800);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    // useEffect(() => {
    //     if (exiting) {
    //         const timer = setTimeout(() => {
    //             onClose?.();
    //         }, 6300);

    //         return () => clearTimeout(timer);
    //     }
    // }, [exiting, ]);

    return (
        <div className="fixed top-4 right-4 z-[1000] space-y-2">
            <div
                className={`flex transform items-start rounded border-l-4 bg-white p-4 shadow-md transition-all duration-300 ${
                    borderMap[type]
                } ${exiting ? 'animate-slide-in' : 'animate-slide-out'}`}
            >
                <div className="mt-1 mr-3">{iconMap[type]}</div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm text-gray-700">{message}</p>
                </div>
                <button onClick={onClose} className="mt-1 ml-4 text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};
