import { View } from "react-native"
import ToastComponent from "./ToastComponent"
import { useToast } from "./ToastContext"
import React from "react"


export const ToastWrapper: React.FC = () => {
    const { toasts, hideToast } = useToast()

    return (
        <View className="absolute inset-x-0 top-5 flex justify-center">
            {toasts.map((toast, index) => (
                <ToastComponent
                    key={toast.id}
                    {...toast}
                    index={toasts.length - 1 - index}  // reverse the index for styling
                    onDismiss={() => hideToast(toast.id)}
                />
            ))}
        </View>
    )
}
