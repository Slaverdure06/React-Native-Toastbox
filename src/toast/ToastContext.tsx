import React, { createContext, ReactNode, useContext, useState } from 'react'
import { ToastWrapper } from './ToastWrapper'

// Type Definitions
export type ToastType = 'info' | 'error' | 'success'

export type Toast = {
    id: string
    type?: ToastType
    text1: string
    text2?: string
    autoHide?: boolean
    visibilityTime?: number
    animationConfig?: {
        duration?: number;
        tension?: number;
        friction?: number;
    };
}

type ToastContextType = {
    toasts: Toast[]
    showToast: (toast: Toast) => void
    hideToast: (id: string) => void
    toastToShake: string | null
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([])
    const [toastToShake, setToastToShake] = useState<string | null>(null)

    // Show a toast; if it exists, make it shake
    const showToast = (toast: Toast) => {
        const { id, type = 'info', text1, text2, autoHide = true, visibilityTime = 3000 } = toast

        if (toasts.some(existingToast => existingToast.id === id)) {
            setToastToShake(id)
            setTimeout(() => setToastToShake(null), 300)
            return
        }

        setToasts(prevToasts => [{ id, type, text1, text2, autoHide, visibilityTime }, ...prevToasts])
    }

    // Remove a toast by ID
    const hideToast = (id: string) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ toasts, showToast, hideToast, toastToShake }}>
            {children}
            <ToastWrapper />
        </ToastContext.Provider>
    )
}

// Custom hook for using the Toast context
export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
