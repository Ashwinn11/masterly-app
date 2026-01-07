'use client';

import { create } from 'zustand';

interface ConfirmationState {
    isOpen: boolean;
    title: string;
    message: string;
    confirm: () => void;
    cancel: () => void;
    openConfirmation: (options: {
        title: string;
        message: string;
        onConfirm: () => void;
        onCancel?: () => void;
    }) => void;
    closeConfirmation: () => void;
}

export const useConfirmationStore = create<ConfirmationState>((set) => ({
    isOpen: false,
    title: '',
    message: '',
    confirm: () => { },
    cancel: () => { },
    openConfirmation: ({ title, message, onConfirm, onCancel }) => {
        set({
            isOpen: true,
            title,
            message,
            confirm: () => {
                onConfirm();
                set({ isOpen: false });
            },
            cancel: () => {
                onCancel?.();
                set({ isOpen: false });
            },
        });
    },
    closeConfirmation: () => set({ isOpen: false }),
}));
