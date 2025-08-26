import ActionButton from "@/components/prompts/ActionButton";
import { IMAGES } from "@/constants";
import { useAppThemeColor } from "@/hooks/useAppTheme";
import { useThemeContext } from "@/providers/ThemeProvider";
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameSelectionPage() {
    const { isDark } = useThemeContext();
    const [selectedGame, setSelectedGame] = useState<'experience' | 'mayhem'>('experience');
    const backgroundColor = useAppThemeColor('background');

    const handleUnleashDrama = () => {
        // Navigate to the selected game
        if (selectedGame === 'experience') {
            router.push('/(game)/a/prompt1');
        } else {
            router.push('/(game)/b/chocoStats');
        }
    };

    const handlePeekRules = () => {
        // Navigate to rules page
        // router.push('/(tabs)');
    };

    return (
        <View style={[
            styles.container,
            isDark && { backgroundColor: backgroundColor }
        ]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.contentContainer}>
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Text style={[
                            styles.pageTitle,
                            { color: useAppThemeColor('text') }
                        ]}>Game Selection</Text>
                        {/* Game Mode Selection */}
                        <View style={styles.selectionContainer}>
                            {/* hushh. Experience */}
                            <TouchableOpacity
                                style={[
                                    styles.gameOption,
                                    selectedGame === 'experience' && styles.selectedGame,
                                    isDark && { backgroundColor: '#4E4FA6' }
                                ]}
                                onPress={() => setSelectedGame('experience')}
                            >
                                <View style={[
                                    styles.radioButton,
                                    selectedGame === 'experience' && styles.selectedRadio,
                                    isDark && { borderColor: '#8383C6', backgroundColor: '#8383C6' }
                                ]}>
                                    {selectedGame === 'experience' && <View style={styles.radioDot} />}
                                </View>
                                <Text style={[
                                    styles.gameText,
                                    selectedGame === 'experience' && styles.selectedGameText,
                                    isDark && { color: '#E8EAF6' }
                                ]}>
                                    hushh. Experience
                                </Text>
                            </TouchableOpacity>

                            {/* hushh. Mayhem */}
                            <TouchableOpacity
                                style={[
                                    styles.gameOption,
                                    selectedGame === 'mayhem' && styles.selectedGame,
                                    isDark && { backgroundColor: '#4E4FA6' }
                                ]}
                                onPress={() => setSelectedGame('mayhem')}
                            >
                                <View style={[
                                    styles.radioButton,
                                    selectedGame === 'mayhem' && styles.selectedRadio,
                                    { borderColor: isDark ? '#8383C6' : '#E8EAF6' }
                                ]}>
                                    {selectedGame === 'mayhem' && <View style={styles.radioDot} />}
                                </View>
                                <Text style={[
                                    styles.gameText,
                                    selectedGame === 'mayhem' && styles.selectedGameText,
                                    isDark && { color: '#E8EAF6' }
                                ]}>
                                    hushh. Mayhem
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.actionContainer}>
                        {/* Action Button */}
                        <View style={styles.actionButtonContainer}>
                            <ActionButton
                                title="UNLEASH THE DRAMA"
                                onPress={handleUnleashDrama}
                                variant="primary"
                                backgroundImage={IMAGES.IMAGES.btnBg1}
                                color='#C2185B'
                            />
                        </View>

                        {/* Rules Link */}
                        <View style={styles.rulesContainer}>
                            <Text style={[
                                styles.rulesText,
                                { color: isDark ? '#B0B0B0' : '#9E9E9E' }
                            ]}>
                                Not ready to commit to one just yet?
                            </Text>
                            <TouchableOpacity onPress={handlePeekRules}>
                                <Text style={[
                                    styles.rulesLink,
                                    { color: isDark ? '#8383C6' : '#5C6BC0' }
                                ]}>PEEK AT THE RULES FIRST</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    contentContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 40,
    },
    actionContainer: {
        marginTop: 'auto',
        bottom: 56,
        left: 0,
        right: 0,
        padding: 16,
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333',
    },
    selectionContainer: {
        marginBottom: 40,
    },
    gameOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8EAF6',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedGame: {
        backgroundColor: '#5C6BC0',
        outlineColor: '#5C6BC0',
        outlineWidth: 2,
        outlineStyle: 'solid',
        outlineOffset: 3,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E8EAF6',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    selectedRadio: {
        borderColor: '#5C6BC0',
        backgroundColor: '#5C6BC0',
    },
    radioDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFF',
    },
    gameText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#5C6BC0',
    },
    selectedGameText: {
        color: '#FFF',
    },
    actionButtonContainer: {
        marginBottom: 32,
    },
    rulesContainer: {
        alignItems: 'center',
    },
    rulesText: {
        fontSize: 16,
        color: '#9E9E9E',
        textAlign: 'center',
        marginBottom: 8,
    },
    rulesLink: {
        fontSize: 16,
        fontWeight: '600',
        color: '#5C6BC0',
        textDecorationLine: 'underline',
    },
});