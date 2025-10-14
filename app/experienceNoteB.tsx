import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useThemeToggle } from '@/hooks/useAppTheme';
import { useGameStore, useMessages } from '@/state/useGameStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExperienceNoteB() {
    const { isDark } = useThemeToggle();
    const { queue } = useMessages();
    const { mode } = useGameStore();
    const { t } = useTranslation();
    
    const handleBack = () => {
        router.back();
    };

    const handleGotIt = () => {
        // Navigate to next step or back to game selection
        if (queue.length > 0) {
            if (mode === 'A') {
                router.push('/(game)/a/promptA');
            } else {
                router.push('/(game)/b/promptB');
            }
        } else {
            router.push('/startPage');
        }
    };


    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#27282A' : '#F5F5F5' }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <AntDesign name="left" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={[styles.gameLabel, { color: isDark ? '#9BA1A6' : '#666' }]}>{t('experienceNoteB.gameLabel')}</Text>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#333' }]}>{t('experienceNoteB.title')}</Text>
                        <Image source={IMAGES.IMAGES.image3} style={styles.chocolateIcon} />
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Game Categories Section */}
                <View style={styles.section}>
                    <Text style={[styles.categoryTitle, { color: isDark ? '#79828F' : '#333' }]}>
                        {t('experienceNoteB.intro')}
                    </Text>
                    <View style={styles.categoryList}>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryNumberIcon}>
                                <Text style={styles.categoryNumberText}>1</Text>
                            </View>
                            <View style={styles.categoryContent}>
                                <Text style={[styles.categoryTitle, { color: isDark ? '#79828F' : '#333' }]}>{t('experienceNoteB.category1')}</Text>
                            </View>
                        </View>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryNumberIcon}>
                                <Text style={styles.categoryNumberText}>2</Text>
                            </View>
                            <View style={styles.categoryContent}>
                                <Text style={[styles.categoryTitle, { color: isDark ? '#79828F' : '#333' }]}>{t('experienceNoteB.category2')}</Text>
                            </View>
                        </View>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryNumberIcon}>
                                <Text style={styles.categoryNumberText}>3</Text>
                            </View>
                            <View style={styles.categoryContent}>
                                <Text style={[styles.categoryTitle, { color: isDark ? '#79828F' : '#333' }]}>{t('experienceNoteB.category3')}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* How to Play Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>{t('experienceNoteB.howToPlayTitle')}</Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.howToPlay1')}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.howToPlay2')}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.howToPlay3')}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.howToPlay4')}
                    </Text>
                </View>

                {/* Rules and Consequences Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>{t('experienceNoteB.rulesTitle')}</Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.rules1')}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.rules2')}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.rules3')}
                    </Text>
                </View>

                {/* The Journey Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDark ? '#79828F' : '#333' }]}>{t('experienceNoteB.journeyTitle')}</Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.journey1')}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.journey2')}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.journey3')}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.journey4')}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? '#79828F' : '#191919' }]}>
                        {t('experienceNoteB.journey5')}
                    </Text>
                </View>
            </ScrollView>

            {/* Action Button */}
            <View style={styles.actionContainer}>
                <ActionButton
                    title={t('experienceNoteB.gotItButton')}
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
