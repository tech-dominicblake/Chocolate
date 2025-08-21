import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGameStore } from '../../state/useGameStore';

// Header component for game pages
const GameHeader = () => {
    const { round, level } = useGameStore();

    // Mock user data - you can replace this with actual user data from your auth system
    const user = {
        name: 'Alexa',
        avatar: require('../../assets/images/choco1.png'), // Using a chocolate image as placeholder
    };

    return (
        <View style={styles.header}>
            {/* Left side - Game status and user info */}
            <View style={styles.leftSection}>
                {/* Game status */}
                <View style={styles.gameStatus}>
                    <Text style={styles.roundText}>ROUND {round}</Text>
                    <Text style={styles.separator}> • </Text>
                    <Text style={styles.levelText}>LVL {level}</Text>
                </View>

                {/* User info */}
                <View style={styles.userInfo}>
                    <Image source={user.avatar} style={styles.avatar} />
                    <Text style={styles.userName}>{user.name}</Text>
                </View>
            </View>

            {/* Right side - Action icons */}
            <View style={styles.rightSection}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="map-outline" size={24} color="#9BA1A6" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="cube-outline" size={24} color="#9BA1A6" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="menu-outline" size={24} color="#9BA1A6" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Main layout component
export default function GameLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#151718' }}>
            <Stack
                screenOptions={{
                    headerShown: true,
                    contentStyle: { backgroundColor: '#151718' },
                    header: () => <GameHeader />
                }}
            >
                <Stack.Screen name="prompt1" options={{
                    headerShown: true,
                }} />
            </Stack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151718',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    leftSection: {
        flex: 1,
    },
    gameStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    roundText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#9BA1A6',
    },
    separator: {
        fontSize: 14,
        color: '#9BA1A6',
        marginHorizontal: 4,
    },
    levelText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B9D', // Pink/magenta color as shown in the image
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
        marginLeft: 8,
    },
});
