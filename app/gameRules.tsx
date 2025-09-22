import { MenuButton } from '@/components/MenuButton';
import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useAppThemeColor } from '@/hooks/useAppTheme';
import { useThemeContext } from '@/providers/ThemeProvider';
import { useGameStore, useMessages } from '@/state/useGameStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameRules() {
    const { isDark } = useThemeContext();
    const backgroundColor = useAppThemeColor('background');
    const textColor = useAppThemeColor('text');
    const cardBackgroundColor = useAppThemeColor('cardBackground');
    const { mode } = useGameStore();
    const { queue } = useMessages();

    const handleBack = () => {
        router.back();
    };

    const handleConfirmContinue = () => {
        if (queue.length > 0) {
            if (mode === 'A') {
                router.push('/(game)/a/promptA');
            } else {
                router.push('/(game)/b/promptB');
            }
        } else {
            router.push('/startPage');
        }
        // // Navigate to game selection or next step
        // router.push('/aboutPage');
    };

    const handleGameACard = () => {
        // Navigate to experience note page
        router.push('/experienceNoteA');
    };

    const handleGameBCard = () => {
        // Navigate to experienceB page
        router.push('/experienceNoteB');
    };

    const handleMenu = () => {
        router.push('/menu');
    };

    return (
        <View style={[
            styles.container,
            { backgroundColor }
        ]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color='#79828F' />
                </TouchableOpacity>
                <Text style={[
                    styles.title,
                    { color: textColor }
                ]}>What is hushh?</Text>
                {/* <View style={styles.placeholder} /> */}
                <MenuButton onPress={handleMenu} />

            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Game A Card */}
                <TouchableOpacity style={[
                    styles.gameCard,
                    { backgroundColor: cardBackgroundColor }
                ]} onPress={handleGameACard}>
                    <View style={styles.iconContainer}>
                        <View style={styles.chocolateIcon}>
                            <Image source={IMAGES.IMAGES.image2} style={styles.chocolateIcon} />
                        </View>
                    </View>
                    <Text style={[
                        styles.gameLabel,
                        { color: isDark ? '#E8EAF6' : '#666' }
                    ]}>GAME A</Text>
                    <Text style={[
                        styles.gameTitle,
                        { color: textColor }
                    ]}>hushh. Experience</Text>
                </TouchableOpacity>

                {/* Game B Card */}
                <TouchableOpacity style={[
                    styles.gameCard,
                    { backgroundColor: cardBackgroundColor }
                ]} onPress={handleGameBCard}>
                    <View style={styles.iconContainer}>
                        <Image source={IMAGES.IMAGES.image13} style={styles.chocolateIcon} />
                    </View>
                    <Text style={[
                        styles.gameLabel,
                        { color: isDark ? '#E8EAF6' : '#666' }
                    ]}>GAME B</Text>
                    <Text style={[
                        styles.gameTitle,
                        { color: textColor }
                    ]}>hushh. Mayhem</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Action Button */}
            <View style={styles.actionContainer}>

                <ActionButton
                    title="CONFIRM & CONTINUE"
                    onPress={handleConfirmContinue}
                    variant="primary"
                    backgroundImage={IMAGES.IMAGES.btnBg1}
                    color='#C2185B'
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Light theme background - preserved
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 72,
        paddingBottom: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Dark text - preserved for light theme
        textAlign: 'center',
        flex: 1,
        paddingTop: 12,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        marginTop: 98,
        paddingHorizontal: 20,
    },
    gameCard: {
        backgroundColor: '#FFFFFF', // Light theme background - preserved
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },
    chocolateIcon: {
        position: 'relative',
        width: 64,
        height: 64,
    },
    chocolateBar: {
        width: 32,
        height: 20,
        backgroundColor: '#8B4513',
        borderRadius: 4,
        position: 'absolute',
        top: 10,
        left: 4,
    },
    chocolateWrapper: {
        width: 36,
        height: 24,
        backgroundColor: '#FF0000',
        borderRadius: 6,
        position: 'absolute',
        top: 8,
        left: 2,
        opacity: 0.8,
    },
    devilIcon: {
        fontSize: 48,
    },
    gameLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#666', // Light theme text - preserved
        marginBottom: 8,
        letterSpacing: 1,
    },
    gameTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333', // Light theme text - preserved
        textAlign: 'center',
    },
    actionContainer: {
        marginTop: 'auto',
        paddingBottom: 40,
        left: 0,
        right: 0,
        padding: 16,
    },
    confirmButton: {
        backgroundColor: '#FF6B9D',
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
    confirmButtonText: {
        color: '#8B2756',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
