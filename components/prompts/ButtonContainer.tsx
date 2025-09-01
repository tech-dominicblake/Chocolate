import { useThemeToggle } from '@/hooks/useAppTheme';
import { useGameStore } from '@/state/useGameStore';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from './ActionButton';

interface ButtonContainerProps {
    onStageChange: (stage: number) => void;
    onPlayerChoice?: (choice: string, buttonType: 'success' | 'fail') => void;
}

export default function ButtonContainer({ onStageChange, onPlayerChoice }: ButtonContainerProps) {
    const { round, currentTurn, consumeChocolate, consumedChocolates } = useGameStore();
    const { isDark } = useThemeToggle();
    
    // Loading states for buttons
    const [isSuccessLoading, setIsSuccessLoading] = useState(false);
    const [isFailLoading, setIsFailLoading] = useState(false);

    const handleLetsGetMessy = async () => {
        if (isSuccessLoading) return; // Prevent multiple clicks
        
        setIsSuccessLoading(true);
        try {
            // Show the button text as a player choice with success type
            onPlayerChoice?.("LET'S GET MESSY", 'success');
            // Navigation will be handled by PromptA page after delay
        } catch (error) {
            console.error('Error in success action:', error);
        } finally {
            // Keep loading state until navigation happens (2 seconds delay)
            setTimeout(() => setIsSuccessLoading(false), 2000);
        }
    };

    const handleNahIBail = async () => {
        if (isFailLoading) return; // Prevent multiple clicks
        
        setIsFailLoading(true);
        try {
            // Show the button text as a player choice with fail type
            onPlayerChoice?.("NAH, I BAIL", 'fail');

            // Go to stage 2 (warning and new rule)
            onStageChange(2);
        } catch (error) {
            console.error('Error in fail action:', error);
        } finally {
            // Keep loading state for a bit to show feedback
            setTimeout(() => setIsFailLoading(false), 1500);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#27282A' : 'transparent' }]}>
            <View style={styles.buttonContainer}>
                <ActionButton
                    title="LET'S GET MESSY"
                    onPress={handleLetsGetMessy}
                    variant="primary"
                    color= {round === 3 ? '#FFFFFF' : currentTurn === 'him' ? '#33358F' : '#8B2756'}
                    backgroundImage={
                        round === 3 ? require('@/assets/images/buttonBg4.png') :
                        currentTurn === 'him'
                            ? require('@/assets/images/buttonBg3.png')  // Different background for him
                            : require('@/assets/images/btn-bg1.png')  // Default background for her
                    }
                    loading={isSuccessLoading}
                    disabled={isSuccessLoading || isFailLoading}
                />
                <ActionButton
                    title="NAH, I BAIL"
                    onPress={handleNahIBail}
                    variant="secondary"
                    color= '#7A1818'
                    backgroundImage={require('@/assets/images/btn-bg2.png')}
                    loading={isFailLoading}
                    disabled={isSuccessLoading || isFailLoading}
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
