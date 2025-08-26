import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExperienceNoteA() {
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
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>Our Story</Text>
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Game Categories Section */}
                <View style={styles.section}>
                    <Text style={styles.description}>
                        Once upon a time…
                    </Text>
                    <Text style={styles.description}>
                        Just kidding. We don't do fairy tales here.
                    </Text>

                    <Text style={styles.description}>
                        Hushh. was born out of late-night confessions, chaotic relationships, and the kind of laughter that makes your abs sore.
                    </Text>
                </View>

                {/* How to Play Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>The Idea</Text>
                    <Text style={styles.description}>
                        We've all been there — stuck between craving connection and being too cool to talk about feelings.
                    </Text>
                    <Text style={styles.description}>
                        So we thought:
                    </Text>
                    <Text style={styles.description}>
                        What if chocolate wasn't just a snack… but a spark?
                    </Text>
                </View>

                {/* Rules and Consequences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>The Game</Text>
                    <Text style={styles.description}>
                        We created a game where couples stop scrolling and start experiencing.
                    </Text>
                    <Text style={styles.description}>
                        Where the tension simmers, the dares get personal, and the fails? Unhinged, delicious chaos.
                    </Text>
                    <Text style={styles.description}>
                        Every chocolate holds a challenge.
                    </Text>
                    <Text style={styles.description}>
                        Every challenge peels back a layer.
                    </Text>
                    <Text style={styles.description}>
                        Every fail becomes a memory (or a reason to laugh for hours).
                    </Text>
                </View>

                {/* The Journey Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>The Experience</Text>
                    <Text style={styles.description}>
                    This isn’t about being perfect.
                    </Text>
                    <Text style={styles.description}>
                    It’s about being real, raw, and a little unhinged.
                    </Text>
                    <Text style={styles.description}>
                    For the lovers, the fighters, the situationships, and the soulmates —
                    </Text>
                    <Text style={styles.description}>
                    the hushh. Experience is for you.
                    </Text>
                </View>
               
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Now let the games begin 🍫</Text>
                </View>
            </ScrollView>

            {/* Action Button */}
            <View style={styles.actionContainer}>
                <ActionButton
                    title="GOT IT"
                    onPress={handleGotIt}
                    variant="primary"
                    backgroundImage={IMAGES.IMAGES.buttonBg3}
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
        marginBottom: 24,
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
        backgroundColor: '#8B5CF6',
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
