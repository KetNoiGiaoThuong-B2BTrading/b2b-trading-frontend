import { X } from 'react-feather';
import { ReactNode } from 'react';

interface GenericModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    footer?: ReactNode;
    widthClass?: string;
}

export default function GenericModal({
    isOpen,
    title,
    onClose,
    children,
    footer,
    widthClass = 'max-w-2xl',
}: GenericModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center">
            {/* Overlay background */}
            <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
            {/* Modal content */}
            <div
                className={`scrollbar-custom relative z-10 w-full rounded-xl bg-white p-6 shadow-lg ${widthClass} max-h-[90vh] overflow-y-auto`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:cursor-pointer hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div>{children}</div>

                {footer && <div className="mt-6 text-right">{footer}</div>}
            </div>
        </div>
    );
}
