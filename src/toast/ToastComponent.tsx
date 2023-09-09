import React, { useEffect, useRef } from 'react'
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native'
import { useToast } from './ToastContext'

type ToastType = 'info' | 'error' | 'success'

interface Props {
    id: string
    type?: ToastType
    text1: string
    text2?: string
    autoHide?: boolean
    visibilityTime?: number
    onDismiss: () => void
    index: number
}

const ToastComponent: React.FC<Props> = ({
    id,
    type = 'info',
    text1,
    text2,
    autoHide = true,
    visibilityTime = 3000,
    onDismiss,
    index,
}) => {
    // Animated values
    const translateY = useRef(new Animated.Value(-70)).current
    const scaleValue = useRef(new Animated.Value(1 - index * 0.1)).current
    const offsetValue = useRef(new Animated.Value(index * 10)).current
    const shakeAnimation = useRef(new Animated.Value(0)).current

    const pan = useRef(new Animated.ValueXY()).current
    const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const { toastToShake } = useToast()

    // Animations
    const shake = () => {
        const sequence = [
            { toValue: 10 },
            { toValue: -10 },
            { toValue: 10 },
            { toValue: 0 },
        ].map((config) =>
            Animated.timing(shakeAnimation, {
                duration: 50,
                useNativeDriver: true,
                ...config,
            })
        )

        Animated.sequence(sequence).start()
    }

    const initiateDisappearAnimation = () => {
        Animated.timing(translateY, {
            toValue: -45,
            duration: 500,
            useNativeDriver: true,
        }).start(onDismiss)
    }

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: 45,
            tension: 60,
            friction: 7,
            useNativeDriver: true,
        }).start()

        if (autoHide) {
            visibilityTimeoutRef.current = setTimeout(
                initiateDisappearAnimation,
                visibilityTime
            )
        }

        return () => {
            if (visibilityTimeoutRef.current) {
                clearTimeout(visibilityTimeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (toastToShake === id) {
            shake()

            if (visibilityTimeoutRef.current) {
                clearTimeout(visibilityTimeoutRef.current)
                visibilityTimeoutRef.current = setTimeout(
                    initiateDisappearAnimation,
                    visibilityTime
                )
            }
        }
    }, [toastToShake])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scaleValue, {
                toValue: 1 - index * 0.1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(offsetValue, {
                toValue: index * 10,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start()
    }, [index])

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => pan.y.setValue(gestureState.dy),
        onPanResponderRelease: initiateDisappearAnimation,
    })

    return (
        <Animated.View
            {...(index === 0 ? panResponder.panHandlers : {})}
            style={[
                styles.toast,
                {
                    transform: [
                        { translateY: Animated.add(translateY, offsetValue) },
                        { translateX: shakeAnimation },
                        { scale: scaleValue },
                    ],
                }
            ]}
        >
            <View style={[styles.leftLine, styles[`${type}Line`]]}></View>
            <View style={{ flex: 1 }}>
                <Text style={[styles.title]}>{text1}</Text>
                {text2 && <Text style={styles.subtitle}>{text2}</Text>}
            </View>
        </Animated.View >
    )
}

export default ToastComponent

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16, // To position it from the top
        marginLeft: 16, // Add some margin from the sides
        marginRight: 16,
        padding: 10, // Reduced padding to make it a bit smaller
        borderRadius: 16, // Increased border-radius for bubble effect
        backgroundColor: 'white', // off-white     
        borderColor: 'transparent',
        elevation: 5, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#333', // dark gray
    },
    subtitle: {
        marginTop: 2,
        fontSize: 11,
        color: '#666', // gray
    },
    leftLine: {
        width: 4,
        height: '100%', // Take the full height of the parent toast
        marginRight: 15, // Add some space between the line and the content
    },
    infoLine: {
        backgroundColor: 'blue',
    },
    errorLine: {
        backgroundColor: 'red',
    },
    successLine: {
        backgroundColor: 'green',
    },
})


