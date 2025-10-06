import { getPrompt } from '@/constants/Functions';
import { categoryTypes } from '@/constants/Prompts';
import { Message, ProcessingState, UserState } from '@/constants/Types';
import { useThemeToggle } from '@/hooks/useAppTheme';
import { useGameStore, useMessages } from '@/state/useGameStore';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from './ActionButton';

interface ButtonContainerProps {
    onPlayerChoice?: (choice: string, buttonType: 'success' | 'fail') => void;
    onContinue?: (gameState: ProcessingState) => void;
    isGamePaused?: boolean;
    loading?: boolean;
}

export default function ButtonContainer({ onPlayerChoice, onContinue, loading = false, isGamePaused = false }: ButtonContainerProps) {
    const { round, currentTurn, level, sheFailedTwice, mode, clearState, setFailSurvivedTask, consumeChocolate, setSheFailedTwice, getMockMessageByKind, setDidFinal, hasFailedOnce, setHasFailedOnce } = useGameStore();
    const { clear, enqueue, isProcessing } = useMessages();
    const { isDark } = useThemeToggle();
    const [blinkStage, setBlinkStage] = useState(1);
    const [userState, setUserState] = useState<UserState>({
        success: false,
        firstFail: false,
        secondFail: false,
        survived: false
    });
    const [gameState, setGameState] = useState<ProcessingState>({
        gameSucceeded: false,
        gameFailed: false,
        gamePaused: false,
        gameSurvived: false,
        gameStarted: false,
        gameEnded: false,
        gameNewLevelStarted: false
    });

    // Loading states for buttons
    const [isSuccessLoading, setIsSuccessLoading] = useState(false);
    const [isFailLoading, setIsFailLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleLetsGetMessy = async () => {
        // setButtonLoading(true);
        if (userState.firstFail) {
            setGameState({ ...gameState, gameSurvived: true, gamePaused: true });
            setUserState({ ...userState, survived: true });
            onPlayerChoice?.('Continue', 'success');
            setFailSurvivedTask(currentTurn);
            mode === 'A' && level === 12 && setGameState({ ...gameState, gameNewLevelStarted: true, gamePaused: true, gameSurvived: true });
        } else {
            setGameState({ ...gameState, gameSucceeded: true, gamePaused: true });
            setUserState({ ...userState, success: true });
            onPlayerChoice?.('LET\'S GET MESSY', 'success');
            mode === 'A' && level === 12 && setGameState({ ...gameState, gameNewLevelStarted: true, gamePaused: true, gameSucceeded: true });
        }
        // setButtonLoading(false);
    };

    const handleContinue = async () => {
        console.log('handleContinue');
        console.log('gameState', gameState, level, mode, round);
        consumeChocolate(currentTurn === 'her' ? Math.ceil(level / 2) : Math.ceil(level / 2) + 6, round);
        // setButtonLoading(true);
        if (round === 3) {
            onContinue?.(gameState);
            setDidFinal(true)
            setGameState({ gamePaused: false, gameSucceeded: false, gameFailed: false, gameSurvived: false, gameStarted: false, gameEnded: false, gameNewLevelStarted: false });
            setUserState({ success: false, firstFail: false, secondFail: false, survived: false });
            return;
        }
        if (mode === 'A' && level === 12) {
            if (round === 1) {
                if (blinkStage === 1) {
                    // const { data: levelUpPrompt, error } = await supabase
                    //     .from('content_items')
                    //     .select('id, content, subContent_1, subContent_2, subContent_3, subContent_4, subContent_5, content_1_time, content_2_time, content_3_time, content_4_time, content_5_time, challenges!inner ( id, name )')
                    //     .ilike('category', `%${categoryTypes.levelUp}%`);
                    // if (level===12) {
                    //     const messages = getPrompt(levelUpPrompt?.[0], 'prompt');
                    //     for (const message of messages) {
                    //         await enqueue(message as Message);
                    //     }
                    // }
                    enqueue(
                        {
                            kind: 'prompt',
                            body: 'You survived the warm-up, ready for round 2?',
                        }
                    );
                    setBlinkStage(2);
                } else if (blinkStage === 2) {
                    enqueue(
                        {
                            kind: 'userchoice',
                            body: 'Continue',
                        }
                    );
                    enqueue(
                        {
                            kind: 'prompt',
                            body: 'I’m in, let’s see what the hype’s about...',
                        }
                    );
                    setBlinkStage(3);
                } else if (blinkStage === 3) {
                    await enqueue(
                        {
                            kind: 'prompt',
                            body: 'Round one messed me up a bit, bit I’m totally pumped for more.',
                            group: 'question',
                            durationMs: 2000,
                        }
                    );
                    onContinue?.(gameState);
                    setBlinkStage(1);
                    setGameState({ gamePaused: false, gameSucceeded: false, gameFailed: false, gameSurvived: false, gameStarted: false, gameEnded: false, gameNewLevelStarted: false });
                    setUserState({ success: false, firstFail: false, secondFail: false, survived: false });
                }
            } else if (round === 2) {
                if (blinkStage === 1) {
                    enqueue(
                        {
                            kind: 'prompt',
                            body: 'Ready for Super Game?',
                        }
                    );
                    setBlinkStage(2);
                } else if (blinkStage === 2) {
                    enqueue(
                        {
                            kind: 'userchoice',
                            body: 'Yes',
                        }
                    );
                    await enqueue(
                        {
                            kind: 'prompt',
                            body: ' Final round, final piece. We’re ready. Let it ruin us beautifully.',
                            group: 'question',
                            durationMs: 2000,
                        }
                    );
                    onContinue?.(gameState);
                    setBlinkStage(1);
                    setGameState({ gamePaused: false, gameSucceeded: false, gameFailed: false, gameSurvived: false, gameStarted: false, gameEnded: false, gameNewLevelStarted: false });
                    setUserState({ success: false, firstFail: false, secondFail: false, survived: false });
                }
            }
            return;
        }

        if (gameState.gameSucceeded || gameState.gameSurvived) {
            onContinue?.(gameState);
            setGameState({ gamePaused: false, gameSucceeded: false, gameFailed: false, gameSurvived: false, gameStarted: false, gameEnded: false, gameNewLevelStarted: false });
            setUserState({ success: false, firstFail: false, secondFail: false, survived: false });
        }
        // setButtonLoading(false);
    };

    const handleNahIBail = async (buttonText: string) => {
        if (buttonText === 'End Game' || buttonText === 'No') {
            mode === 'A' ? router.push('/(game)/a/statsA') : router.push('/(game)/b/statsB');
            return;
        }

        if (userState.firstFail) {
            consumeChocolate(currentTurn === 'her' ? Math.ceil(level / 2) : Math.ceil(level / 2) + 6, round);
            if (round === 3) {
                const { data: failData, error } = await supabase.from('content_items').select('id, content, subContent_1, subContent_2, subContent_3, subContent_4, subContent_5, content_1_time, content_2_time, content_3_time, content_4_time, content_5_time, challenges!inner ( id, name )').ilike('category', `${categoryTypes.fail}`);
                if (failData && failData.length > 0) {
                    // Get a random index within the array length
                    const randomIndex = Math.floor(Math.random() * failData.length);
                    const messages = getPrompt(failData[randomIndex], 'fail');
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
                mode === 'A' ? router.push('/(game)/a/statsA') : router.push('/(game)/b/statsB');
                return;
            }
            if (mode === 'A' && level === 12) {
                setGameState({ ...gameState, gamePaused: true, gameFailed: true, gameNewLevelStarted: true });
                const { data: failData, error } = await supabase.from('content_items').select('id, content, subContent_1, subContent_2, subContent_3, subContent_4, subContent_5, content_1_time, content_2_time, content_3_time, content_4_time, content_5_time, challenges!inner ( id, name )').ilike('category', `${categoryTypes.fail}`);
                if (failData && failData.length > 0) {
                    // Get a random index within the array length
                    const randomIndex = Math.floor(Math.random() * failData.length);
                    const messages = getPrompt(failData[randomIndex], 'fail');
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
                return;
            }

            setGameState({ ...gameState, gameFailed: true, gamePaused: true });
            setUserState({ ...userState, secondFail: true });
            currentTurn === 'her' && setSheFailedTwice(true)
            if (currentTurn === 'him' && sheFailedTwice.state && sheFailedTwice.level === (level - 1)) {
                mode === 'A' ? router.push('/(game)/a/statsA') : router.push('/(game)/b/statsB');
                return;
            }
            onPlayerChoice?.('I can\'t hang', 'fail');
            setGameState({ gamePaused: false, gameSucceeded: false, gameFailed: false, gameSurvived: false, gameStarted: false, gameEnded: false, gameNewLevelStarted: false });
            setUserState({ success: false, firstFail: false, secondFail: false, survived: false });
        } else {
            onPlayerChoice?.('NAH, I BAIL', 'fail');
            setUserState({ ...userState, firstFail: true });
        }
        // setButtonLoading(false);
    };

    const handleButtonText = (): string[] => {
        if (gameState.gameNewLevelStarted && gameState.gamePaused) {
            if (round === 1) {
                return ['Continue', 'End Game'];
            } else if (round === 2 && blinkStage > 1) {
                return ['Yes', 'No'];
            }
        }

        if (!userState.firstFail && !userState.success && !userState.secondFail && !userState.survived) {
            return ['Let\'s get messy', 'Nah, I bail'];
        } else if (userState.firstFail && !userState.secondFail) {
            return ['Continue', 'I can\'t hang'];
        } else if (userState.survived || userState.success) {
            return ['Continue', ''];
        }
        return ['Let\'s get messy', 'Nah, I bail']; // Default fallback
    }
    const buttonText = handleButtonText();

    const hideButton = () => {
        if (gameState.gamePaused && gameState.gameNewLevelStarted && blinkStage >= 2) {
            return false;
        }
        if (gameState.gameSucceeded || gameState.gameSurvived || gameState.gameFailed) {
            return true;
        }
        return false;
    }

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#27282A' : 'transparent' }]}>
            <View style={styles.buttonContainer}>
                <ActionButton
                    title={buttonText[0]}
                    onPress={!gameState.gamePaused ? handleLetsGetMessy : handleContinue}
                    variant="primary"
                    color={round === 3 ? '#FFFFFF' : currentTurn === 'him' ? '#33358F' : '#8B2756'}
                    backgroundImage={
                        round === 3 ? require('@/assets/images/buttonBg4.png') :
                            currentTurn === 'him'
                                ? require('@/assets/images/buttonBg3.png')  // Different background for him
                                : require('@/assets/images/btn-bg1.png')  // Default background for her
                    }
                    loading={isProcessing}
                    disabled={isProcessing}
                />
                {/* Only show the second button when game is not paused */}
                <ActionButton
                    title={buttonText[1]}
                    onPress={() => handleNahIBail(buttonText[1])}
                    variant="secondary"
                    color='#7A1818'
                    backgroundImage={require('@/assets/images/btn-bg2.png')}
                    loading={isProcessing}
                    disabled={isProcessing}
                    hide={hideButton()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginTop: "auto",
        gap: 10,
        paddingBottom: 48,
    },
});