import { IMAGES } from '@/constants';
import { useAppThemeColor } from '@/hooks/useAppTheme';
import { useThemeContext } from '@/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ConsumeTick from '../../../components/ConsumeTick';
import { useGameStore } from '../../../state/useGameStore';
interface ChocoStatsProps {
    route?: {
        params?: {
            currentLevel?: number;
        };
    };
}

export default function ChocoStats({ route }: ChocoStatsProps) {
    const currentLevel = route?.params?.currentLevel || 1;
    const { setSelectedChocoIndex, setHerChoco, setHimChoco, herChoco, himChoco, selectedChocoIndex, consumedChocolates, currentTurn, level, round, playerAvatar, playerNames } = useGameStore();
    const { isDark } = useThemeContext();

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

        // Save the selected chocolate index to global state
        // Note: challengeNumber is 1-13, but array index is 0-12, so subtract 1
        setSelectedChocoIndex(challengeNumber);
        if (currentTurn === 'her') {
            setHerChoco(challengeNumber);
        } else {
            setHimChoco(challengeNumber);
        }

        // Navigate to promptB
        router.push('/(game)/b/promptB');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: useAppThemeColor('background') }]}>
            {/* Back Button */}
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <View style={styles.backButtonContent}>
                        <ChevronLeft color={'#4A5568'} />
                        <Text style={styles.backButtonText}>BACK</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.roundText}>Round {round}/2</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <View style={styles.menuButtonContent}>
                        <Ionicons name="menu-outline" size={24} color="#9BA1A6" />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.centerContainer}>

                    {/* Player Comparison */}
                    <View style={styles.playerComparison}>
                        <View style={styles.supergameLineContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View style={styles.supergameTopLine2} />
                                <Text style={styles.challengeTitle}>Challenge</Text>
                                <View style={styles.supergameTopLine2} />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', bottom: 6, justifyContent: 'space-between', width: '100%' }}>
                                <View style={styles.supergameLine} />
                                <View style={styles.supergameLine} />
                            </View>
                        </View>
                    </View>

                    {/* Challenges Table - Hide only when both level is 12 AND round is 3 */}
                    <View style={styles.challengesContainer}>
                        {challenges.map((challenge, index) => (
                            <View key={challenge.number} style={styles.challengeRow}>
                                <View style={styles.challengeItems}>
                                    <View style={styles.player1Container}>
                                        <TouchableOpacity
                                            style={styles.player1Item}
                                            onPress={() => handleChocolatePress(challenge.number)}
                                            activeOpacity={0.7}
                                            disabled={consumedChocolates.includes(challenge.number) || currentTurn === 'him' || round === 2}
                                        >
                                            {consumedChocolates.includes(challenge.number) &&
                                                <View style={styles.consumeTickContainer}>
                                                    <ConsumeTick gender='her' />
                                                </View>
                                            }
                                            <Image
                                                source={challenge.player1Item}
                                                style={styles.chocolateItem}
                                                resizeMode="contain"
                                            />
                                            {(herChoco === challenge.number && (level < 12 && round !== 2)) && <View style={styles.herAvatarContainer}>
                                                <View style={[styles.speechBubble, { backgroundColor: isDark ? '#3C4047' : '#FFFFFF' }]}>
                                                    <Image
                                                        source={playerAvatar.her || IMAGES.IMAGES.avatarGirl1}
                                                        style={styles.playerAvatar}
                                                        resizeMode="contain"
                                                    />
                                                    <View style={[styles.leftSpeechBubbleTail, { borderLeftColor: isDark ? '#3C4047' : '#FFFFFF' }]} />
                                                </View>
                                            </View>}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.challengeNumber}>
                                        <Text style={styles.challengeNumberText}>N°{challenge.number}</Text>
                                    </View>
                                    <View style={styles.player2Container}>
                                        <TouchableOpacity
                                            style={styles.player2Item}
                                            onPress={() => handleChocolatePress(challenge.number + 6)}
                                            activeOpacity={0.7}
                                            disabled={consumedChocolates.includes(challenge.number + 6) || currentTurn === 'her'}
                                        >
                                            {consumedChocolates.includes(challenge.number + 6) &&
                                                <View style={styles.consumeTickContainer}>
                                                    <ConsumeTick gender='him' />
                                                </View>}
                                            <Image
                                                source={challenge.player2Item}
                                                style={styles.chocolateItem}
                                                resizeMode="contain"
                                            />
                                            {himChoco === challenge.number + 6 && round !== 2 && <View style={styles.himAvatarContainer}>
                                                <View style={[styles.speechBubble, { backgroundColor: isDark ? '#3C4047' : '#FFFFFF' }]}>
                                                    <Image
                                                        source={playerAvatar.him || IMAGES.IMAGES.avatarMan1}
                                                        style={styles.playerAvatar}
                                                        resizeMode="contain"
                                                    />
                                                    <View style={[styles.rightSpeechBubbleTail, { borderRightColor: isDark ? '#3C4047' : '#FFFFFF' }]} />
                                                </View>
                                            </View>}
                                        </TouchableOpacity>
                                    </View>
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
                            disabled={round < 3}
                        >
                            <Image
                                source={require('../../../assets/images/choco13.png')} // Red heart with gold speckles
                                style={styles.supergameChocolate}
                                resizeMode="contain"
                            />
                            {/* Show girl's avatar when level is 12 */}
                            {(level === 12 || round === 2) && (
                                <View style={styles.supergameHerAvatarContainer}>
                                    <View style={styles.speechBubble}>
                                        <Image
                                            source={playerAvatar.her || IMAGES.IMAGES.avatarGirl1}
                                            style={styles.playerAvatar}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                            )}
                            {/* Show boy's avatar when round is 3 */}
                            {round === 2 && (
                                <View style={styles.supergameHimAvatarContainer}>
                                    <View style={styles.speechBubble}>
                                        <Image
                                            source={playerAvatar.him || IMAGES.IMAGES.avatarMan1}
                                            style={styles.playerAvatar}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                            )}
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
        justifyContent: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    speechBubble: {
        borderColor: '#3C4047',
        borderRadius: 20,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    leftSpeechBubbleTail: {
        // borderColor: '#FFFFFF',
        position: 'absolute',
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderLeftWidth: 12,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        top: '50%',
        right: -6,
    },
    playerAvatar: {
        width: 24,
        height: 24,
        borderRadius: 16,
    },
    rightSpeechBubbleTail: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderRightWidth: 12,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        // bottom: -8,
        top: '50%',
        left: -6,
        // marginLeft: -8,
    },
    connectingLine: {
        width: 50,
        height: 2,
        backgroundColor: '#CBD5E0', // Light grey line
        marginHorizontal: 16,
    },
    consumeTickContainer: {
        position: 'absolute',
        top: -10,
        left: '50%',
        marginLeft: -13,
        zIndex: 10,
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
    player1Container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    player2Container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    player1Item: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    player2Item: {
        position: 'relative',
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
    supergameTopLine2: {
        width: '30%',
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
        paddingHorizontal: 33,
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
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 32,
        zIndex: 10,
        paddingHorizontal: 26,
    },
    backButton: {
        top: 60,
        zIndex: 10,
        backgroundColor: 'transparent',
        paddingVertical: 8,
        width: 50
    },
    backButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    backButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568',
        fontFamily: 'Inter',
        padding: 0,
        margin: 0,
    },
    herAvatarContainer: {
        position: 'absolute',
        top: 10,
        left: -50,
        bottom: 0,
        zIndex: 10,
    },
    himAvatarContainer: {
        position: 'absolute',
        top: 10,
        right: -50,
        bottom: 0,
        zIndex: 10,
    },
    menuButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    roundText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
        top: 60,
    },
    supergameHerAvatarContainer: {
        position: 'absolute',
        top: 10,
        left: -50,
        bottom: 0,
        zIndex: 10,
    },
    supergameHimAvatarContainer: {
        position: 'absolute',
        top: 10,
        right: -50,
        bottom: 0,
        zIndex: 10,
    },
});
