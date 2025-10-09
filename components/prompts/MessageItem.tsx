import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface MessageItemProps {
    text: string;
    style?: any;
    textStyle?: 'normal' | 'large';
    isDark?: boolean; // New prop for dark theme, test
    kind: 'prompt' | 'dare' | 'truth' | 'super' | 'fail' | 'success' | 'survive' | 'info' | 'warning' | 'userchoice' | 'separator';
    isBody?: boolean; // New prop for determining if the message is body content
}

export default function MessageItem({ text, style, textStyle = 'normal', isDark, kind, isBody }: MessageItemProps) {
    // Determine if this is a user choice message
    const isUserChoice = kind === 'userchoice';
    const isSeparator = kind === 'separator';
    
    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(isUserChoice ? 50 : -50)).current;
    
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                speed: 9,
                bounciness: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);
    
    // Special handling for separator messages
    if (isSeparator) {
        return (
            <Animated.View 
                style={[
                    styles.separatorContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateX: slideAnim }]
                    }
                ]}
            >
                <View style={[
                    styles.separatorLine,
                    { backgroundColor: isDark ? '#444444' : '#E0E0E0' }
                ]} />
                <Text style={[
                    styles.separatorText,
                    { color: isDark ? '#777777' : '#828689' }
                ]}>
                    {text}
                </Text>
                <View style={[
                    styles.separatorLine,
                    { backgroundColor: isDark ? '#444444' : '#E0E0E0' }
                ]} />
            </Animated.View>
        );
    }
    
    return (
        <Animated.View 
            style={[
                styles.messageBubble, 
                { 
                    backgroundColor: isUserChoice 
                        ? '#FFB6C1' // Light pink for user choice messages
                        : (isDark ? '#454952' : '#F5F5F5'), // Dark theme: #454952, Light theme: original #F5F5F5
                    borderBottomLeftRadius: kind === 'prompt' ? 4 : 20, // Small radius for prompt tail
                    borderBottomRightRadius: isUserChoice ? 4 : 20, // Small radius for user choice messages
                    alignSelf: isUserChoice ? 'flex-end' : 'flex-start', // Right align user choice, left align others
                    opacity: fadeAnim,
                    transform: [{ translateX: slideAnim }]
                },
                style // This will override the default background if a custom one is provided
            ]}
        >
            <Text style={[
                styles.text, 
                { color: isUserChoice ? '#000000' : (isDark ? '#FFFFFF' : '#000000') }, // Black text for user choice, conditional for others
                style,// Dark theme: white, Light theme: original black
                textStyle === 'large' && styles.largeText
            ]}>
                {text}
            </Text>
            
            {/* Message tail for prompt messages - only show for body content */}
            {kind === 'prompt' && isBody && (
                <View style={[
                    styles.messageTail,
                    { 
                        borderTopColor: '#FF0000' // Red background for prompt tail
                    }
                ]} />
            )}
            
            {/* Message tail for user choice messages - right side */}
            {isUserChoice && (
                <View style={[
                    styles.userChoiceTail,
                    { 
                        borderTopColor: '#FFB6C1' // Light pink background for user choice tail
                    }
                ]} />
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    messageBubble: {
        // backgroundColor: '#F5F5F5', // Removed to use conditional styling
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginVertical: 4,
        marginHorizontal: 16,
        alignSelf: 'flex-start',
        maxWidth: '85%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        position: 'relative',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        // color: '#000', // Removed to use conditional styling
    },
    largeText: {
        fontWeight: '500',
        lineHeight: 22,
        maxWidth: '90%',
    },
    messageTail: {
        position: 'absolute',
        bottom: -8,
        left: 16,
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 8,
        borderColor: 'transparent',
        borderTopColor: '#FF0000', // Red background for prompt tail
    },
    userChoiceTail: {
        position: 'absolute',
        bottom: -8,
        right: 16,
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 8,
        borderColor: 'transparent',
        borderTopColor: '#FFB6C1', // Light pink background for user choice tail
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        // marginHorizontal: 16,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#999999',
    },
    separatorText: {
        fontSize: 12,
        color: '#999999',
        marginHorizontal: 12,
        fontWeight: '500',
    },
});

