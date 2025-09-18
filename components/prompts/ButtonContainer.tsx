import { ProcessingState, UserState } from '@/constants/Types';
import { useThemeToggle } from '@/hooks/useAppTheme';
import { useGameStore, useMessages } from '@/state/useGameStore';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from './ActionButton';

interface ButtonContainerProps {
    onPlayerChoice?: (choice: string, buttonType: 'success' | 'fail') => void;
    onContinue?: (gameState: ProcessingState) => void;
    isGamePaused?: boolean;
}

export default function ButtonContainer({ onPlayerChoice, onContinue, isGamePaused = false }: ButtonContainerProps) {
    const { round, currentTurn, level, sheFailedTwice, clearState, setSheFailedTwice } = useGameStore();
    const { clear } = useMessages();
    const { isDark } = useThemeToggle();
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
        gameRestarted: false
    });

    // Loading states for buttons
    const [isSuccessLoading, setIsSuccessLoading] = useState(false);
    const [isFailLoading, setIsFailLoading] = useState(false);

    const handleLetsGetMessy = async () => {
        if (userState.firstFail) {
            setGameState({ ...gameState, gameSurvived: true, gamePaused: true });
            setUserState({ ...userState, survived: true });
            onPlayerChoice?.('Continue', 'success');
            console.log('survived', userState);
        } else {
            setGameState({ ...gameState, gameSucceeded: true, gamePaused: true });
            setUserState({ ...userState, success: true });
            onPlayerChoice?.('LET\'S GET MESSY', 'success');
        }
    };

    const handleContinue = async () => {
        if (gameState.gameSucceeded || gameState.gameSurvived) {
            onContinue?.(gameState);
        }
        setGameState({ gamePaused: false, gameSucceeded: false, gameFailed: false, gameSurvived: false, gameStarted: false, gameEnded: false, gameRestarted: false });
        setUserState({ success: false, firstFail: false, secondFail: false, survived: false });
    };

    const handleNahIBail = async () => {
        if (userState.firstFail) {
            setGameState({ ...gameState, gameFailed: true, gamePaused: true });
            setUserState({ ...userState, secondFail: true });
            currentTurn === 'her' && setSheFailedTwice(true)
            if (currentTurn === 'him' && sheFailedTwice.state && sheFailedTwice.level === (level-1)) {
                router.push('/(game)/a/statsA');
                clear();
                clearState();
            }
            onPlayerChoice?.('I can\'t hang', 'fail');
            setGameState({ gamePaused: false, gameSucceeded: false, gameFailed: false, gameSurvived: false, gameStarted: false, gameEnded: false, gameRestarted: false });
            setUserState({ success: false, firstFail: false, secondFail: false, survived: false });
        } else {
            onPlayerChoice?.('NAH, I BAIL', 'fail');
            setUserState({ ...userState, firstFail: true });
        }
    };

    const handleButtonText = (): string[] => {
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

    useEffect(() => {
        console.log('current Game State', gameState);
        console.log('current User State', userState);
    }, [gameState, userState]);

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
                    loading={isSuccessLoading}
                    disabled={isSuccessLoading || isFailLoading}
                />
                {/* Only show the second button when game is not paused */}
                <ActionButton
                        title={buttonText[1]}
                        onPress={handleNahIBail}
                        variant="secondary"
                        color='#7A1818'
                        backgroundImage={require('@/assets/images/btn-bg2.png')}
                        loading={isFailLoading}
                        disabled={isSuccessLoading || isFailLoading}
                        hide={gameState.gameSucceeded || gameState.gameSurvived}
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