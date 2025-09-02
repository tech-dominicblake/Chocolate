import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageItem from "@/components/prompts/MessageItem";
import { useThemeToggle } from "@/hooks/useAppTheme";
import { useGameStore, useMessages } from "@/state/useGameStore";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
                    sheFailedTwice.level === useGameStore.getState().level-1) {
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
                        clear();
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
            
            // Get success message from mock data in GameStore
            // const successMessage = getMockMessageByKind('success');
            // if (successMessage) {
            //     enqueue(successMessage);
            // }
            
            // Navigate to stats after 2 seconds
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
        <View style={{
            flex: 1,
            backgroundColor: isDark ? '#27282A' : '#EDEFF2',
            height: "100%"
        }}>
            <ScrollView 
                ref={scrollViewRef}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
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