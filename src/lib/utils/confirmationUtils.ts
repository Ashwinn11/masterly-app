'use client';

import { create } from 'zustand';

interface ConfirmationState {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'default';
    confirm: () => void;
    cancel: () => void;
    openConfirmation: (options: {
        title: string;
        message: string;
        confirmText?: string;
        cancelText?: string;
        variant?: 'danger' | 'warning' | 'default';
        onConfirm: () => void;
        onCancel?: () => void;
    }) => void;
    closeConfirmation: () => void;
}

export const useConfirmationStore = create<ConfirmationState>((set) => ({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    variant: 'default',
    confirm: () => { },
    cancel: () => { },
    openConfirmation: ({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'default', onConfirm, onCancel }) => {
        set({
            isOpen: true,
            title,
            message,
            confirmText,
            cancelText,
            variant,
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
