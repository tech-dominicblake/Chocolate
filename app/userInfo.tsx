import { MenuButton } from '@/components/MenuButton';
import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useAppThemeColor, useThemeToggle } from '@/hooks/useAppTheme';
import { useGameStore } from '@/state/useGameStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UserInfo() {
    const [player1Name, setPlayer1Name] = useState('Alexa');
    const [player1Age, setPlayer1Age] = useState('25');
    const [player2Name, setPlayer2Name] = useState('Alex');
    const [player2Age, setPlayer2Age] = useState('32');
    const { isDark } = useThemeToggle();
    const { setPlayerNames, setRoundLevel } = useGameStore();
    const barGrey = useAppThemeColor('bar');
    const textColor = useAppThemeColor('text');



    // Focus states for inputs
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const handleContinue = () => {
        // Validate inputs
        if (!player1Name.trim() || !player1Age.trim() || !player2Name.trim() || !player2Age.trim()) {
            // Show error or alert
            return;
        }

        setPlayerNames({ her: player1Name, him: player2Name });

        // Navigate to next step
        router.push('/girlAvatarSelection');
    };

    const handleBack = () => {
        // Go back to sign-in page
        router.back();
    };

    const handleMenu = () => {
        router.push('/menu');
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: isDark ? '#27282A' : '#EDEFF2' }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color='#79828F' />
                        <Text style={[styles.backText, { color: barGrey }]}> BACK</Text>
                    </TouchableOpacity>

                    <MenuButton onPress={handleMenu} />
                </View>
                <View style={styles.inputCardWraper}>
                    {/* Player 1 Card */}
                    <View style={[styles.playerCard, {
                        backgroundColor: isDark ? '#2D2F33' : '#FFFFFF' // Dark theme: #374151, Light theme: original white
                    }]}>
                        <View style={styles.playerTitle}>
                            <Text style={[styles.playerNumber, { color: isDark ? '#FFFFFF' : '#333' }]}>Player 1</Text>
                            <Text style={[styles.playerDot, { color: isDark ? '#9CA3AF' : '#999' }]}> • </Text>
                            <Text style={[styles.playerGender, { color: isDark ? '#FF6B9D' : '#FF6B9D' }]}>Her</Text>
                        </View>
                        <View style={styles.inputCardWraper} >
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[
                                        styles.nameInput,
                                        {
                                            backgroundColor: isDark ? '#33373D' : '#FFFFFF', // Dark theme: #454952, Light theme: original white
                                            borderColor: isDark ? '#33373D' : '#E0E0E0', // Dark theme: #4B5563, Light theme: original #E0E0E0
                                            color: isDark ? '#FFFFFF' : '#333' // Dark theme: white, Light theme: original #333
                                        },
                                        focusedInput === 'player1Name' && styles.inputFocused
                                    ]}
                                    value={player1Name}
                                    onChangeText={setPlayer1Name}
                                    placeholder="First Name"
                                    placeholderTextColor={isDark ? '#9CA3AF' : '#999'} // Dark theme: #9CA3AF, Light theme: original #999
                                    onFocus={() => setFocusedInput('player1Name')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[
                                        styles.ageInput,
                                        {
                                            backgroundColor: isDark ? '#33373D' : '#FFFFFF', // Dark theme: #454952, Light theme: original white
                                            borderColor: isDark ? '#33373D' : '#E0E0E0', // Dark theme: #4B5563, Light theme: original #E0E0E0
                                            color: isDark ? '#FFFFFF' : '#333' // Dark theme: white, Light theme: original #333
                                        },
                                        focusedInput === 'player1Age' && styles.inputFocused
                                    ]}
                                    value={player1Age}
                                    onChangeText={setPlayer1Age}
                                    placeholder="Age"
                                    placeholderTextColor={isDark ? '#9CA3AF' : '#999'} // Dark theme: #9CA3AF, Light theme: original #999
                                    keyboardType="numeric"
                                    maxLength={2}
                                    onFocus={() => setFocusedInput('player1Age')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Player 2 Card */}
                    <View style={[styles.playerCard, {
                        backgroundColor: isDark ? '#2D2F33' : '#FFFFFF' // Dark theme: #374151, Light theme: original white
                    }]}>
                        <View style={styles.playerTitle}>
                            <Text style={[styles.playerNumber, { color: isDark ? '#FFFFFF' : '#333' }]}>Player 2</Text>
                            <Text style={[styles.playerDot, { color: isDark ? '#9CA3AF' : '#999' }]}> • </Text>
                            <Text style={[styles.playerGenderHim, { color: isDark ? '#8B5CF6' : '#8B5CF6' }]}>Him</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[
                                    styles.nameInput,
                                    {
                                        backgroundColor: isDark ? '#33373D' : '#FFFFFF', // Dark theme: #454952, Light theme: original white
                                        borderColor: isDark ? '#33373D' : '#E0E0E0', // Dark theme: #4B5563, Light theme: original #E0E0E0
                                        color: isDark ? '#FFFFFF' : '#333' // Dark theme: white, Light theme: original #333
                                    },
                                    focusedInput === 'player2Name' && styles.inputFocused
                                ]}
                                value={player2Name}
                                onChangeText={setPlayer2Name}
                                placeholder="First Name"
                                placeholderTextColor={isDark ? '#9CA3AF' : '#999'} // Dark theme: #9CA3AF, Light theme: original #999
                                onFocus={() => setFocusedInput('player2Name')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[
                                    styles.ageInput,
                                    {
                                        backgroundColor: isDark ? '#33373D' : '#FFFFFF', // Dark theme: #454952, Light theme: original white
                                        borderColor: isDark ? '#33373D' : '#E0E0E0', // Dark theme: #4B5563, Light theme: original #E0E0E0
                                        color: isDark ? '#FFFFFF' : '#333' // Dark theme: white, Light theme: original #333
                                    },
                                    focusedInput === 'player2Age' && styles.inputFocused
                                ]}
                                value={player2Age}
                                onChangeText={setPlayer2Age}
                                placeholder="Age"
                                placeholderTextColor={isDark ? '#9CA3AF' : '#999'} // Dark theme: #9CA3AF, Light theme: original #999
                                keyboardType="numeric"
                                maxLength={2}
                                onFocus={() => setFocusedInput('player2Age')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>
                    </View>
                </View>

                {/* Continue Button */}
                <View style={styles.buttonContainer}>
                    <ActionButton
                        title='CONTINUE'
                        onPress={handleContinue}
                        variant='primary'
                        backgroundImage={IMAGES.IMAGES.btnBg1}
                        color='#C2185B'
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#EDEFF2', // Removed to use conditional styling
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        flexGrow: 1,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 20,
        paddingVertical: 16,
        marginTop: 70,
    },
    menuButton: {
        padding: 8,
    },
    backButton: {
        padding: 8,
        display:'flex',
        flexDirection: 'row'
    },
    playerCard: {
        // backgroundColor: '#FFFFFF', // Removed to use conditional styling
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    playerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    playerNumber: {
        fontSize: 28.25,
        fontWeight: 'bold',
        // color: '#333', // Removed to use conditional styling
    },
    playerDot: {
        fontSize: 28.25,
        // color: '#999', // Removed to use conditional styling
        marginHorizontal: 4,
    },
    playerGender: {
        fontSize: 28.25,
        fontWeight: 'bold',
        color: '#FF6B9D', // Pink color for "Her"
    },
    playerGenderHim: {
        fontSize: 28.25,
        fontWeight: 'bold',
        color: '#8B5CF6', // Purple color for "Him"
    },
    inputCardWraper: {
        marginVertical: 'auto',
        // flex: 1
    },
    inputContainer: {
        marginBottom: 16,
    },
    nameInput: {
        // backgroundColor: '#FFFFFF', // Removed to use conditional styling
        borderWidth: 1,
        // borderColor: '#E0E0E0', // Removed to use conditional styling
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        // color: '#333', // Removed to use conditional styling
    },
    ageInput: {
        // backgroundColor: '#FFFFFF', // Removed to use conditional styling
        borderWidth: 1,
        // borderColor: '#E0E0E0', // Removed to use conditional styling
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        // color: '#333', // Removed to use conditional styling
    },
    inputFocused: {
        borderColor: '#FF6B9D', // Pink border when focused
        borderWidth: 2,
    },
    buttonContainer: {
        marginTop: 'auto',
        paddingBottom: 40,
    },
    continueButton: {
        backgroundColor: '#FF6B9D',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
      },
});
