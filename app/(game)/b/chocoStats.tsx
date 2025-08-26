import { IMAGES } from '@/constants';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGameStore } from '../../../state/useGameStore';
import { useAppThemeColor } from '@/hooks/useAppTheme';

interface ChocoStatsProps {
    route?: {
        params?: {
            currentLevel?: number;
        };
    };
}

export default function ChocoStats({ route }: ChocoStatsProps) {
    const currentLevel = route?.params?.currentLevel || 1;
    const { setSelectedChocoIndex } = useGameStore();

    const challenges = [
        {
            player1Item: require('../../../assets/images/choco1.png'), // Orange-yellow spherical
            number: 1,
            player2Item: require('../../../assets/images/choco2.png'), // Red heart-shaped
        },
        {
            number: 2,
            player1Item: require('../../../assets/images/choco3.png'), // Red heart-shaped
            player2Item: require('../../../assets/images/choco4.png'), // Cream heart-shaped
        },
        {
            number: 3,
            player1Item: require('../../../assets/images/choco5.png'), // Dark faceted with white speckles
            player2Item: require('../../../assets/images/choco6.png'), // Purple spherical with gold speckles
        },
        {
            number: 4,
            player1Item: require('../../../assets/images/choco7.png'), // Purple with orange ring
            player2Item: require('../../../assets/images/choco8.png'), // Blue with white speckles
        },
        {
            number: 5,
            player1Item: require('../../../assets/images/choco9.png'), // Green faceted with yellow speckles
            player2Item: require('../../../assets/images/choco10.png'), // Yellow faceted with dark speckles
        },
        {
            number: 6,
            player1Item: require('../../../assets/images/choco11.png'), // Dark grey with red swirl
            player2Item: require('../../../assets/images/choco12.png'), // Light grey with orange splash
        },
    ];

    const handleChocolatePress = (challengeNumber: number) => {
        console.log(`Chocolate challenge ${challengeNumber} pressed, navigating to promptB`);
        
        // Save the selected chocolate index to global state
        // Note: challengeNumber is 1-13, but array index is 0-12, so subtract 1
        const chocolateIndex = challengeNumber - 1;
        setSelectedChocoIndex(chocolateIndex);
        
        // Navigate to promptB
        router.push('/(game)/b/promptB');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: useAppThemeColor('background') }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.centerContainer}>
                    {/* Challenge Header */}

                    {/* Player Comparison */}
                    <View style={styles.playerComparison}>
                        <View style={styles.playerAvatar}>
                            <Image
                                source={IMAGES.IMAGES.image12}
                                style={styles.playerEmoji}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.challengeTitle}>Challenge</Text>
                        {/* <View style={styles.connectingLine} /> */}
                        <View style={styles.playerAvatar}>
                            <Image
                                source={IMAGES.IMAGES.image7}
                                style={styles.playerEmoji}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    {/* Challenges Table */}
                    <View style={styles.challengesContainer}>
                        {challenges.map((challenge, index) => (
                            <View key={challenge.number} style={styles.challengeRow}>
                                <View style={styles.challengeItems}>
                                    <TouchableOpacity
                                        style={styles.player1Item}
                                        onPress={() => handleChocolatePress(challenge.number)}
                                        activeOpacity={0.7}
                                    >
                                        <Image
                                            source={challenge.player1Item}
                                            style={styles.chocolateItem}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.challengeNumber}>
                                        <Text style={styles.challengeNumberText}>N°{challenge.number}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.player2Item}
                                        onPress={() => handleChocolatePress(challenge.number+6)}
                                        activeOpacity={0.7}
                                    >
                                        <Image
                                            source={challenge.player2Item}
                                            style={styles.chocolateItem}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Supergame Section */}
                    <View style={styles.supergameSection}>
                        <View style={styles.supergameLineContainer}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <View style={styles.supergameLine} />
                                <View style={styles.supergameLine} />
                            </View>
                            <View style={styles.supergameLine2} />
                            <View style={styles.supergameLine} />
                        </View>
                        <TouchableOpacity
                            style={styles.supergameItem}
                            onPress={() => handleChocolatePress(13)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={require('../../../assets/images/choco13.png')} // Red heart with gold speckles
                                style={styles.supergameChocolate}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text style={styles.supergameTitle}>N°13 • Supergame</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEFF2', // Light grey background like the design
    },
    centerContainer: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 28,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 51,
        paddingTop: 64,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    challengeTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568', // Dark grey
        textAlign: 'center',
        fontFamily: 'Inter',
    },
    playerComparison: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        width: '100%',
        justifyContent: 'space-between',
    },
    playerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    playerEmoji: {
        width: 24,
        height: 24,
    },
    connectingLine: {
        width: 50,
        height: 2,
        backgroundColor: '#CBD5E0', // Light grey line
        marginHorizontal: 16,
    },
    challengesContainer: {
        width: '100%',
        marginBottom: 24,
    },
    challengeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
        width: '100%',

    },
    challengeNumber: {
        width: 50,
        alignItems: 'center',
    },
    challengeNumberText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568', // Dark grey
    },
    challengeItems: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    player1Item: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    player2Item: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chocolateItem: {
        width: 64,
        height: 64,
    },
    supergameSection: {
        alignItems: 'center',
        marginTop: 16,
        width: '100%'
    },
    supergameLine: {
        width: 2,
        height: 16,
        backgroundColor: '#CBD5E0', // Light grey line
    },
    supergameLine2: {
        width: '100%',
        height: 2,
        backgroundColor: '#CBD5E0', // Light grey line
        // marginBottom: 12,
        zIndex: 10
    },
    supergameTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A5568', // Dark grey
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: 'Inter',
    },
    supergameItem: {
        width: 96,
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    supergameLineContainer: {
        paddingVertical: 12,
        paddingHorizontal:33,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    supergameChocolate: {
        width: 96,
        height: 96,
    },
});
