import CongratsPage from "@/app/congrats";
import GameAHeader from "@/components/game/GameHeader";
import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageItem from "@/components/prompts/MessageItem";
import { useThemeToggle } from "@/hooks/useAppTheme";
import { useGameStore, useMessages } from "@/state/useGameStore";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function Prompt() {
    const [gameStage, setGameStage] = useState(1);
    const [playerChoice, setPlayerChoice] = useState<string | undefined>();
    const [showSuccessDelay, setShowSuccessDelay] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [isGamePaused, setIsGamePaused] = useState(false);
    const { isDark } = useThemeToggle();
    const {
        setTaskCompleted,
        currentTurn,
        consumeChocolate,
        stage,
        setRoundLevel,
        round,
        mode,
        level,

        enqueueGameInfoMessages,
        getMockMessageByKind,
        setHasFailedOnce,
        incrementPlayerFailCount,
        setConsumedChocolatesEachCount,
        setSheFailedTwice,
        setCurrentTurn,
        sheFailedTwice,
        setSelectedMessy,
        setShowBtns
    } = useGameStore();

    const showBtns = useGameStore.getState().showBtns;
    const hasFailedOnce = useGameStore.getState().hasFailedOnce;

    const { queue, enqueue, clear } = useMessages();
    const scrollViewRef = useRef<ScrollView>(null);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    // Enqueue game info messages when component mounts
    useEffect(() => {
        // Clear the queue first, then add new preset messages
        enqueueGameInfoMessages();
        // Reset fail state when page opens
        setHasFailedOnce(false);
    }, []);

    // Check for round transition and show special prompt
    useEffect(() => {
        if (round === 2) {
            // Clear existing messages first
            // clear();
            // Pause the game and show special round 2 transition message
            setIsGamePaused(true);
            enqueue({
                kind: 'prompt' as const,
                body: "You survived the warm-up, ready for round 2?",
                group: 'game_info' as const,
                // durationMs: 3000
            });
        }
    }, [round]);

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

    const handlePlayerChoice = (choice: string, buttonType: 'success' | 'fail') => {
        // If game is paused, only allow continue action
        if (isGamePaused && choice !== "Continue") {
            return;
        }

        setPlayerChoice(choice);

        // Enqueue the user's choice as a message with button type
        {
            choice !== "Continue" && enqueue({
                kind: 'userchoice' as const,
                body: choice,
                group: 'user_action' as const,
                meta: { buttonType }, // Store the button type in meta for future use
                durationMs: 1000
            });
        }

        // If game is paused and choice is Continue, handle it and return early
        if (isGamePaused && choice === "Continue") {
            setIsGamePaused(false);
            enqueueGameInfoMessages();
            return;
        }

        if (round === 3 && (buttonType === 'success' || (buttonType === 'fail' && hasFailedOnce))) {
            enqueue(getMockMessageByKind('superGameCF'));

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
                    enqueue(newPromptMessage);
                }
            } else {
                setHasFailedOnce(false);
                setShowBtns(false);
                if (useGameStore.getState().currentTurn === 'her') {
                    setSheFailedTwice(true);
                } else if (useGameStore.getState().currentTurn === 'him' &&
                    sheFailedTwice.state &&

                    sheFailedTwice.level === useGameStore.getState().level - 1) {
                    enqueue(getMockMessageByKind('fail'));
                    setTimeout(() => {
                        router.push('/(game)/a/statsA');
                    }, 2000);
                    return;
                } else if (useGameStore.getState().currentTurn === 'him' &&
                    !(sheFailedTwice.state &&
                        sheFailedTwice.level === 12) && useGameStore.getState().level === 12) {

                    enqueue(getMockMessageByKind('superGameCF'));
                    setTimeout(() => {
                    }, 2000);
                    return;
                }



                // Second fail: show fail message and navigate to stats
                const failMessage = getMockMessageByKind('fail');
                if (failMessage) {
                    enqueue(failMessage);
                }

                if (round === 3) {
                    router.push('/(game)/a/statsA');
                    return;
                }
                setRoundLevel(level);
                const updatedLevel = useGameStore.getState().level; // Get fresh level from store
                setCurrentTurn(updatedLevel);
                enqueueGameInfoMessages();

            }
            setShowBtns(true);
        }

        if (buttonType === 'success') {
            setShowBtns(false);

            if (choice === "LET'S GET MESSY" && !hasFailedOnce) {
                setTaskCompleted(currentTurn);
                setConsumedChocolatesEachCount();

                const successMessage = getMockMessageByKind('success');
                if (successMessage) {
                    enqueue(successMessage);
                }
            }

            if (choice === "Continue") {
                if (round === 3) {
                    router.push('/(game)/a/statsA');
                    return;
                } else {
                    // Check if we're continuing from a paused state (new round)
                    if (isGamePaused) {
                        // Just resume the game without showing congrats
                        setIsGamePaused(false);
                        enqueueGameInfoMessages();
                    } else {
                        // Normal continue flow - show congrats
                        setShowCongrats(true);
                        
                        setTimeout(() => {
                            setShowCongrats(false);
                            setRoundLevel(level);
                            const updatedLevel = useGameStore.getState().level;
                            setCurrentTurn(updatedLevel);
                            setHasFailedOnce(false);
                            isGamePaused === false && enqueueGameInfoMessages();
                        }, 3000);
                    }
                }
            }

            if (hasFailedOnce) {
                incrementPlayerFailCount(currentTurn);
                setTimeout(() => {
                    if (round === 3) {
                        router.push('/(game)/a/statsA');
                        return;
                    }
                    setRoundLevel(level);
                    const updatedLevel = useGameStore.getState().level;
                    setCurrentTurn(updatedLevel);
                    setHasFailedOnce(false);
                    enqueueGameInfoMessages();
                }, 2000);
            }
            setShowBtns(true);
        }


    };

    const handleStageChange = (newStage: number) => {
        setGameStage(newStage);
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
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: isDark ? '#27282A' : '#151718',
        }}>
            <GameAHeader />
            <View style={{
                flex: 1,
                backgroundColor: isDark ? '#27282A' : '#EDEFF2',
                height: "100%"
            }}>
                <View style={styles.scrollContainer}>
                    <ScrollView
                        ref={scrollViewRef}
                        style={[styles.container, showBtns ? { paddingBottom: 80 } : {}]}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        scrollIndicatorInsets={{ bottom: 40 }}
                        indicatorStyle="black"
                        persistentScrollbar={true}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
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
                {showBtns && <ButtonContainer
                    onStageChange={handleStageChange}
                    onPlayerChoice={handlePlayerChoice}
                    isGamePaused={isGamePaused}
                />}
            </View>
            {showCongrats && (
                <View style={styles.congratsOverlay}>
                    <CongratsPage />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        position: 'relative',
    },
    container: {
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
        height: 80,
    },
    scrollIndicator: {
        width: 50,
        backgroundColor: '#FF0000',
        borderRadius: 2.5,
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
