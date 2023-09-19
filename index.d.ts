declare module 'react-native-toastbox' {
    import { FC } from 'react';
    import { Toast } from './src/toast/ToastContext'

    export const ToastProvider: FC<{ children: React.ReactNode }>;

    export function useToast(): {
        showToast: (toast: Toast) => void;
        hideToast: (id: string) => void;
    };
}
