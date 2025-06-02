'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { Toast } from '../components/common/Toast';

type ToastProps = {
    title: string;
    message: string;
    type?: 'success' | 'info' | 'warning' | 'error';
};

type ToastContextType = {
    showToast: (props: ToastProps) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used inside ToastProvider');
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastProps | null>(null);

    const showToast = (props: ToastProps) => {
        setToast(props);
        setTimeout(() => setToast(null), 6000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast title={toast.title} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </ToastContext.Provider>
    );
};
