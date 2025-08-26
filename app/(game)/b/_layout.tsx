import { useThemeToggle } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGameStore } from '../../../state/useGameStore';

// Chocolate queue data
const chocolateQueue = [
    { id: 1, image: require('../../../assets/images/choco1.png'), color: '#FF6B35' },
    { id: 2, image: require('../../../assets/images/choco2.png'), color: '#FF1744' },
    { id: 3, image: require('../../../assets/images/choco3.png'), color: '#6A1B9A' },
    { id: 4, image: require('../../../assets/images/choco4.png'), color: '#00BCD4' },
    { id: 5, image: require('../../../assets/images/choco5.png'), color: '#4CAF50' },
    { id: 6, image: require('../../../assets/images/choco6.png'), color: '#FF9800' },
    { id: 7, image: require('../../../assets/images/choco7.png'), color: '#9C27B0' },
    { id: 8, image: require('../../../assets/images/choco8.png'), color: '#2196F3' },
    { id: 9, image: require('../../../assets/images/choco9.png'), color: '#795548' },
    { id: 10, image: require('../../../assets/images/choco10.png'), color: '#607D8B' },
    { id: 11, image: require('../../../assets/images/choco11.png'), color: '#E91E63' },
    { id: 12, image: require('../../../assets/images/choco12.png'), color: '#3F51B5' },
    { id: 13, image: require('../../../assets/images/choco13.png'), color: '#FF5722' },
];

export default function BLayout() {
    const { round, level, currentTurn, playerNames, selectedChocoIndex } = useGameStore();
    const [selectedChoco, setSelectedChoco] = useState(chocolateQueue[0]);
    const pathname = usePathname();
    const { isDark } = useThemeToggle();

    // Don't show header for chocoStats page
    const shouldShowHeader = !pathname.includes('chocoStats');

    const handleChocoSelect = (choco: typeof chocolateQueue[0]) => {
        setSelectedChoco(choco);
    };

    // Determine player turn text
    const getPlayerTurnText = () => {
        if (level % 2 === 1) {
            return playerNames?.her || 'FOR HER';
        } else {
            return playerNames?.him || 'FOR HIM';
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#2D2F33' : '#FFFFFF' }]}>
            {/* Header with game status and user info - hidden for chocoStats */}
            {shouldShowHeader && (
                <>
                    <View style={[styles.header, { backgroundColor: isDark ? '#2D2F33' : '#FFFFFF', borderColor: isDark ? '#3C434E' : '#E5E5E5' }]}>
                        {/* Left side - Game status and user info */}
                        <View style={styles.leftSection}>
                            {/* Game status */}
                            <View style={styles.gameStatus}>
                                <Text style={styles.roundText}>ROUND {round}</Text>
                                <Text style={styles.separator}> • </Text>
                                <Text style={styles.levelText}>{getPlayerTurnText()}</Text>
                                {/* Pink underline */}
                            </View>

                            {/* User info */}
                            <View style={styles.userInfo}>
                                <Text style={styles.avatar}>👧</Text>
                                <Text style={styles.userName}>{playerNames?.her || 'Alexa'}</Text>
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

                            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/menu')}>
                                <Ionicons name="menu-outline" size={24} color="#9BA1A6" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Chocolate Queue */}
                    <View style={[styles.chocolateQueue, { backgroundColor: isDark ? '#2D2F33' : '#FFFFFF' }]}>
                        {/* Full-width selection line divided into segments */}
                        <View style={styles.selectionLineContainer}>
                                                    {chocolateQueue.map((choco, index) => (
                            <React.Fragment key={choco.id}>
                                <View
                                    style={[
                                        styles.selectionLineSegment,
                                        index === selectedChocoIndex && styles.selectedSegment
                                    ]}
                                >
                                    <View style={ index === selectedChocoIndex && styles.bubbleTail} />
                                </View>
                            </React.Fragment>
                        ))}
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.queueContainer}
                        >
                            {chocolateQueue.map((choco, index) => (
                                <View key={choco.id} style={styles.chocoItemContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.chocoItem,
                                        ]}
                                        onPress={() => handleChocoSelect(choco)}
                                        activeOpacity={0.7}
                                    >
                                        <Image
                                            source={choco.image}
                                            style={styles.chocoImage}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </>
            )}

            {/* Stack Navigator for b directory screens */}
            <View style={styles.contentContainer}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: '#EDEFF2' }
                    }}
                >
                    <Stack.Screen name="chocoStats" options={{
                        headerShown: false,
                    }} />
                    <Stack.Screen name="promptB" />
                    <Stack.Screen name="round/index" />
                    <Stack.Screen name="round/board" />
                    <Stack.Screen name="stats" />
                    <Stack.Screen name="super" />
                </Stack>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEFF2',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        // borderBottomColor: '#E5E5E5',
    },
    leftSection: {
        flex: 1,
    },
    gameStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
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
    pinkUnderline: {
        position: 'absolute',
        bottom: -8,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#FF6B9D',
        borderRadius: 1,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        fontSize: 24,
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
        marginTop: 8,
    },
    iconButton: {
        padding: 8,
        marginLeft: 8,
    },
    chocolateQueue: {
        backgroundColor: '#FFFFFF', // Light gray background as in screenshot
        paddingBottom: 20,
        paddingHorizontal: 20,
        // marginTop: -1
        // borderBottomWidth: 1,
    },
    queueContainer: {
        width: '100%',
        justifyContent: 'space-between',
    },
    chocoItem: {
        alignItems: 'center',
    },
    chocoImage: {
        width: 24,
        height: 24,
    },
    contentContainer: {
        flex: 1,
    },
    chocoItemContainer: {
        alignItems: 'center',
    },
    selectionLineContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 3,
        marginBottom: 8,
        // backgroundColor: 'red', // Light gray base line
        borderRadius: 1.5,
        marginTop: -1
    },
    selectionLineSegment: {
        flex: 1,
        height: '100%',
        // borderRightWidth: 1,
        borderRightColor: '#FFFFFF',
    },
    selectedSegment: {
        backgroundColor: '#EB7AAF',
        position: 'relative' // Blue color for selected segment
    },
    bubbleTail: {
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderTopColor: '#EB7AAF',
        borderLeftWidth: 8,
        borderLeftColor: 'transparent',
        borderRightWidth: 8,
        borderRightColor: 'transparent',
        position: 'absolute',
        top: 0,
        transform: [{ translateX: '50%' }, { translateY: '0%' }],
    }
});
