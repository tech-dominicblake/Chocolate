import { IMAGES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeToggle } from '../../hooks/useAppTheme';
import { useGameStore } from '../../state/useGameStore';


// Header component for game pages
const GameHeader = () => {
    const { round, level, currentTurn, playerNames } = useGameStore();
    const { isDark } = useThemeToggle();

    // Log when store values change
    React.useEffect(() => {
        console.log('GameHeader store values changed:', { round, level, currentTurn, playerNames });
    }, [round, level, currentTurn, playerNames]);

    // Mock user data - you can replace this with actual user data from your auth system
    const user = {
        name: playerNames?.her || 'Alexa',
        avatar: IMAGES.IMAGES.image7, // Using a chocolate image as placeholder
    };

    return (
        <View style={[styles.header, { 
            backgroundColor: isDark ? '#27282A' : '#FFFFFF', // Dark theme: #27282A, Light theme: original white
            borderBottomColor: isDark ? '#4B5563' : '#E5E5E5' // Dark theme: #4B5563, Light theme: original #E5E5E5
        }]}>
            {/* Left side - Game status and user info */}
            <View style={styles.leftSection}>
                {/* Game status */}
                <View style={styles.gameStatus}>
                    <Text style={[styles.roundText, { color: isDark ? '#9CA3AF' : '#9BA1A6' }]}>ROUND{round}</Text>
                    <Text style={[styles.separator, { color: isDark ? '#9CA3AF' : '#9BA1A6' }]}> • </Text>
                    <Text style={[styles.levelText, { color: isDark ? '#FF6B9D' : '#FF6B9D' }]}>LVL {level}</Text>

                </View>

                {/* User info */}
                <View style={styles.userInfo}>
                    <Image source={user.avatar} style={styles.avatar} />
                    <Text style={[styles.userName, { color: isDark ? '#FFFFFF' : '#000000' }]}>{user.name}</Text>
                </View>
            </View>

            {/* Right side - Action icons */}
            <View style={styles.rightSection}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="map-outline" size={24} color="#9BA1A6" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="cube-outline" size={24} color={isDark ? '#7F81F5' : '#9BA1A6'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/menu')}>
                    <Ionicons name="menu-outline" size={24} color="#9BA1A6" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Main layout component
export default function GameLayout() {
    const { isDark } = useThemeToggle();
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#27282A' : '#151718' }}>
            <Stack
                screenOptions={{
                    headerShown: true,
                    contentStyle: { backgroundColor: isDark ? '#27282A' : '#151718' },
                    header: () => <GameHeader />
                }}
            >
                <Stack.Screen name="prompt1" options={{
                    headerShown: true,
                }} />
                <Stack.Screen name="play" options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="stats" options={{
                    headerShown: false,
                }} />
                {/* b directory screens - no header */}
                <Stack.Screen name="b" options={{
                    headerShown: false,
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
        // backgroundColor: '#FFFFFF', // Removed to use conditional styling
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        // borderBottomColor: '#E5E5E5', // Removed to use conditional styling
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
        fontSize: 16,
        fontWeight: '700',
        color: '#9BA1A6',
    },
    separator: {
        fontSize: 16,
        color: '#9BA1A6',
        marginHorizontal: 4,
    },
    levelText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF6B9D', // Pink/magenta color as shown in the image
    },
    turnText: {
        fontSize: 14,
        fontWeight: '600',
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
