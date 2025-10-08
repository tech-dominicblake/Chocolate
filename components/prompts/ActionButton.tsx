import { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface ActionButtonProps {
    title: string;
    onPress: () => void;
    variant: 'primary' | 'secondary';
    backgroundImage?: any;
    color?: string;
    loading?: boolean;
    disabled?: boolean;
    hide?: boolean;
    onButtonClick?: () => void; // Callback for when button is clicked (to stop heartbeat)
}

export default function ActionButton({ 
    color, 
    title, 
    onPress, 
    variant, 
    backgroundImage, 
    loading = false, 
    disabled = false,
    hide = false,
    onButtonClick
}: ActionButtonProps) {
    const { playCorkPop } = useSoundEffects();
    
    // Animation values
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const shimmerAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    
    // Pulse animation for loading state
    useEffect(() => {
        if (loading) {
            const pulseAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.05,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            );
            pulseAnimation.start();
            
            // Shimmer effect
            const shimmerAnimation = Animated.loop(
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                })
            );
            shimmerAnimation.start();
            
            return () => {
                pulseAnimation.stop();
                shimmerAnimation.stop();
            };
        } else {
            pulseAnim.setValue(1);
            shimmerAnim.setValue(0);
        }
    }, [loading]);
    
    const handlePress = () => {
        if (loading || disabled) return;
        
        // Stop heartbeat sound when button is clicked
        onButtonClick?.();
        
        // Button press animation
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
        
        // Play cork pop sound effect
        playCorkPop();
        
        // Execute the original onPress function
        onPress();
    };

    if (hide) {
        return null;
    }

    if (backgroundImage) {
        return (
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={loading || disabled ? 1 : 0.8}
                style={[
                    styles.buttonContainer,
                    (loading || disabled) && styles.disabledButton
                ]}
                disabled={loading || disabled}
            >
                <ImageBackground
                    source={backgroundImage}
                    style={styles.button}
                    imageStyle={styles.buttonImage}
                    resizeMode="stretch"
                >
                    <Animated.View style={[styles.buttonContent, { transform: [{ scale: scaleAnim }] }]}>
                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <View style={styles.spinnerContainer}>
                                    <ActivityIndicator 
                                        size="small" 
                                        color={color || '#FFFFFF'} 
                                        style={styles.spinner}
                                    />
                                    <View style={[styles.spinnerRing, { borderColor: `${color}20` }]} />
                                </View>
                                <Text style={[styles.buttonText, {color: `${color}`, marginLeft: 12}]}>
                                    {title}
                                </Text>
                            </View>
                        ) : (
                            <Text style={[styles.buttonText, {color: `${color}`}]}>
                                {title}
                            </Text>
                        )}
                    </Animated.View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    return (
        <Animated.View style={{ transform: [{ scale: loading ? pulseAnim : scaleAnim }] }}>
            <TouchableOpacity
                style={[
                    styles.button, 
                    variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
                    (loading || disabled) && styles.disabledButton,
                    loading && styles.loadingButton
                ]}
                onPress={handlePress}
                activeOpacity={loading || disabled ? 1 : 0.8}
                disabled={loading || disabled}
            >
                <View style={styles.buttonContent}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <View style={styles.spinnerContainer}>
                                <ActivityIndicator 
                                    size="small" 
                                    color="#FFFFFF" 
                                    style={styles.spinner}
                                />
                                <View style={styles.spinnerRing} />
                            </View>
                            <Text style={[styles.buttonText, {marginLeft: 12}]}>{title}</Text>
                        </View>
                    ) : (
                        <Text style={styles.buttonText}>{title}</Text>
                    )}
                </View>
                {loading && (
                    <Animated.View 
                        style={[
                            styles.shimmerOverlay,
                            {
                                opacity: shimmerAnim.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [0, 0.3, 0],
                                }),
                                transform: [{
                                    translateX: shimmerAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-100, 100],
                                    })
                                }]
                            }
                        ]} 
                    />
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        // marginHorizontal: 16,
        // marginVertical: 8,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: '100%',
    },
    buttonContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinner: {
        zIndex: 2,
    },
    spinnerRing: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF20',
        zIndex: 1,
    },
    loadingButton: {
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    shimmerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
    },
    buttonImage: {
        width: '100%',
        height: '100%',
    },
    primaryButton: {
        backgroundColor: '#FF6B9D', // Pink color
        paddingHorizontal: 24,
        borderRadius: 16,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E91E63', // Slightly darker pink for border
        shadowColor: '#FF6B9D',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    secondaryButton: {
        backgroundColor: '#FF4757', // Red color
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E53E3E', // Slightly darker red for border
        shadowColor: '#FF4757',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    disabledButton: {
        opacity: 0.7,
        pointerEvents: 'none',
    },
});
