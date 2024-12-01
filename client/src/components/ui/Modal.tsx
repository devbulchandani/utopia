import React from 'react';

interface ModalProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-zinc-800 rounded-lg p-8 max-w-2xl w-full m-4 border border-zinc-700">
                <h2 className="text-2xl font-bold mb-6 text-zinc-100">{title}</h2>
                {children}
            </div>
        </div>
    );
};