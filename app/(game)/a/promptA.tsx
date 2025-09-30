import CongratsPage from "@/app/congrats";
import GameAHeader from "@/components/game/GameHeader";
import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageItem from "@/components/prompts/MessageItem";
import { getPrompt } from "@/constants/Functions";
import { categoryTypes } from "@/constants/Prompts";
import { Message, ProcessingState } from "@/constants/Types";
import { useThemeToggle } from "@/hooks/useAppTheme";
import { useGameStore, useMessages } from "@/state/useGameStore";
import { supabase } from "@/utils/supabase";
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
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    const { isDark } = useThemeToggle();
    const scrollViewRef = useRef<ScrollView>(null);

    const hasFailedOnce = useGameStore.getState().hasFailedOnce;
    const showBtns = useGameStore.getState().showBtns;
    const {
        currentTurn,
        round,
        level,
        failsSuffered,
        mode,
        setTaskCompleted,
        setRoundLevel,
        enqueueGameInfoMessages,
        getMockMessageByKind,
        setHasFailedOnce,
        consumeChocolate,
        setConsumedChocolatesEachCount,
        setSheFailedTwice,
        setCurrentTurn,
        setActiveTooltip,
        setDidFinal,
        setHimTimePerLevel,
        setHerTimePerLevel,
    } = useGameStore();
    const { queue, enqueue, clear } = useMessages();

    useEffect(() => {
        const initializeGame = async () => {
            setDidFinal(false)
            setButtonLoading(true);
            enqueueGameInfoMessages();
            setActiveTooltip(true);

            // Wait for the full duration
            await new Promise(resolve => setTimeout(resolve, 5000));

            setActiveTooltip(false);
            setButtonLoading(false);
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

    useEffect(() => {
        const handleRoundChange = async () => {
            setButtonLoading(true);
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

    const handlePlayerChoice = async (choice: string, buttonType: 'success' | 'fail') => {
        setButtonLoading(true);
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
                // .contains('metadata', { tags: [categoryTypes.taskComplete] }) // ✅ new filter
                .eq('category', `${categoryTypes.taskComplete}`);
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
                enqueue({
                    kind: 'userchoice' as const,
                    body: 'Nah, I bail.',
                    group: 'game_result' as const,
                    durationMs: 1000,
                });

                const { data: dareData } = await supabase
                    .from('content_items')
                    .select('id, content, subContent_1, subContent_2, subContent_3, subContent_4, subContent_5, content_1_time, content_2_time, content_3_time, content_4_time, content_5_time, challenges!inner ( id, name )')
                    .ilike('category', `%${categoryTypes.fail}%`);
                // .eq('metadata->>round', `Round ${round === 1 ? 'One' : 'Two'}`)
                // .eq('metadata->>gameType', `Game ${mode}`)
                // .eq('challenges.name', `${genderTypes[currentTurn]}${Math.round(level / 2)}`)

                if (dareData?.[0]?.['content']) {
                    const messages = getPrompt(dareData?.[0], 'dare');
                    for (const message of messages) {
                        await enqueue(message as Message);
                    }
                }
            } else {
                const { data: failData } = await supabase
                    .from('content_items')
                    .select('id, content, subContent_1, subContent_2, subContent_3, subContent_4, subContent_5, content_1_time, content_2_time, content_3_time, content_4_time, content_5_time, challenges!inner ( id, name )')
                    .ilike('category', `%${categoryTypes.postFail}%`);
                // .eq('metadata->>round', `Round ${round === 1 ? 'One' : 'Two'}`)
                // .eq('metadata->>gameType', `Game ${mode}`)
                // .eq('challenges.name', `${genderTypes[currentTurn]}${Math.round(level / 2)}`)
                if (failData?.[0]?.['content']) {
                    const messages = getPrompt(failData?.[0], 'fail');
                    for (const message of messages) {
                        await enqueue(message as Message);
                    }
                } else {
                    console.log('No fail message found');
                }
                if (currentTurn === 'her') {
                    setSheFailedTwice(true);
                }
                setRoundLevel(level);
                // setRoundLevel increments level internally, so use the new level
                const newLevel = level + 1;
                setCurrentTurn(newLevel);
                // Enqueue messages AFTER state updates so it uses the new values
                enqueueGameInfoMessages();
                console.log('handlePlayerChoice', currentTurn);
                setHasFailedOnce(false);
            }

        }
        setButtonLoading(false);
    }

    const handleContinue = (gameState: ProcessingState) => {
        setButtonLoading(true);
        console.log('handleContinue', gameState);
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
            router.push('/(game)/a/statsA');
            setButtonLoading(false);
            return;
        }
        if (gameState.gameSucceeded) {
            if (gameState.gameNewLevelStarted) {
                setShowCongrats(true);
                setTimeout(() => {
                    setShowCongrats(false);
                }, 2000);
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
        consumeChocolate(currentTurn === 'her' ? Math.ceil(level / 2) : Math.ceil(level / 2) + 6, round);
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
