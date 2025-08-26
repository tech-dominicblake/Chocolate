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
                        <MessageItem text="Round 1" isDark={isDark} />
                        <MessageItem text="Level 2 - for HER" isDark={isDark} />
                        <MessageItem text="Too Hot to Handle 🔥💋" isDark={isDark} />
                        <MessageItem 
                            text="Slowly and seductively lick the chocolate piece..."
                            textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
                        />
                        <MessageItem 
                            text="Whisper your partner's three sexiest features 😍🔥"
                            textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
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
                            />
                        )}
                    </>
                );
            
            case 2: // After "NAH, I BAIL" - show warning and new rule
                return (
                    <>
                        <MessageItem text="Round 1" isDark={isDark} />
                        <MessageItem text="Level 2 - for HER" isDark={isDark} />
                        <MessageItem text="Too Hot to Handle 🔥💋" isDark={isDark} />
                        <MessageItem 
                            text="Slowly and seductively lick the chocolate piece..."
                            textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
                        />
                        <MessageItem 
                            text="Whisper your partner's three sexiest features 😍🔥"
                            textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
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
                            />
                        )}
                        <MessageItem text="You backed out? 🤔 Fine. Here's your punishment 😈 No mercy. No take-backs." isDark={isDark} />
                        <MessageItem text="Make it as naughty and irresistible as you can 🍫💋" isDark={isDark} />
                        <MessageItem text="Lose an item of clothing 😳👕" isDark={isDark} />
                        <MessageItem text="Say: 'Guess you'll never know...' 😈" isDark={isDark} />
                    </>
                );
            
            case 3: // After "CONTINUE" or "LET'S GET MESSY" - show success message (no buttons)
                return (
                    <>
                        <MessageItem text="Round 1" isDark={isDark} />
                        <MessageItem text="Level 2 - for HER" isDark={isDark} />
                        <MessageItem text="Too Hot to Handle 🔥💋" isDark={isDark} />
                        <MessageItem 
                            text="Slowly and seductively lick the chocolate piece..."
                            textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
                        />
                        <MessageItem 
                            text="Whisper your partner's three sexiest features 😍🔥"
                            textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
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
                            />
                        )}
                        <MessageItem 
                            text="No flinching. No excuses. Just pure, delicious chaos. You're built for this 😉"
                            textStyle="large"
                            style={[styles.largeMessage]}
                            isDark={isDark}
                        />
                    </>
                );
            
            case 4: // After "I CAN'T HANG" press - show final failure state (no buttons)
                return (
                    <>
                        <MessageItem text="Round 1" isDark={isDark} />
                        <MessageItem text="Level 2 - for HER" isDark={isDark} />
                        <MessageItem text="Too Hot to Handle 🔥💋" isDark={isDark} />
                        <MessageItem 
                            text="Slowly and seductively lick the chocolate piece..."
                            textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
                        />
                        <MessageItem 
                            text="Whisper your partner's three sexiest features 😍🔥"
                            textStyle="large"
                            style={styles.largeMessage}
                            isDark={isDark}
                        />
                        {/* Show player choice if available */}
                        {playerChoice && (
                            <MessageItem 
                                text={playerChoice} 
                                textStyle="normal" 
                                style={[
                                    styles.playerChoiceMessage,
                                    { 
                                        backgroundColor: isDark ? '#E06CA3' : '#F8BBD9', // Dark theme: #E06CA3 with 15% transparency, Light theme: original pink
                                        color: isDark ? '#F57FB7' : '#000000' // Dark theme: #F57FB7, Light theme: original black text
                                    }
                                ]}
                                isDark={isDark}
                            />
                        )}
                        <MessageItem text="You backed out? 🤔 Fine. Here's your punishment 😈 No mercy. No take-backs." isDark={isDark} />
                        <MessageItem text="Make it as naughty and irresistible as you can 🍫💋" isDark={isDark} />
                        <MessageItem text="Lose an item of clothing 😳👕" isDark={isDark} />
                        <MessageItem text="Say: 'Guess you'll never know...' 😈" isDark={isDark} />
                        <MessageItem text="Oof. You took the Fail like a champ 😈" isDark={isDark} />
                        <MessageItem text="Now let's see if your partner's got more guts than you 💅" isDark={isDark} />
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
