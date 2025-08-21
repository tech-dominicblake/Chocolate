import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MessageItemProps {
    text: string;
    style?: any;
    textStyle?: 'normal' | 'large';
}

export default function MessageItem({ text, style, textStyle = 'normal' }: MessageItemProps) {
    return (
        <View style={[styles.messageBubble, style]}>
            <Text style={[styles.text, textStyle === 'large' && styles.largeText]}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    messageBubble: {
        backgroundColor: '#F5F5F5',
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
        color: '#000',
    },
    largeText: {
        fontWeight: '500',
        lineHeight: 22,
        maxWidth: '90%',
    },
});
