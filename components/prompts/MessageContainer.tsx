import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MessageItem from './MessageItem';

export default function MessageContainer() {
    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <MessageItem text="Game A" />
            <MessageItem text="Round 1" />
            <MessageItem text="Level 1 - for HER" />
            <MessageItem text="Paris Fashion Week 💋🤷‍♀️✨" />
            <MessageItem 
                text="Walk toward your partner in slow motion, chocolate in mouth — like you're closing Paris Fashion Week and he's a stunned fan in the front row. Lock eyes. Make it dramatic."
                textStyle="large"
                style={styles.largeMessage}
            />
            <MessageItem 
                text="Walk toward your partner in slow motion, chocolate in mouth — like you're closing Paris Fashion Week and he's a stunned fan in the front row. Lock eyes. Make it dramatic."
                textStyle="large"
                style={styles.largeMessage}
            />
            <MessageItem 
                text="Walk toward your partner in slow motion, chocolate in mouth — like you're closing Paris Fashion Week and he's a stunned fan in the front row. Lock eyes. Make it dramatic."
                textStyle="large"
                style={styles.largeMessage}
            />
            <MessageItem 
                text="Walk toward your partner in slow motion, chocolate in mouth — like you're closing Paris Fashion Week and he's a stunned fan in the front row. Lock eyes. Make it dramatic."
                textStyle="large"
                style={styles.largeMessage}
            />
            <MessageItem 
                text="Walk toward your partner in slow motion, chocolate in mouth — like you're closing Paris Fashion Week and he's a stunned fan in the front row. Lock eyes. Make it dramatic."
                textStyle="large"
                style={styles.largeMessage}
            />
            <MessageItem 
                text="Walk toward your partner in slow motion, chocolate in mouth — like you're closing Paris Fashion Week and he's a stunned fan in the front row. Lock eyes. Make it dramatic."
                textStyle="large"
                style={styles.largeMessage}
            />
            <MessageItem 
                text="Walk toward your partner in slow motion, chocolate in mouth — like you're closing Paris Fashion Week and he's a stunned fan in the front row. Lock eyes. Make it dramatic."
                textStyle="large"
                style={styles.largeMessage}
            />
            <MessageItem 
                text="Walk toward your partner in slow motion, chocolate in mouth — like you're closing Paris Fashion Week and he's a stunned fan in the front row. Lock eyes. Make it dramatic."
                textStyle="large"
                style={styles.largeMessage}
            />
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    contentContainer: {
        paddingTop: 20,
        paddingBottom: 40,
    },
    largeMessage: {
        maxWidth: '90%',
    },
});
