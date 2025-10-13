import { IMAGES } from '@/constants';
import { herChocoLevel, himChocoLevel } from '@/constants/Functions';
import { useAppThemeColor } from '@/hooks/useAppTheme';
import { useThemeContext } from '@/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const { setSelectedChocoIndex, consumedChocolates, currentTurn, level, round, playerAvatar, playerNames } = useGameStore();
    const [herchoco, setHerchoco] = useState<number>(0);
    const [himchoco, setHimchoco] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(round - 1);
    const scrollViewRef = useRef<ScrollView>(null);
    const { isDark } = useThemeContext();
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        setHerchoco(herChocoLevel(level));
        setHimchoco(himChocoLevel(level) + 6);
    }, [level]);

    // Auto-scroll to current round page when component loads or round changes
    useEffect(() => {
        const targetPage = round - 1; // Convert round to 0-based index
        if (targetPage >= 0 && targetPage < 2) {
            setCurrentPage(targetPage);
            scrollToPage(targetPage);
        }
    }, [round]);

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.round(contentOffsetX / screenWidth);
        setCurrentPage(pageIndex);
    };

    const scrollToPage = (pageIndex: number) => {
        scrollViewRef.current?.scrollTo({
            x: pageIndex * screenWidth,
            animated: true,
        });
    };

    const challenges1 = [
        {
            player1Item: require('../../../assets/images/choco2.png'), // Orange-yellow spherical
            number: 1,
            player2Item: require('../../../assets/images/choco2.png'), // Red heart-shaped
        },
        {
            number: 2,
            player1Item: require('../../../assets/images/choco4.png'), // Red heart-shaped
            player2Item: require('../../../assets/images/choco4.png'), // Cream heart-shaped
        },
        {
            number: 3,
            player1Item: require('../../../assets/images/choco8.png'), // Dark faceted with white speckles
            player2Item: require('../../../assets/images/choco8.png'), // Purple spherical with gold speckles
        },
        {
            number: 4,
            player1Item: require('../../../assets/images/choco3.png'), // Purple with orange ring
            player2Item: require('../../../assets/images/choco3.png'), // Blue with white speckles
        },
        {
            number: 5,
            player1Item: require('../../../assets/images/choco10.png'), // Green faceted with yellow speckles
            player2Item: require('../../../assets/images/choco10.png'), // Yellow faceted with dark speckles
        },
        {
            number: 6,
            player1Item: require('../../../assets/images/choco9.png'), // Dark grey with red swirl
            player2Item: require('../../../assets/images/choco9.png'), // Light grey with orange splash
        },
    ];
    const challenges2 = [
        {
            player1Item: require('../../../assets/images/choco5.png'), // Orange-yellow spherical
            number: 1,
            player2Item: require('../../../assets/images/choco5.png'), // Red heart-shaped
        },
        {
            number: 2,
            player1Item: require('../../../assets/images/choco1.png'), // Red heart-shaped
            player2Item: require('../../../assets/images/choco1.png'), // Cream heart-shaped
        },
        {
            number: 3,
            player1Item: require('../../../assets/images/choco7.png'), // Dark faceted with white speckles
            player2Item: require('../../../assets/images/choco7.png'), // Purple spherical with gold speckles
        },
        {
            number: 4,
            player1Item: require('../../../assets/images/choco9.png'), // Purple with orange ring
            player2Item: require('../../../assets/images/choco9.png'), // Blue with white speckles
        },
        {
            number: 5,
            player1Item: require('../../../assets/images/choco6.png'), // Green faceted with yellow speckles
            player2Item: require('../../../assets/images/choco6.png'), // Yellow faceted with dark speckles
        },
        {
            number: 6,
            player1Item: require('../../../assets/images/choco12.png'), // Dark grey with red swirl
            player2Item: require('../../../assets/images/choco12.png'), // Light grey with orange splash
        },
    ];

    const renderRoundContent = (challenges: any[], roundNumber: number) => {
        const isCurrentRound = roundNumber === round;
        const roundConsumedChocolates = consumedChocolates[roundNumber] || [];
        return (
            <View style={styles.roundContainer}>
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

                    {/* Challenges Table - Only show for rounds 1 and 2 */}
                    {roundNumber < 3 && (
                        <View style={styles.challengesContainer}>
                            {challenges.map((challenge, index) => (
                                <View key={challenge.number} style={styles.challengeRow}>
                                    <View style={styles.challengeItems}>
                                        <View style={styles.player1Container}>
                                            <TouchableOpacity
                                                style={styles.player1Item}
                                                activeOpacity={0.7}
                                            >
                                                {roundConsumedChocolates.includes(challenge.number) &&
                                                    <View style={styles.consumeTickContainer}>
                                                        <ConsumeTick gender='her' />
                                                    </View>
                                                }
                                                <Image
                                                    source={challenge.player1Item}
                                                    style={styles.chocolateItem}
                                                    resizeMode="contain"
                                                />
                                                {isCurrentRound && himchoco === challenge.number + 6 && !(level === 12 && consumedChocolates[2] && consumedChocolates[2].includes(12)) && round !== 3 && <View style={styles.herAvatarContainer}>
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
                                                activeOpacity={0.7}
                                            >
                                                {roundConsumedChocolates.includes(challenge.number + 6) &&
                                                    <View style={styles.consumeTickContainer}>
                                                        <ConsumeTick gender='him' />
                                                    </View>}
                                                <Image
                                                    source={challenge.player2Item}
                                                    style={styles.chocolateItem}
                                                    resizeMode="contain"
                                                />
                                                {isCurrentRound && himchoco === challenge.number + 6 && !(level === 12 && consumedChocolates[2] && consumedChocolates[2].includes(12)) && round !== 3 && <View style={styles.himAvatarContainer}>
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
                    )}

                    {/* Supergame Section - Only show on Round 2 */}
                    {roundNumber === 2 && (
                        <View style={styles.supergameSection}>
                            <View style={styles.supergameLineContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
                                    <View style={styles.supergameLine} />
                                    <View style={styles.supergameLine} />
                                </View>
                                <View style={styles.supergameLine2} />
                                <View style={styles.supergameLine} />
                            </View>
                            <TouchableOpacity
                                style={styles.supergameItem}
                                onPress={() => {
                                    // Handle supergame chocolate press
                                    console.log('Supergame chocolate pressed');
                                }}
                                activeOpacity={0.7}
                                disabled={level < 12}
                            >
                                <Image
                                    source={require('../../../assets/images/choco13.png')}
                                    style={styles.supergameChocolate}
                                    resizeMode="contain"
                                />
                                {/* Show her avatar when level is 12 or super game is active */}
                                {(level === 12 || round === 3) && (
                                    <View style={styles.supergameHerAvatarContainer}>
                                        <View style={[styles.speechBubble, { backgroundColor: isDark ? '#3C4047' : '#FFFFFF' }]}>
                                            <Image
                                                source={playerAvatar.her || IMAGES.IMAGES.avatarGirl1}
                                                style={styles.playerAvatar}
                                                resizeMode="contain"
                                            />
                                            <View style={[styles.leftSpeechBubbleTail, { borderLeftColor: isDark ? '#3C4047' : '#FFFFFF' }]} />
                                        </View>
                                    </View>
                                )}
                                {/* Show him avatar when his last chocolate is consumed or super game is active */}
                                {((level === 12 && consumedChocolates[2] && consumedChocolates[2].includes(12)) || round === 3) && (
                                    <View style={styles.supergameHimAvatarContainer}>
                                        <View style={[styles.speechBubble, { backgroundColor: isDark ? '#3C4047' : '#FFFFFF' }]}>
                                            <Image
                                                source={playerAvatar.him || IMAGES.IMAGES.avatarMan1}
                                                style={styles.playerAvatar}
                                                resizeMode="contain"
                                            />
                                            <View style={[styles.rightSpeechBubbleTail, { borderRightColor: isDark ? '#3C4047' : '#FFFFFF' }]} />
                                        </View>
                                    </View>
                                )}
                            </TouchableOpacity>
                            <Text style={styles.supergameTitle}>N°13 • Supergame</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: useAppThemeColor('background') }]}>
            <ScrollView>

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
                    <Text style={[styles.roundText, { color: useAppThemeColor('text') }]}>Round {currentPage + 1}/2</Text>
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

                {/* Horizontal Swipable Content */}
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    style={styles.horizontalScrollView}
                >
                    {renderRoundContent(challenges1, 1)}
                    {renderRoundContent(challenges2, 2)}
                </ScrollView>

                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                    <View style={styles.paginationDots}>
                        <TouchableOpacity
                            style={styles.paginationDot}
                            onPress={() => scrollToPage(0)}
                        >
                            <View style={currentPage === 0 ? styles.activePagenationDot : styles.pagenationDot} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.paginationDot}
                            onPress={() => scrollToPage(1)}
                        >
                            <View style={currentPage === 1 ? styles.activePagenationDot : styles.pagenationDot} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Back Button */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEFF2', // Light grey background like the design
    },
    roundContainer: {
        width: (Dimensions.get('window').width),
        flex: 1,
    },
    centerContainer: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 80,
        marginTop: 80,
    },
    horizontalScrollView: {
        flex: 1,
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    paginationDots: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    paginationDot: {
        padding: 8,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 51,
        paddingTop: 64,
        paddingBottom: 20,
        // justifyContent: 'center',
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
        width: "100%",
        justifyContent: 'space-between',
    },
    avatarContainer: {
        alignItems: 'center',
    },
    speechBubble: {
        // backgroundColor: '#3C4047',
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
    playerAvatar: {
        width: 24,
        height: 24,
        borderRadius: 16,
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
        width: "100%",
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
    supergameTopLine2: {
        width: '30%',
        height: 2,
        backgroundColor: '#CBD5E0', // Light grey line
        // marginBottom: 12,
        zIndex: 10
    },
    supergameLine2: {
        width: '100%',
        height: 2,
        backgroundColor: '#CBD5E0', // Light grey line
        alignSelf: 'center',
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
    menuButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
    roundText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
        top: 60,
    },
    pagenationDot: {
        width: 6,
        height: 6,
        borderRadius: 6,
        backgroundColor: '#CBD5E0',
    },
    activePagenationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#7E80F4',
        outlineColor: '#7E80F4',
        outlineOffset: 2,
        outlineStyle: 'solid',
        outlineWidth: 2,
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
