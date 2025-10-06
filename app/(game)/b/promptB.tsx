import CongratsChocoPage from "@/app/congratsChoco";
import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageItem from "@/components/prompts/MessageItem";
import { IMAGES } from '@/constants';
import { getPrompt } from "@/constants/Functions";
import { categoryTypes } from "@/constants/Prompts";
import { Message, ProcessingState } from "@/constants/Types";
import { useThemeToggle } from "@/hooks/useAppTheme";
import { useGameStore, useMessages } from "@/state/useGameStore";
import { supabase } from "@/utils/supabase";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Chocolate queue data - 25 chocolates total (12 her + 12 him + 1 super)
const chocolateQueue = [
    // Her chocolates (1-12) - Page 1
    { id: 1, image: require('../../../assets/images/choco2.png'), color: '#FF6B35' },
    { id: 2, image: require('../../../assets/images/choco4.png'), color: '#FF1744' },
    { id: 3, image: require('../../../assets/images/choco8.png'), color: '#6A1B9A' },
    { id: 4, image: require('../../../assets/images/choco3.png'), color: '#00BCD4' },
    { id: 5, image: require('../../../assets/images/choco10.png'), color: '#4CAF50' },
    { id: 6, image: require('../../../assets/images/choco9.png'), color: '#FF9800' },
    // Her chocolates (7-12) - Page 2
    { id: 7, image: require('../../../assets/images/choco10.png'), color: '#9C27B0' },
    { id: 8, image: require('../../../assets/images/choco9.png'), color: '#2196F3' },
    { id: 9, image: require('../../../assets/images/choco6.png'), color: '#795548' },
    { id: 10, image: require('../../../assets/images/choco11.png'), color: '#607D8B' },
    { id: 11, image: require('../../../assets/images/choco7.png'), color: '#E91E63' },
    { id: 12, image: require('../../../assets/images/choco4.png'), color: '#3F51B5' },
    // seperator
    { id: 0, image: null, color: '#FFFFFF' },
    // Him chocolates (13-18) - Page 1
    { id: 13, image: require('../../../assets/images/choco2.png'), color: '#FF6B35' },
    { id: 14, image: require('../../../assets/images/choco5.png'), color: '#FF1744' },
    { id: 15, image: require('../../../assets/images/choco12.png'), color: '#6A1B9A' },
    { id: 16, image: require('../../../assets/images/choco2.png'), color: '#00BCD4' },
    { id: 17, image: require('../../../assets/images/choco3.png'), color: '#4CAF50' },
    { id: 18, image: require('../../../assets/images/choco8.png'), color: '#FF9800' },
    // Him chocolates (19-24) - Page 2
    { id: 19, image: require('../../../assets/images/choco11.png'), color: '#9C27B0' },
    { id: 20, image: require('../../../assets/images/choco3.png'), color: '#2196F3' },
    { id: 21, image: require('../../../assets/images/choco7.png'), color: '#795548' },
    { id: 22, image: require('../../../assets/images/choco8.png'), color: '#607D8B' },
    { id: 23, image: require('../../../assets/images/choco4.png'), color: '#E91E63' },
    { id: 24, image: require('../../../assets/images/choco1.png'), color: '#3F51B5' },
    // seperator
    { id: 0, image: null, color: '#FFFFFF' },
    // Super chocolate at the end
    { id: 25, image: require('../../../assets/images/choco13.png'), color: '#FF5722' },
];

