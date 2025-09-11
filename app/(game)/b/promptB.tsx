import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageItem from "@/components/prompts/MessageItem";
import { IMAGES } from '@/constants';
import { useThemeToggle } from "@/hooks/useAppTheme";
import { useGameStore, useMessages } from "@/state/useGameStore";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Chocolate queue data
const chocolateQueue = [
    { id: 1, image: require('../../../assets/images/choco1.png'), color: '#FF6B35' },
    { id: 2, image: require('../../../assets/images/choco2.png'), color: '#FF1744' },
    { id: 3, image: require('../../../assets/images/choco3.png'), color: '#6A1B9A' },
    { id: 4, image: require('../../../assets/images/choco4.png'), color: '#00BCD4' },
    { id: 5, image: require('../../../assets/images/choco5.png'), color: '#4CAF50' },
    { id: 6, image: require('../../../assets/images/choco6.png'), color: '#FF9800' },
    { id: 0, image: '', color: '#FF9800' },
    { id: 7, image: require('../../../assets/images/choco7.png'), color: '#9C27B0' },
    { id: 8, image: require('../../../assets/images/choco8.png'), color: '#2196F3' },
    { id: 9, image: require('../../../assets/images/choco9.png'), color: '#795548' },
    { id: 10, image: require('../../../assets/images/choco10.png'), color: '#607D8B' },
    { id: 11, image: require('../../../assets/images/choco11.png'), color: '#E91E63' },
    { id: 12, image: require('../../../assets/images/choco12.png'), color: '#3F51B5' },
    { id: 0, image: '', color: '#3F51B5' },
    { id: 13, image: require('../../../assets/images/choco13.png'), color: '#FF5722' },
];

