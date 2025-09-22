import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useThemeToggle } from '@/hooks/useAppTheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExperienceNoteB() {
    const { isDark } = useThemeToggle();
    
    const handleBack = () => {
        router.back();
    };

    const handleGotIt = () => {
        // Navigate to next step or back to game selection
        router.push('/gameSelection');
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#27282A' : '#F5F5F5' }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <AntDesign name="left" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={[styles.gameLabel, { color: isDark ? '#9BA1A6' : '#666' }]}>GAME B</Text>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#333' }]}>hushh. Experience</Text>
                        <Image source={IMAGES.IMAGES.image3} style={styles.chocolateIcon} />
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Game Categories Section */}
                <View style={styles.section}>
                    <Text style={[styles.categoryTitle, { color: isDark ? '#79828F' : '#333' }]}>
                        In this game, you'll face three spicy categories — depending on relationship stage:
                    </Text>
                    <View style={styles.categoryList}>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryNumberIcon}>
                                <Text style={styles.categoryNumberText}>1</Text>
                            </View>
                            <View style={styles.categoryContent}>
                                <Text style={[styles.categoryTitle, { color: isDark ? '#79828F' : '#333' }]}>Recently Met (&lt;3 months) - flirty, fresh, still pretending to be normal</Text>
                            </View>
                        </View>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryNumberIcon}>
                                <Text style={styles.categoryNumberText}>2</Text>
                            </View>
                            <View style={styles.categoryContent}>
                                <Text style={[styles.categoryTitle, { color: isDark ? '#79828F' : '#333' }]}>Getting Serious (3-12 months) - feelings are real, chaos is rising</Text>
                            </View>
                        </View>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryNumberIcon}>
                                <Text style={styles.categoryNumberText}>3</Text>
                            </View>
                            <View style={styles.categoryContent}>
                                <Text style={[styles.categoryTitle, { color: isDark ? '#79828F' : '#333' }]}>We Already Hate Each Other  love is strong, patience is not(1+ year) - </Text>
                                <Text style={[styles.categoryDescription, { color: isDark ? '#9BA1A6' : '#666' }]}>

                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* How to Play Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>How to Play</Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        You'll take turns pulling chocolates and completing challenges that test your boldness, chemistry… and maybe your dignity
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Each category comes with two wild rounds and 12 daring tasks
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        In this mode, YOU choose the chocolate pieces at random from the box — and take whatever challenge comes with it
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        It's chaos by design.
                    </Text>
                </View>

                {/* Rules and Consequences Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>Rules and Consequences</Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Refuse the task?
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        No escape — you get a Fail instead
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        And trust us, they're not polite either 👀
                    </Text>
                </View>

                {/* The Journey Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>The Journey</Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Start cute
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Get chaotic
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        End with no regrets (or clothes) 💚💦
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        Each category cranks up the heat — and just when you think you've survived it all...
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
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
        marginBottom: 32,
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
    },
    categoryDescription: {
        fontSize: 14,
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
