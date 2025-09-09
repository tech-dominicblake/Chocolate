import { SelectOptionButton } from "@/components/SelectOptionButton";
import ActionButton from "@/components/prompts/ActionButton";
import { IMAGES } from "@/constants";
import { Mode } from "@/constants/Types";
import { useAppThemeColor } from "@/hooks/useAppTheme";
import { useThemeContext } from "@/providers/ThemeProvider";
import { useGameStore } from "@/state/useGameStore";
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameSelectionPage() {
    const { isDark } = useThemeContext();
    const [selectedGame, setSelectedGame] = useState<Mode>('A');
    const backgroundColor = useAppThemeColor('background');
    const { setMode } = useGameStore();

    const handleUnleashDrama = () => {
        // Navigate to the selected game
        setMode(selectedGame);
        router.push('/relationship');
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
                            <SelectOptionButton
                                title="hushh. Experience"
                                isSelected={selectedGame === 'A'}
                                onPress={() => setSelectedGame('A')}
                            />
                            <SelectOptionButton
                                title="hushh. Mayhem"
                                isSelected={selectedGame === 'B'}
                                onPress={() => setSelectedGame('B')}
                            />
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