// Header component with chocolate queue
const GameHeader = () => {
    const { round, level, currentTurn, playerNames, selectedChocoIndex, consumedChocolates, activeTooltip } = useGameStore();
    const { isDark } = useThemeToggle();

    // Determine player turn text
    const getPlayerTurnText = () => {
        if (level % 2 === 1) {
            return playerNames?.her || 'FOR HER';
        } else {
            return playerNames?.him || 'FOR HIM';
        }
    };

    return (
        <>
            <View style={[styles.header, { backgroundColor: isDark ? '#2D2F33' : '#FFFFFF', borderColor: isDark ? '#3C434E' : '#E5E5E5' }]}>
                {/* Left side - Game status and user info */}
                <View style={styles.leftSection}>
                    {/* Game status */}
                    <View style={styles.gameStatus}>
                        <Text style={styles.roundText}>ROUND {level}</Text>
                        <Text style={styles.separator}> • </Text>
                        <Text style={styles.levelText}>{getPlayerTurnText()}</Text>
                    </View>

                    {/* User info */}
                    <View style={styles.userInfo}>
                        {currentTurn === "her" ?
                            <Image source={IMAGES.IMAGES.image12} style={styles.avatar} /> : <Image source={IMAGES.IMAGES.image7} style={styles.avatar} />
                        }
                        <Text style={styles.userName}>{playerNames?.her || 'Alexa'}</Text>
                    </View>
                </View>

                {/* Right side - Action icons */}
                <View style={styles.rightSection}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="map-outline" size={32} color="#9BA1A6" />
                    </TouchableOpacity>

                    <View >
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="cube-outline" size={32} color={activeTooltip ? '#7E80F4' : '#9BA1A6'} style={styles.icon} />
                        </TouchableOpacity>
                        <View style={styles.speechBubbleTail} />
                    </View>

                    <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/menu')}>
                        <Ionicons name="menu-outline" size={32} color="#9BA1A6" />
                    </TouchableOpacity>
                </View>

                {/* Speech Bubble */}
                <View style={styles.speechBubbleContainer}>
                    <View style={styles.speechBubble}>
                        <Text style={styles.speechBubbleText}>Locate the floating Chocolate in the box</Text>
                    </View>
                </View>

            </View>

            {/* Chocolate Queue */}
            <View style={[styles.chocolateQueue, { backgroundColor: isDark ? '#2D2F33' : '#FFFFFF' }]}>
                {/* Full-width selection line divided into segments */}
                <View style={styles.selectionLineContainer}>
                    {chocolateQueue.map((choco, index) => (
                        <React.Fragment key={index}>
                            <View
                                style={[
                                    styles.selectionLineSegment,
                                    choco.id === selectedChocoIndex && styles.selectedSegment
                                ]}
                            >
                                <View style={choco.id === selectedChocoIndex && styles.bubbleTail} />
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
                        <View key={index} style={styles.chocoItemContainer}>
                            <View
                                style={styles.chocoItem}
                            >
                                {(choco.id !== 0) && (!consumedChocolates.includes(choco.id)) ? (
                                    <Image
                                        source={choco.image}
                                        style={styles.chocoImage}
                                        resizeMode="contain"
                                    />
                                ) : choco.id !== 0 && consumedChocolates.includes(choco.id) ? (
                                    <Image
                                        source={IMAGES.IMAGES.image14}
                                        style={styles.consumedChocoImage}
                                        resizeMode="contain"
                                    />
                                ) : (
                                    <Text style={styles.separator}> • </Text>
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
    const [gameStage, setGameStage] = useState(1);
    const [currentLevel] = useState(Number(params.level) || 1);
    const [playerChoice, setPlayerChoice] = useState<string | undefined>();
    const [showSuccessDelay, setShowSuccessDelay] = useState(false);

    const { isDark } = useThemeToggle();
    const {
        setTaskCompleted,
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
        setConsumedChocolatesEachCount
    } = useGameStore();

    const { queue, clear } = useMessages();
    const scrollViewRef = useRef<ScrollView>(null);

    // Enqueue game info messages when component mounts
    useEffect(() => {
        // Clear the queue first, then add new preset messages
        const { clear } = useMessages.getState();
        enqueueGameInfoMessages();

        // Reset fail state when page opens
        setHasFailedOnce(false);
    }, []);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (queue.length > 0) {
            // Small delay to ensure the message is rendered
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [queue]);

    // Reset game stage when level changes
    useEffect(() => {
        setGameStage(1);
    }, [currentLevel]);

    const handlePlayerChoice = (choice: string, buttonType: 'success' | 'fail') => {
        setPlayerChoice(choice);

        // Enqueue the user's choice as a message with button type
        const { enqueue } = useMessages.getState();
        {
            choice !== "Continue" && enqueue({
                kind: 'userchoice' as const,
                body: choice,
                group: 'user_action' as const,
                meta: { buttonType } // Store the button type in meta for future use
            });
        }

        if (buttonType === 'fail') {
            if (!hasFailedOnce) {
                setHasFailedOnce(true);
                // First fail: show dare message and new prompt
                const dareMessage = getMockMessageByKind('dare');
                if (dareMessage) {
                    enqueue(dareMessage);
                }
                // Get a new prompt message (second prompt from mock data)
                const newPromptMessage = getMockMessageByKind('prompt');
                if (newPromptMessage) {
                    // Add a small delay before showing the new prompt
                    setTimeout(() => {
                        enqueue(newPromptMessage);
                    }, 2000); // 1 second delay between dare message and new prompt
                }
            } else {
                setHasFailedOnce(false);
                if (useGameStore.getState().currentTurn === 'her') {
                    setSheFailedTwice(true);
                } else if (useGameStore.getState().currentTurn === 'him' &&
                    sheFailedTwice.state &&
                    sheFailedTwice.level === useGameStore.getState().level - 1) {
                    enqueue(getMockMessageByKind('fail'));
                    setTimeout(() => {
                        router.push('/final');
                    }, 2000);
                    return;
                }
                // Second fail: show fail message and navigate to stats
                const failMessage = getMockMessageByKind('fail');
                if (failMessage) {
                    enqueue(failMessage);
                }

                // Navigate to stats after fail message has been visible for 2 seconds
                setTimeout(() => {
                    if (round === 3) {
                        router.push('/(game)/b/statsB');
                        return;
                    }
                    setRoundLevel(level);
                    const updatedLevel = useGameStore.getState().level; // Get fresh level from store
                    setCurrentTurn(updatedLevel); // Use updated level instead of old level
                    router.push('/(game)/b/chocoStats');
                }, 2000);
            }
        }

        if (buttonType === 'success') {
            if (choice === "LET'S GET MESSY" && !hasFailedOnce) {
                setTaskCompleted(currentTurn);
                setConsumedChocolatesEachCount();

                const successMessage = getMockMessageByKind('success');
                if (successMessage) {
                    enqueue(successMessage);
                }
            }
            if (choice === "Continue") {
                setTimeout(() => {
                    if (round === 3) {
                        router.push('/(game)/b/chocoStats');
                        return;
                    } else {
                        router.push('/congratsChoco');
                    }
                    consumeChocolate(selectedChocoIndex);
                    setRoundLevel(level);
                    const updatedLevel = useGameStore.getState().level;
                    setCurrentTurn(updatedLevel);
                    enqueueGameInfoMessages();
                    setHasFailedOnce(false);
                }, 2000);
            }
            // If player failed once before succeeding, increment their fail count
            if (hasFailedOnce) {
                incrementPlayerFailCount(currentTurn);
                setTimeout(() => {
                    if (round === 3) {
                        router.push('/final');
                        return;
                    }
                    consumeChocolate(selectedChocoIndex);
                    setRoundLevel(level);
                    const updatedLevel = useGameStore.getState().level;
                    setCurrentTurn(updatedLevel);
                    setHasFailedOnce(false);
                    router.push('/congratsChoco');
                }, 2000);
            }
        }
    };

    const handleStageChange = (newStage: number) => {
        setGameStage(newStage);
    };

    // Render messages from the queue using MessageItem component
    const renderMessages = () => {
        return queue.map((message, index) => {
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
                        showsVerticalScrollIndicator={false}
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
                    onStageChange={handleStageChange}
                    onPlayerChoice={handlePlayerChoice}
                />
            </View>
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
        paddingHorizontal: 8,
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
        marginBottom: 15,
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
        top: 120, // Position below the header
        right: 20, // Align with the right side where cube icon is
        zIndex: 10,
    },
    speechBubble: {
        backgroundColor: '#7E80F4',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        position: 'relative',
        width: '100%',
        // maxWidth: 200,
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
        right: 16, // Position tail to point to cube icon
        width: 0,
        height: 0, 
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderBottomWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#7E80F4',
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
    icon: {
        fontSize: 38,
        fontWeight: '900',
    },
});