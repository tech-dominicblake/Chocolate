import { ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActionButtonProps {
    title: string;
    onPress: () => void;
    variant: 'primary' | 'secondary';
    backgroundImage?: any;
    color?: string;
    loading?: boolean;
    disabled?: boolean;
    hide?: boolean;
}

export default function ActionButton({ 
    color, 
    title, 
    onPress, 
    variant, 
    backgroundImage, 
    loading = false, 
    disabled = false,
    hide = false
}: ActionButtonProps) {
    const handlePress = () => {
        if (loading || disabled) return;
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
                    <View style={styles.buttonContent}>
                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color={color || '#FFFFFF'} />
                                <Text style={[styles.buttonText, {color: `${color}`, marginLeft: 8}]}>
                                    {title}
                                </Text>
                            </View>
                        ) : (
                            <Text style={[styles.buttonText, {color: `${color}`}]}>
                                {title}
                            </Text>
                        )}
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[
                styles.button, 
                variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
                (loading || disabled) && styles.disabledButton
            ]}
            onPress={handlePress}
            activeOpacity={loading || disabled ? 1 : 0.8}
            disabled={loading || disabled}
        >
            <View style={styles.buttonContent}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#FFFFFF" />
                        <Text style={[styles.buttonText, {marginLeft: 8}]}>{title}</Text>
                    </View>
                ) : (
                    <Text style={styles.buttonText}>{title}</Text>
                )}
            </View>
        </TouchableOpacity>
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
    buttonImage: {
        width: '100%',
        height: '100%',
    },
    primaryButton: {
        backgroundColor: '#FF6B9D', // Pink color
        // paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginHorizontal: 16,
        // marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    secondaryButton: {
        backgroundColor: '#FF4757', // Red color
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
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
