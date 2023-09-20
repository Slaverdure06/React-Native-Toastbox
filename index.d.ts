import { FC, ReactNode } from 'react';

// Toast Component
interface ToastProps {
    toast: Toast;
    onDismiss: () => void;
    index: number;
}

export const ToastComponent: FC<ToastProps>;

// ToastWrapper Component
export const ToastWrapper: FC;

// ToastContext and Provider
export type ToastType = 'info' | 'error' | 'success';

export interface Toast {
    id: string;
    type?: ToastType;
    text1: string;
    text2?: string;
    autoHide?: boolean;
    visibilityTime?: number;
    animationConfig?: {
        duration?: number;
        tension?: number;
        friction?: number;
    };
}

interface ToastContextType {
    toasts: Toast[];
    showToast: (toast: Toast) => void;
    hideToast: (id: string) => void;
    toastToShake: string | null;
}

export const ToastProvider: FC<{ children: ReactNode }>;

export const useToast: () => ToastContextType;
