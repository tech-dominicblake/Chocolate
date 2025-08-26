import { IMAGES } from '@/constants';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import ActionButton from '../../components/prompts/ActionButton';
import { useThemeToggle } from '../../hooks/useAppTheme';
import { useGameStore } from '../../state/useGameStore';

interface GameStats {
    chocolatesConsumed: { player1: string; player2: string };
    taskCompleted: { player1: string; player2: string };
    failsSuffered: { player1: string; player2: string };
    superGameSlayed: { player1: string; player2: string };
    avgTimePerRound: { player1: string; player2: string };
}

interface StatsScreenProps {
    route?: {
        params?: {
            gameStats?: GameStats;
            gameResult?: 'success' | 'failure';
            currentLevel?: number;
        };
    };
}

export default function StatsScreen({ route }: StatsScreenProps) {
    const { setRoundLevel, setCurrentTurn } = useGameStore();
    const { isDark } = useThemeToggle();

    // Default stats or use passed stats
    const defaultStats: GameStats = {
        chocolatesConsumed: { player1: '0/12', player2: '4/12' },
        taskCompleted: { player1: '0', player2: '1' },
        failsSuffered: { player1: '—', player2: '—' },
        superGameSlayed: { player1: 'No', player2: 'No' },
        avgTimePerRound: { player1: '—', player2: '44 sec' },
    };

    const gameStats = route?.params?.gameStats || defaultStats;
    const gameResult = route?.params?.gameResult || 'success';
    const currentLevel = route?.params?.currentLevel || 1;

    const handleContinue = () => {
        // Calculate next level and round
        const nextLevel = currentLevel + 1;
        let nextRound: number;

        if (nextLevel <= 6) {
            nextRound = 1;
        } else if (nextLevel <= 12) {
            nextRound = 2;
        } else {
            nextRound = 3;
        }

        console.log(`Setting game state for next level: Round ${nextRound}, Level ${nextLevel}`);

        // Update the game store state for the next level
        setRoundLevel(nextRound, nextLevel);

        // Set the current player turn (odd levels = HER, even levels = HIM)
        setCurrentTurn(nextLevel);

        console.log('Game state updated, navigating to next prompt...');

        // Navigate to different prompt pages based on level

        // Odd level - navigate to a/prompt2
        router.push({
            pathname: '/endPage',
            params: { level: nextLevel }
        });

    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#27282A' : '#EDEFF2' }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.centerContainer}>
                    {/* Title */}
                    <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>Game statistics</Text>

                    {/* Player Comparison Card */}
                    <View style={[styles.playerCard, {
                        backgroundColor: isDark ? '#374151' : '#FFFFFF' // Dark theme: #374151, Light theme: original white
                    }]}>
                        <Image source={IMAGES.IMAGES.image7} style={styles.playerEmoji} />
                        <Text style={[styles.playerText, { color: isDark ? '#9CA3AF' : '#000000' }]}>Player</Text>
                        <Image source={IMAGES.IMAGES.image12} style={styles.playerEmoji} />
                    </View>

                    {/* Statistics Table */}
                    <View style={styles.statsContainer}>
                        {/* Row 1: Chocolates Consumed */}
                        <View style={[styles.statRow, {
                            borderBottomColor: isDark ? '#4B5563' : '#6D788F' // Dark theme: #4B5563, Light theme: original #6D788F
                        }]}>
                            <Text style={[styles.leftValue, { color: isDark ? '#7F81F5' : '#3B82F6' }]}>{gameStats.chocolatesConsumed.player1}</Text>
                            <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#000000' }]}>CHOCOLATES CONSUMED</Text>
                            <Text style={[styles.rightValue, { color: isDark ? '#EC4899' : '#EC4899' }]}>{gameStats.chocolatesConsumed.player2}</Text>
                        </View>

                        {/* Row 2: Task Completed */}
                        <View style={[styles.statRow, {
                            borderBottomColor: isDark ? '#4B5563' : '#6D788F' // Dark theme: #4B5563, Light theme: original #6D788F
                        }]}>
                            <Text style={[styles.leftValue, { color: isDark ? '#7F81F5' : '#3B82F6' }]}>{gameStats.taskCompleted.player1}</Text>
                            <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#000000' }]}>TASK COMPLETED</Text>
                            <Text style={[styles.rightValue, { color: isDark ? '#EC4899' : '#EC4899' }]}>{gameStats.taskCompleted.player2}</Text>
                        </View>

                        {/* Row 3: Fails Suffered */}
                        <View style={[styles.statRow, {
                            borderBottomColor: isDark ? '#4B5563' : '#6D788F' // Dark theme: #4B5563, Light theme: original #6D788F
                        }]}>
                            <Text style={[styles.leftValue, { color: isDark ? '#7F81F5' : '#3B82F6' }]}>{gameStats.failsSuffered.player1}</Text>
                            <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#000000' }]}>FAILS SUFFERED</Text>
                            <Text style={[styles.rightValue, { color: isDark ? '#9CA3AF' : '#EC4899' }]}>{gameStats.failsSuffered.player2}</Text>
                        </View>

                        {/* Row 4: Super Game Slayed */}
                        <View style={[styles.statRow, {
                            borderBottomColor: isDark ? '#4B5563' : '#6D788F' // Dark theme: #4B5563, Light theme: original #6D788F
                        }]}>
                            <Text style={[styles.leftValue, { color: isDark ? '#7F81F5' : '#3B82F6' }]}>{gameStats.superGameSlayed.player1}</Text>
                            <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#000000' }]}>SUPER GAME SLAYED</Text>
                            <Text style={[styles.rightValue, { color: isDark ? '#EC4899' : '#EC4899' }]}>{gameStats.superGameSlayed.player2}</Text>
                        </View>

                        {/* Row 5: Avg. Time Per Round */}
                        <View style={[styles.statRow, {
                            borderBottomColor: isDark ? '#4B5563' : '#6D788F' // Dark theme: #4B5563, Light theme: original #6D788F
                        }]}>
                            <Text style={[styles.leftValue, { color: isDark ? '#7F81F5' : '#3B82F6' }]}>{gameStats.avgTimePerRound.player1}</Text>
                            <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#000000' }]}>AVG. TIME PER ROUND</Text>
                            <Text style={[styles.rightValue, { color: isDark ? '#EC4899' : '#EC4899' }]}>{gameStats.avgTimePerRound.player2}</Text>
                        </View>
                    </View>
                </View>

                {/* Continue Button */}
                <View style={styles.buttonContainer}>
                    <ActionButton
                        title="CONTINUE"
                        onPress={handleContinue}
                        variant="primary"
                        backgroundImage={require('../../assets/images/btn-bg1.png')}
                        color='#8B2756'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#EDEFF2', // Removed to use conditional styling
    },
    centerContainer: {
        marginVertical: 'auto',
        justifyContent: 'center',
        width: '100%',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 0,
        paddingBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 32,
        fontFamily: 'Inter',
    },
    playerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 12,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 8,
    },
    playerEmoji: {
        width: 32,
        height: 32,
    },
    playerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
    },
    statsContainer: {
        borderRadius: 12,
        width: '100%',
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#6D788F',
        marginHorizontal: 5
    },
    leftValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3B82F6', // Blue color for left column
        flex: 1,
        textAlign: 'left',
    },
    statLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
        flex: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    rightValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EC4899', // Pink color for right column
        flex: 1,
        textAlign: 'right',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 48,
        marginTop: 'auto',
    },
});
