import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageItem from "@/components/prompts/MessageItem";
import { useThemeToggle } from "@/hooks/useAppTheme";
import { useGameStore, useMessages } from "@/state/useGameStore";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Prompt() {
    const [gameStage, setGameStage] = useState(1);
    const [playerChoice, setPlayerChoice] = useState<string | undefined>();
    const [showSuccessDelay, setShowSuccessDelay] = useState(false);
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
        hasFailedOnce,
        setHasFailedOnce,
        incrementPlayerFailCount,
        setConsumedChocolatesEachCount,
        setSheFailedTwice,
        setCurrentTurn,
        sheFailedTwice
    } = useGameStore();

    const { queue, enqueue, clear } = useMessages();
    const scrollViewRef = useRef<ScrollView>(null);

    // Enqueue game info messages when component mounts
    useEffect(() => {
        // Clear the queue first, then add new preset messages
        clear();
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

    const handlePlayerChoice = (choice: string, buttonType: 'success' | 'fail') => {
        setPlayerChoice(choice);

        // Enqueue the user's choice as a message with button type
        enqueue({
            kind: 'userchoice' as const,
            body: choice,
            group: 'user_action' as const,
            meta: { buttonType } // Store the button type in meta for future use
        });

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
                    }, 2000); //  seconds delay between dare message and new prompt
                }
            } else {
                setHasFailedOnce(false);
                if (useGameStore.getState().currentTurn === 'her') {
                    setSheFailedTwice(true);
                } else if (useGameStore.getState().currentTurn === 'him' &&
                    sheFailedTwice.state &&
                    sheFailedTwice.level === useGameStore.getState().level-1) {
                    enqueue(getMockMessageByKind('fail'));
                    setTimeout(() => {
                        router.push('/(game)/a/statsA');
                    }, 2000);
                    return;
                }

                // Second fail: show fail message and navigate to stats
                const failMessage = getMockMessageByKind('fail');
                if (failMessage) {
                    enqueue(failMessage);
                }

                setTimeout(() => {
                    if (round === 3) {
                        clear();
                        router.push('/(game)/a/statsA');
                        return;
                    }
                    setRoundLevel(level);
                    const updatedLevel = useGameStore.getState().level; // Get fresh level from store
                    clear();
                    setCurrentTurn(updatedLevel); // Use updated level instead of old level
                    enqueueGameInfoMessages();
                }, 2000);
            }
        }

        if (buttonType === 'success') {

            // If player failed once before succeeding, increment their fail count
            if (hasFailedOnce) {
                incrementPlayerFailCount(currentTurn);
            }

            // Get success message from mock data in GameStore
            const successMessage = getMockMessageByKind('success');
            if (successMessage) {
                enqueue(successMessage);
            }

            
            // Navigate to stats after 2 seconds
            setTimeout(() => {
                if (round === 3) {
                    router.push('/(game)/a/statsA');
                    return;
                }
                setRoundLevel(level);
                const updatedLevel = useGameStore.getState().level;
                setCurrentTurn(updatedLevel);
                clear();
                enqueueGameInfoMessages();
            }, 2000);
        }

        // if (choice === "LET'S GET MESSY") {
        //     setTaskCompleted(currentTurn);
        //     setConsumedChocolatesEachCount();
        // }
    };

    const handleStageChange = (newStage: number) => {
        setGameStage(newStage);
    };

    // Render messages from the queue using MessageItem component
    const renderMessages = () => {
        return queue.map((message, index) => {
            // Special handling for prompt messages (show title + body)r
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
        <View style={{
            flex: 1,
            backgroundColor: isDark ? '#27282A' : '#EDEFF2',
            height: "100%"
        }}>
            <ScrollView
                ref={scrollViewRef}
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
                scrollIndicatorInsets={{ bottom: 40 }}
                indicatorStyle="black"
                persistentScrollbar={true}
            >
                {renderMessages()}
            </ScrollView>
            <ButtonContainer
                onStageChange={handleStageChange}
                onPlayerChoice={handlePlayerChoice}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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
});