// Header component with chocolate queue
const GameHeader = () => {
    const { round, level, currentTurn, playerNames, selectedChocoIndex, herChoco, himChoco, consumedChocoInB, consumedChocolates, activeTooltip, playerAvatar } = useGameStore();
    const { isDark } = useThemeToggle();

    // Function to check if a chocolate is consumed based on its queue ID
    const isChocolateConsumed = (chocoId: number) => {
        // Map queue IDs to consumption tracking
        if (chocoId <= 6) {
            // Her chocolates 1-6 (Page 1)
            return consumedChocolates[1]?.includes(chocoId) || false;
        } else if (chocoId <= 12) {
            // Her chocolates 7-12 (Page 2)
            return consumedChocolates[2]?.includes(chocoId) || false;
        } else if (chocoId <= 18) {
            // Him chocolates 13-18 (Page 1)
            return consumedChocolates[1]?.includes(chocoId) || false;
        } else if (chocoId <= 24) {
            // Him chocolates 19-24 (Page 2)
            return consumedChocolates[2]?.includes(chocoId) || false;
        } else if (chocoId === 25) {
            // Super chocolate - check both pages for ID 13
            return consumedChocolates[1]?.includes(13) || consumedChocolates[2]?.includes(13) || false;
        }
        return false;
    };

    // Determine player turn text
    const getPlayerTurnText = () => {
        if (level % 2 === 1) {
            return playerNames?.her || 'FOR HER';
        } else {
            return playerNames?.him || 'FOR HIM';
        }
    };

    useEffect(() => {
        console.log('consumedChocoInB', consumedChocoInB);
    }, [consumedChocoInB]);

    return (
        <>
            <View style={[styles.header, { backgroundColor: isDark ? '#2D2F33' : '#FFFFFF', borderColor: isDark ? '#3C434E' : '#E5E5E5' }]}>
                {/* Left side - Game status and user info */}
                <View style={styles.leftSection}>
                    {/* Game status */}
                    <View style={styles.gameStatus}>
                        <Text style={styles.roundText}>ROUND {round}</Text>
                        <Text style={styles.separator}> • </Text>
                        <Text style={styles.levelText}>{getPlayerTurnText()}</Text>
                    </View>

                    {/* User info */}
                    <View style={styles.userInfo}>
                        {currentTurn === "her" ?
                            <Image source={playerAvatar.her || IMAGES.IMAGES.image12} style={styles.avatar} /> : <Image source={playerAvatar.him || IMAGES.IMAGES.image7} style={styles.avatar} />
                        }
                        <Text style={styles.userName}>{playerNames?.[currentTurn] || 'Alexa'}</Text>
                    </View>
                </View>

                {/* Right side - Action icons */}
                <View style={styles.rightSection}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="map-outline" size={24} color="#9BA1A6" />
                    </TouchableOpacity>

                    <View >
                        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(game)/b/chocoStats')}>
                            <Ionicons name="cube-outline" size={24} color={activeTooltip ? '#7E80F4' : '#9BA1A6'} />
                        </TouchableOpacity>
                        {activeTooltip && <View style={styles.speechBubbleTail} />}
                    </View>

                    <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/menu')}>
                        <Ionicons name="menu-outline" size={24} color="#9BA1A6" />
                    </TouchableOpacity>
                </View>

                {/* Speech Bubble - Production-safe positioning */}
                {activeTooltip && (
                    <View style={[
                        styles.speechBubbleContainer,
                    ]}>
                        <View style={styles.speechBubble}>
                            <Text style={styles.speechBubbleText}>Locate the floating Chocolate in the box</Text>
                        </View>
                    </View>
                )}

            </View>

            {/* Chocolate Queue */}
            <View style={[styles.chocolateQueue, { backgroundColor: isDark ? '#2D2F33' : '#FFFFFF' }]}>
                {/* Full-width selection line divided into segments */}
                <View style={styles.selectionLineContainer}>
                    {/* {chocolateQueue.map((choco, index) => (
                        <React.Fragment key={index}>
                            <View
                                style={[
                                    styles.selectionLineSegment,
                                    choco.id === selectedChocoIndex && styles.selectedSegment
                                ]}
                            />
                        </React.Fragment>
                    ))} */}
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.queueContainer}
                >
                    {chocolateQueue.map((choco, index) => (
                        <View key={index} style={styles.chocoItemContainer}>
                            <View
                                style={styles.chocoItem}
                            >
                                {choco.id === 0 ? (
                                    <Text style={styles.separator}> • </Text>
                                ) : consumedChocoInB.includes(choco.id) ? (
                                    <Image
                                        source={IMAGES.IMAGES.image14}
                                        style={styles.consumedChocoImage}
                                        resizeMode="contain"
                                    />
                                ) : (
                                    <Image
                                        source={choco.image}
                                        style={styles.chocoImage}
                                        resizeMode="contain"
                                    />
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Speech Bubble positioned under cube icon */}

        </>
    );
};

export default function PromptB() {
    const params = useLocalSearchParams();
    const pageRound = params.pageRound ? parseInt(params.pageRound as string) : null;
    const [gameStage, setGameStage] = useState(1);
    const [currentLevel] = useState(Number(params.level) || 1);
    const [playerChoice, setPlayerChoice] = useState<string | undefined>();
    const [showSuccessDelay, setShowSuccessDelay] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [isGamePaused, setIsGamePaused] = useState(false);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
    const scrollViewRef = useRef<ScrollView>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const { isDark } = useThemeToggle();

    const {
        setTaskCompleted,
        setActiveTooltip,
        selectedChocoIndex,
        currentTurn,
        consumeChocolate,
        consumedChocolates,
        stage,
        setRoundLevel,
        round,
        mode,
        level,
        enqueueGameInfoMessages,
        getMockMessageByKind,
        hasFailedOnce,
        setHasFailedOnce,
        incrementPlayerFailCount,
        setSheFailedTwice,
        sheFailedTwice,
        setCurrentTurn,
        setConsumedChocolatesEachCount,
        setFailSurvivedTask,
        setHimTimePerLevel,
        setHerTimePerLevel
    } = useGameStore();
    const { queue, enqueue, clear } = useMessages();

    // Enqueue game info messages when component mounts
    useEffect(() => {
        const initializeGame = async () => {
            setActiveTooltip(true);

            // Enqueue messages without waiting
            enqueueGameInfoMessages();

            // Shorter delay for better responsiveness
            await new Promise(resolve => setTimeout(resolve, 1000));

            setActiveTooltip(false);
        };

        initializeGame();
    }, []);

    // Timer functionality for both players
    useEffect(() => {
        // Start timer when it's any player's turn
        const start = Date.now();
        setStartTime(start);

        return () => {
            // Stop timer when component unmounts or turn changes
            if (startTime) {
                const end = Date.now();
                const timeSpent = end - start;
                setElapsedTime(timeSpent);

                // Save time for the appropriate player
                if (currentTurn === 'him') {
                    setHimTimePerLevel(level, timeSpent);
                } else if (currentTurn === 'her') {
                    setHerTimePerLevel(level, timeSpent);
                }
            }
        };
    }, [currentTurn, level]);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (queue.length > 0 && shouldAutoScroll) {
            // Small delay to ensure the message is rendered
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [queue, shouldAutoScroll]);

    // Handle scroll events to determine if auto-scroll should be enabled
    const handleScroll = (event: any) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
        setShouldAutoScroll(isAtBottom);
    };

    const handlePlayerChoice = async (choice: string, buttonType: 'success' | 'fail') => {
        if (buttonType === 'success') {
            enqueue({
                kind: 'userchoice' as const,
                body: choice,
                group: 'user_action' as const,
                meta: { buttonType } // Store the button type in meta for future use
            });
            const { data: prompt, error } = await supabase
                .from('content_items')
                .select('*')
                .ilike('category', `${categoryTypes.taskComplete}`);
            // .eq('challenges.name', `${genderTypes[currentTurn as keyof typeof genderTypes]}${Math.round(level / 2)}`);

            console.log('task complete prompt:', prompt);
            if (prompt) {
                const messages = getPrompt(prompt?.[0], 'prompt');
                for (const message of messages) {
                    await enqueue(message as Message);
                }
            }
        }
        if (buttonType === 'fail') {
            if (!hasFailedOnce) {
                setHasFailedOnce(true);
                await enqueue({
                    kind: 'userchoice' as const,
                    body: 'Nah, I bail.',
                    group: 'game_result' as const,
                    durationMs: 1000,
                });
                enqueue({
                    ...getMockMessageByKind('dare'),
                    group: 'game_result' as const,
                    durationMs: 1000,
                });
                const { data: dareData } = await supabase
                    .from('content_items')
                    .select('id, content, subContent_1, subContent_2, subContent_3, subContent_4, subContent_5, content_1_time, content_2_time, content_3_time, content_4_time, content_5_time, challenges!inner ( id, name )')
                    // .eq('metadata->>round', `Round ${round === 1 ? 'One' : 'Two'}`)
                    .ilike('category', `${categoryTypes.fail}`);
                // .eq('metadata->>gameType', `Game ${mode}`)
                // .eq('challenges.name', `${genderTypes[currentTurn]}${Math.round(level / 2)}`)

                if (dareData && dareData.length > 0) {
                    const randomIndex = Math.floor(Math.random() * dareData.length);
                    const messages = getPrompt(dareData[randomIndex], 'dare');
                    if (messages) {
                        for (const message of messages) {
                          // Split the message body by #end and filter out empty strings
                          const sentences = message.body.split('#end').filter(sentence => sentence.trim());
                          
                          // Enqueue each sentence as a separate message
                          for (const sentence of sentences) {
                            await enqueue({
                              ...message,
                              body: sentence.trim(),
                              durationMs: 2000,
                            } as Message);
                          }
                        }
                      }
                }
            } else {
                await enqueue({
                    kind: 'userchoice' as const,
                    body: 'I can\'t hang.',
                    group: 'game_result' as const,
                    durationMs: 1000,
                });
                const { data: failData } = await supabase
                    .from('content_items')
                    .select('id, content, subContent_1, subContent_2, subContent_3, subContent_4, subContent_5, content_1_time, content_2_time, content_3_time, content_4_time, content_5_time, challenges!inner ( id, name )')
                    .contains('metadata->tags', [`${categoryTypes.postFail}`]);
                // .eq('metadata->>round', `Round ${round === 1 ? 'One' : 'Two'}`)
                // .eq('metadata->>gameType', `Game ${mode}`)
                // .eq('challenges.name', `${genderTypes[currentTurn]}${Math.round(level / 2)}`)
                if (failData && failData.length > 0) {
                    const randomIndex = Math.floor(Math.random() * failData.length);
                    const messages = getPrompt(failData[randomIndex], 'fail');
                    for (const message of messages) {
                        await enqueue(message as Message);
                    }
                } else {
                    console.log('No fail message found');
                }
                if (currentTurn === 'her') {
                    setSheFailedTwice(true);
                }
                // enqueueGameInfoMessages();
                if (currentTurn === 'her') {
                    setSheFailedTwice(true);
                }
                setRoundLevel(level);
                setCurrentTurn(level + 1);
                setHasFailedOnce(false);
                router.push('/(game)/b/chocoStats');
            }
        }
    }

    const handleContinue = (gameState: ProcessingState) => {

        // Save time for both players when level completes
        if (startTime) {
            const end = Date.now();
            const timeSpent = end - startTime;

            if (currentTurn === 'him') {
                setHimTimePerLevel(level, timeSpent);
            } else if (currentTurn === 'her') {
                setHerTimePerLevel(level, timeSpent);
            }
        }

        if (round === 3) {
            router.push('/(game)/b/statsB');
            return;
        }
        if (gameState.gameSucceeded) {
            if (gameState.gameNewLevelStarted) {
                setShowCongrats(true);
                setTaskCompleted(currentTurn);
                setRoundLevel(level);
                setCurrentTurn(level + 1);
                setConsumedChocolatesEachCount();
                consumeChocolate(selectedChocoIndex, pageRound || 1); // Mark chocolate as consumed
                setTimeout(() => {
                    setShowCongrats(false);
                    router.push('/(game)/b/chocoStats');
                }, 2000);
                return;
            }
            setShowCongrats(true);
            setTaskCompleted(currentTurn);
            setConsumedChocolatesEachCount();
            console.log('About to consume chocolate:', selectedChocoIndex, 'pageRound:', pageRound, 'round:', round);
            consumeChocolate(selectedChocoIndex, pageRound || 1); // Mark chocolate as consumed
            setRoundLevel(level);
            setCurrentTurn(level + 1);
            setTimeout(() => {
                setShowCongrats(false);
                router.push('/(game)/b/chocoStats');
            }, 2000);
        } else if (gameState.gameSurvived) {
            setTaskCompleted(currentTurn);
            setConsumedChocolatesEachCount();
            consumeChocolate(selectedChocoIndex, pageRound || 1); // Mark chocolate as consumed
            setRoundLevel(level);
            setCurrentTurn(level + 1);
            setHasFailedOnce(false);
            // enqueueGameInfoMessages();
            router.push('/(game)/b/chocoStats');
        } else if (gameState.gameFailed) {
            setRoundLevel(level);
            setCurrentTurn(level + 1);
            // enqueueGameInfoMessages();
            router.push('/(game)/b/chocoStats');
        }
    };

    // Render messages from the queue using MessageItem component
    const renderMessages = () => {
        return queue.map((message, index) => {
            // Special handling for separator messages
            if (message.kind === 'separator') {
                return (
                    <MessageItem
                        key={message.id || index}
                        text={message.body}
                        isDark={isDark}
                        kind="separator"
                    />
                );
            }

            // Special handling for prompt messages (show title + body)
            if (message.kind === 'prompt' && message.title) {
                return (
                    <View key={message.id || index} style={styles.promptContainer}>
                        {/* Title */}
                        <MessageItem
                            text={message.title}
                            isDark={isDark}
                            textStyle="large"
                            kind="prompt"
                            isBody={false}
                        />
                        {/* Body */}
                        <MessageItem
                            text={message.body}
                            isDark={isDark}
                            textStyle="large"
                            kind="prompt"
                            isBody={true}
                        />
                    </View>
                );
            }
            // User choice messages - render on the right side
            if (message.kind === 'userchoice') {
                return (
                    <View key={message.id || index} style={styles.userChoiceContainer}>
                        <MessageItem
                            text={message.body}
                            isDark={isDark}
                            kind={message.kind}
                        />
                    </View>
                );
            }
            // Regular messages - render on the left side
            return (
                <View key={message.id || index} style={styles.regularMessageContainer}>
                    <MessageItem
                        text={message.body}
                        isDark={isDark}
                        kind={message.kind}
                    />
                </View>
            );
        });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#2D2F33' : '#FFFFFF' }]}>
            <GameHeader />
            <View style={{
                flex: 1,
                backgroundColor: isDark ? '#27282A' : '#EDEFF2',
                height: "100%"
            }}>
                <View style={styles.scrollWrapper}>
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.scrollContainer}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        scrollIndicatorInsets={{ bottom: 40 }}
                        indicatorStyle="black"
                        persistentScrollbar={true}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {renderMessages()}
                    </ScrollView>
                    {/* Fade effect overlay */}
                    <LinearGradient
                        colors={[isDark ? '#27282A' : '#EDEFF2', 'transparent']}
                        style={styles.fadeOverlay}
                        pointerEvents="none"
                    />
                </View>
                <ButtonContainer
                    onPlayerChoice={handlePlayerChoice}
                    onContinue={handleContinue}
                />
            </View>
            {showCongrats && (
                <View style={styles.congratsOverlay}>
                    <CongratsChocoPage />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEFF2',
    },
    header: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingTop: 52,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
    },
    leftSection: {
        flex: 1,
    },
    gameStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
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
        width: 24,
        height: 24,
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
        justifyContent: 'center',
        height: '100%',
        // marginTop: 8,
    },
    iconButton: {
        padding: 8,
        marginLeft: 8,
    },
    chocolateQueue: {
        backgroundColor: '#FFFFFF', // Light gray background as in screenshot
        paddingBottom: 17,
        // paddingHorizontal: 8,
    },
    queueContainer: {
        // paddingHorizontal: 8,
        // gap: 8,
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 40,
        minWidth: 40,
    },
    selectionLineContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 3,
        marginBottom: 8,
        borderRadius: 1.5,
        marginTop: -1
    },
    selectionLineSegment: {
        flex: 1,
        height: '100%',
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
        left: '50%',
        marginLeft: -8,
    },
    consumedChocoImage: {
        width: 24,
        height: 24,
    },
    scrollWrapper: {
        flex: 1,
        position: 'relative',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        paddingBottom: 40
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
        justifyContent: 'flex-end',
    },
    fadeOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 85,
    },
    speechBubbleContainer: {
        position: 'absolute',
        top: 110, // Position below the header
        right: 20, // Align with the right side where cube icon is
        zIndex: 9999, // Much higher z-index to ensure it's above everything
        elevation: 50, // Very high elevation for Android production builds
        // Additional production-specific properties
        backgroundColor: 'transparent', // Ensure no background conflicts
    },
    speechBubble: {
        backgroundColor: '#7E80F4',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        position: 'relative',
        width: '100%',
        // Add explicit border for production
        borderWidth: 1,
        borderColor: '#6366F1', // Slightly darker purple for border
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8, // For Android shadow
    },
    speechBubbleText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    speechBubbleTail: {
        position: 'absolute',
        bottom: -15,
        right: 8, // Position tail to point to cube icon
        width: 0,
        height: 0,
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderBottomWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#7E80F4',
        zIndex: 10000, // Even higher than speech bubble container
        elevation: 51, // Even higher elevation for Android production
    },
    // Android production-specific fix
    androidProductionFix: {
        position: 'absolute',
        top: 100, // Position below header
        right: 20, // Align with cube icon
        zIndex: 99999,
        elevation: 100,
        pointerEvents: 'box-none', // Allow touches to pass through
    },
    promptContainer: {
        marginBottom: 10,
    },
    userChoiceContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    regularMessageContainer: {
        marginBottom: 10,
    },
    congratsOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
    },
});