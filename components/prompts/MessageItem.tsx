import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MessageItemProps {
    text: string;
    style?: any;
    textStyle?: 'normal' | 'large';
    isDark?: boolean; // New prop for dark theme
}

export default function MessageItem({ text, style, textStyle = 'normal', isDark }: MessageItemProps) {
    return (
        <View style={[
            styles.messageBubble, 
            { 
                backgroundColor: isDark ? '#454952' : '#F5F5F5', // Dark theme: #454952, Light theme: original #F5F5F5
                borderBottomLeftRadius: isDark ? 0 : 20, // Dark theme: 0, Light theme: original 20
            },
            style // This will override the default background if a custom one is provided
        ]}>
            <Text style={[
                styles.text, 
                { color: isDark ? '#FFFFFF' : '#000000' },
                style,// Dark theme: white, Light theme: original black
                textStyle === 'large' && styles.largeText
            ]}>
                {text}
            </Text>
        </View>
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
});

