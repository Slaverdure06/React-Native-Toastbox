import { StyleSheet, View } from "react-native"
import ToastComponent from "./ToastComponent"
import { useToast } from "./ToastContext"
import React from "react"


const ToastWrapper: React.FC = () => {
    const { toasts, hideToast } = useToast()

    return (
        <View style={styles.container}>
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

export default ToastWrapper

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        top: 5,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
});

