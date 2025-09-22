import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useThemeToggle } from '@/hooks/useAppTheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExperienceNoteA() {
    const { isDark } = useThemeToggle();
    
    const handleBack = () => {
        router.back();
    };

    const handleGotIt = () => {
        // Navigate to next step or back to game selection
        router.back();
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#27282A' : '#F5F5F5' }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <AntDesign name="left" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#333' }]}>Our Story</Text>
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Game Categories Section */}
                <View style={styles.section}>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Once upon a time…
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Just kidding. We don't do fairy tales here.
                    </Text>

                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Hushh. was born out of late-night confessions, chaotic relationships, and the kind of laughter that makes your abs sore.
                    </Text>
                </View>

                {/* How to Play Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>The Idea</Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        We've all been there — stuck between craving connection and being too cool to talk about feelings.
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        So we thought:
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        What if chocolate wasn't just a snack… but a spark?
                    </Text>
                </View>

                {/* Rules and Consequences Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>The Game</Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        We created a game where couples stop scrolling and start experiencing.
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Where the tension simmers, the dares get personal, and the fails? Unhinged, delicious chaos.
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Every chocolate holds a challenge.
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Every challenge peels back a layer.
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Every fail becomes a memory (or a reason to laugh for hours).
                    </Text>
                </View>

                {/* The Journey Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>The Experience</Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                    This isn't about being perfect.
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                    It's about being real, raw, and a little unhinged.
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                    For the lovers, the fighters, the situationships, and the soulmates —
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                    the hushh. Experience is for you.
                    </Text>
                </View>
               
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>Now let the games begin 🍫</Text>
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
