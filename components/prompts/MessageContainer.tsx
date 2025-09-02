import { useAppThemeColor } from '@/hooks/useAppTheme';
import { ScrollView, StyleSheet } from 'react-native';
import MessageItem from './MessageItem';

interface MessageContainerProps {
    gameStage: number;
    playerChoice?: string; // New prop for player's button choice
    userType?: 'her' | 'him';
    isDark?: boolean; // New prop for dark theme
}

export default function MessageContainer({ gameStage, playerChoice, userType, isDark }: MessageContainerProps) {
    const renderMessages = () => {
        switch (gameStage) {
            case 1: // Initial stage - show first rule
                return (
                    <>
                        <MessageItem text="Round 1" isDark={isDark} kind="info" />
                        <MessageItem text="Level 2 - for HER" isDark={isDark} kind="info" />
                        <MessageItem text="Too Hot to Handle 🔥💋" isDark={isDark} kind="prompt" />
                        <MessageItem 
                            text="Slowly and seductively lick the chocolate piece..."
                            // textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
                            kind="prompt"
                            isBody={true}
                        />
                        <MessageItem 
                            text="Whisper your partner's three sexiest features 😍🔥"
                            textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
                            kind="prompt"
                            isBody={true}
                        />
                        {/* Show player choice if available */}
                        {playerChoice && (
                            <MessageItem 
                                text={playerChoice} 
                                textStyle="normal" 
                                style={[
                                    styles.playerChoiceMessage,
                                    { 
                                        backgroundColor: isDark ? '#e06ca3' : '#F8BBD9', // Dark theme: #E06CA3 with 15% transparency, Light theme: original pink
                                        color: isDark ? '#F57FB7' : '#000000' // Dark theme: #F57FB7, Light theme: original black text
                                    }
                                ]}
                                isDark={isDark}
                                kind="userchoice"
                            />
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView 
            style={[styles.container, { backgroundColor: useAppThemeColor('background') }]} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
            alwaysBounceVertical={false}
        >
            {renderMessages()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingBottom: 40
        // backgroundColor: '#EDEFF2', // Light gray background - removed to use conditional styling
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    largeMessage: {
        maxWidth: '90%',
        marginBottom: 8, // Add some space between large messages
    },
    playerChoiceMessage: {
        alignSelf: 'flex-end', // Align to the right
        // backgroundColor: '#F8BBD9', // Removed to use conditional styling
        marginLeft: 'auto', // Push to right side
        marginRight: 16,
        maxWidth: '70%', // Limit width for player choice
    },
    redBorderedMessage: {
        borderWidth: 2,
        borderColor: '#FF0000', // Red border
        borderRadius: 8,
        padding: 8,
    },
});
