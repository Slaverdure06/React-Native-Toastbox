import React, { useEffect, useRef } from 'react'
import { Animated, PanResponder, Text, View } from 'react-native'
import { useToast } from './ToastContext'
import classNames from 'classnames'

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

        if (index === 0 && autoHide) {
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
    }, [index, autoHide]);


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
            className="absolute mx-4 mt-4 flex-row items-center rounded-2xl bg-white p-2.5 shadow-md shadow-black"
            style={[
                {
                    transform: [
                        { translateY: Animated.add(translateY, offsetValue) },
                        { translateX: shakeAnimation },
                        { scale: scaleValue },
                    ],
                }]}
        >
            <View
                className={classNames(
                    'mr-3 h-full w-1',
                    type === 'info' && 'bg-blue-500',
                    type === 'error' && 'bg-red-500',
                    type === 'success' && 'bg-green-500'
                )}
            ></View>
            <View style={{ flex: 1 }}>
                <Text className="text-[13px] font-bold text-gray-900">{text1}</Text>
                {text2 && (
                    <Text className="mt-0.5 text-[11px] text-gray-600">{text2}</Text>
                )}
            </View>
        </Animated.View>
    )
}

export default ToastComponent