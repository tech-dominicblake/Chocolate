import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from './ActionButton';

interface ButtonContainerProps {
    gameStage: number;
    onStageChange: (stage: number) => void;
    onPlayerChoice?: (choice: string) => void;
    // New callback for player choices
    userType?: 'her' | 'him';
    isDark?: boolean; // New prop for dark theme
}

export default function ButtonContainer({   gameStage, onStageChange, onPlayerChoice, userType, isDark }: ButtonContainerProps) {
    const [currentUserType, setCurrentUserType] = useState(userType);
    
    const handleLetsGetMessy = () => {
        // Show the button text as a player choice
        onPlayerChoice?.("LET'S GET MESSY");
        
        // Show success message for 2 seconds, then go to stats
        onStageChange(3); // Show success message
        
        // Wait 2 seconds then navigate to stats
        setTimeout(() => {
            router.push('/(game)/stats');
        }, 2000);
    };

    const handleNahIBail = () => {
        // Show the button text as a player choice
        onPlayerChoice?.("NAH, I BAIL");
        
        // Go to stage 2 (warning and new rule)
        console.log('NAH, I BAIL pressed');
        onStageChange(2);
    };

    const handleContinue = () => {
        // Show the button text as a player choice
        onPlayerChoice?.("CONTINUE");
        
        // Show success message for 2 seconds, then go to stats
        console.log('CONTINUE pressed');
        onStageChange(3); // Show success message
        
        // Wait 2 seconds then navigate to stats
        setTimeout(() => {
            router.push('/(game)/stats');
        }, 2000);
    };

    const handleICantHang = () => {
        // Show the button text as a player choice
        onPlayerChoice?.("I CAN'T HANG");
        
        // Go to final failure state (no buttons)
        console.log('I CAN\'T HANG pressed');
        onStageChange(4);
    };

    const renderButtons = () => {
        switch (gameStage) {
            case 1: // Initial stage
                return (
                    <>
                        <ActionButton 
                            title="LET'S GET MESSY" 
                            onPress={handleLetsGetMessy}
                            variant="primary"
                            backgroundImage={
                                currentUserType === 'him'  
                                    ? require('@/assets/images/buttonBg3.png')  // Different background for him
                                    : require('@/assets/images/btn-bg1.png')  // Default background for her
                            }
                        />
                        <ActionButton 
                            title="NAH, I BAIL" 
                            onPress={handleNahIBail}
                            variant="secondary"
                            backgroundImage={require('@/assets/images/btn-bg2.png')}
                        />
                    </>
                );
            
            case 2: // After "NAH, I BAIL" press
                return (
                    <>
                        <ActionButton 
                            title="CONTINUE" 
                            onPress={handleContinue}
                            variant="primary"
                            backgroundImage={require('@/assets/images/btn-bg1.png')}
                        />
                        <ActionButton 
                            title="I CAN'T HANG" 
                            onPress={handleICantHang}
                            variant="secondary"
                            backgroundImage={require('@/assets/images/btn-bg2.png')}
                        />
                    </>
                );
            
            case 3: // After "CONTINUE" or "LET'S GET MESSY" - no buttons shown
                return null;
            
            case 4: // After "I CAN'T HANG" press - no buttons shown
                return null;
            
            default:
                return null;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#27282A' : 'transparent' }]}>
            {renderButtons()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
});
