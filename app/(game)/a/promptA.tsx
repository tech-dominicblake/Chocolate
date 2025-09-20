import CongratsPage from "@/app/congrats";
import GameAHeader from "@/components/game/GameHeader";
import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageItem from "@/components/prompts/MessageItem";
import { ProcessingState } from "@/constants/Types";
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
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const { isDark } = useThemeToggle();
    const scrollViewRef = useRef<ScrollView>(null);

    const hasFailedOnce = useGameStore.getState().hasFailedOnce;
    const showBtns = useGameStore.getState().showBtns;
    const {
        currentTurn,
        round,
        level,
        setTaskCompleted,
        setRoundLevel,
        enqueueGameInfoMessages,
        getMockMessageByKind,
        setHasFailedOnce,
        consumeChocolate,
        setConsumedChocolatesEachCount,
        setSheFailedTwice,
        setCurrentTurn,
        resetConsumedChocolates,
        setActiveTooltip,
        setDidFinal,
    } = useGameStore();
    const { queue, enqueue, clear } = useMessages();

    useEffect(() => {
        const initializeGame = async () => {
            console.log('🚀 Starting game initialization - buttons should be disabled');
            setDidFinal(false)
            setButtonLoading(true);
            enqueueGameInfoMessages();
            setActiveTooltip(true);
            
            // Wait for the full duration
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            console.log('✅ Game initialization complete - buttons should be enabled');
            setActiveTooltip(false);
            setButtonLoading(false);
        };
        
        initializeGame();
    }, []);

    useEffect(() => {
        const handleRoundChange = async () => {
            setButtonLoading(true);
            resetConsumedChocolates();
            setActiveTooltip(true);
            
            // Wait for the full duration
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            setActiveTooltip(false);
            setButtonLoading(false);
        };
        
        handleRoundChange();
        round === 3 && setDidFinal(true)
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

    useEffect(() => {
        console.log('level state', level);
    }, [level]);

    const handlePlayerChoice = (choice: string, buttonType: 'success' | 'fail') => {
        setButtonLoading(true);
        if (buttonType === 'success') {
            enqueue({
                kind: 'userchoice' as const,
                body: choice,
                group: 'user_action' as const,
                meta: { buttonType } // Store the button type in meta for future use
            });
            const successMessage = getMockMessageByKind('success');
            if (successMessage) {
                enqueue(successMessage);
            }
        }
        if (buttonType === 'fail') {
            if (!hasFailedOnce) {
                setHasFailedOnce(true);
                enqueue({
                    kind: 'userchoice' as const,
                    body: 'Nah, I bail.',
                    group: 'game_result' as const,
                    durationMs: 1000,
                });
                const dareMessage = getMockMessageByKind('dare');
                if (dareMessage) {
                    enqueue(dareMessage);
                }
                const newPromptMessage = getMockMessageByKind('survive');
                if (newPromptMessage) {
                    enqueue(newPromptMessage);
                }
            } else {
                const failMessage = getMockMessageByKind('fail');
                if (failMessage) {
                    enqueue(failMessage);
                }
                enqueueGameInfoMessages();
                if (currentTurn === 'her') {
                    setSheFailedTwice(true);
                }
                setRoundLevel(level);
                setCurrentTurn(level + 1);
                setHasFailedOnce(false);
            }

        }
        setButtonLoading(false);
    }

    const handleContinue = (gameState: ProcessingState) => {
        setButtonLoading(true);
        if (round === 3) {
            router.push('/(game)/a/statsA');
            setButtonLoading(false);
            return;
        }
        if (gameState.gameSucceeded) {
            if (gameState.gameNewLevelStarted) {
                setTaskCompleted(currentTurn);
                setRoundLevel(level);
                setCurrentTurn(level + 1);
                setConsumedChocolatesEachCount();
                enqueueGameInfoMessages();
                setButtonLoading(false);
                return;
            }
            setShowCongrats(true);
            setTimeout(() => {
                setShowCongrats(false);
                setTaskCompleted(currentTurn);
                setRoundLevel(level);
                setCurrentTurn(level + 1);
                setConsumedChocolatesEachCount();
                enqueueGameInfoMessages();
            }, 2000);
        } else if (gameState.gameSurvived) {
            setTaskCompleted(currentTurn);
            setRoundLevel(level);
            setCurrentTurn(level + 1);
            setConsumedChocolatesEachCount();
            setHasFailedOnce(false);
            enqueueGameInfoMessages();
        }
        consumeChocolate(currentTurn === 'her' ? Math.ceil(level / 2) : Math.ceil(level / 2) + 6);
        if (gameState.gameFailed) {
            setRoundLevel(level);
            setCurrentTurn(level + 1);
            enqueueGameInfoMessages();
        }
        setButtonLoading(false);
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
                    onPlayerChoice={handlePlayerChoice}
                    onContinue={handleContinue}
                    isGamePaused={isGamePaused}
                    loading={buttonLoading}
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
        zIndex: 1, // Lower z-index to ensure it stays below header elements
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
        zIndex: 1, // Lower z-index to ensure it stays below header elements
    },
    fadeOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
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
