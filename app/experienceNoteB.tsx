import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExperienceNoteB() {
    const handleBack = () => {
        router.back();
    };

    const handleGotIt = () => {
        // Navigate to next step or back to game selection
        router.push('/gameSelection');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.gameLabel}>GAME B</Text>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>hushh. Experience</Text>
                        <Image source={IMAGES.IMAGES.image3} style={styles.chocolateIcon} />
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Game Categories Section */}
                <View style={styles.section}>
                    <Text style={styles.categoryTitle}>
                        In this game, you'll face three spicy categories — depending on relationship stage:
                    </Text>
                    <View style={styles.categoryList}>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryNumberIcon}>
                                <Text style={styles.categoryNumberText}>1</Text>
                            </View>
                            <View style={styles.categoryContent}>
                                <Text style={styles.categoryTitle}>Recently Met (&lt;3 months) - flirty, fresh, still pretending to be normal</Text>
                            </View>
                        </View>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryNumberIcon}>
                                <Text style={styles.categoryNumberText}>2</Text>
                            </View>
                            <View style={styles.categoryContent}>
                                <Text style={styles.categoryTitle}>Getting Serious (3-12 months) - feelings are real, chaos is rising</Text>
                            </View>
                        </View>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryNumberIcon}>
                                <Text style={styles.categoryNumberText}>3</Text>
                            </View>
                            <View style={styles.categoryContent}>
                                <Text style={styles.categoryTitle}>We Already Hate Each Other  love is strong, patience is not(1+ year) - </Text>
                                <Text style={styles.categoryDescription}>

                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* How to Play Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How to Play</Text>
                    <Text style={styles.description}>
                        You'll take turns pulling chocolates and completing challenges that test your boldness, chemistry… and maybe your dignity
                    </Text>
                    <Text style={styles.description}>
                        Each category comes with two wild rounds and 12 daring tasks
                    </Text>
                    <Text style={styles.description}>
                        In this mode, YOU choose the chocolate pieces at random from the box — and take whatever challenge comes with it
                    </Text>
                    <Text style={styles.description}>
                        It’s chaos by design.
                    </Text>
                </View>

                {/* Rules and Consequences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rules and Consequences</Text>
                    <Text style={styles.description}>
                        Refuse the task?
                    </Text>
                    <Text style={styles.description}>
                        No escape — you get a Fail instead
                    </Text>
                    <Text style={styles.description}>
                        And trust us, they're not polite either 👀
                    </Text>
                </View>

                {/* The Journey Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>The Journey</Text>
                    <Text style={styles.description}>
                        Start cute
                    </Text>
                    <Text style={styles.description}>
                        Get chaotic
                    </Text>
                    <Text style={styles.description}>
                        End with no regrets (or clothes) 💚💦
                    </Text>
                    <Text style={styles.description}>
                        Each category cranks up the heat — and just when you think you've survived it all...
                    </Text>
                    <Text style={styles.description}>
                        The Final Piece shows up to ruin you. Beautifully.
                    </Text>
                </View>
            </ScrollView>

            {/* Action Button */}
            <View style={styles.actionContainer}>
                <ActionButton
                    title="GOT IT"
                    onPress={handleGotIt}
                    variant="primary"
                    backgroundImage={IMAGES.IMAGES.btnBg1}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        position: 'relative',
        paddingHorizontal: 20,
        paddingBottom: 32,
        marginTop: 66,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        marginBottom: 20,
        top: 16,
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#666',
        marginBottom: 8,
        letterSpacing: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    chocolateIcon: {
        width: 32,
        height: 32,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        lineHeight: 24,
    },
    categoryList: {
        marginTop: 16,
        gap: 16,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    categoryNumberIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#EB7AAF',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 24,
    },
    categoryNumberText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    categoryContent: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    categoryDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        fontStyle: 'italic',
    },
    description: {
        fontSize: 16,
        color: '#191919',
        fontWeight: '500',
        lineHeight: 20,
        marginBottom: 12,

    },
    actionContainer: {
        width: '100%',
        paddingBottom: 48,
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    gotItButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    gotItButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
