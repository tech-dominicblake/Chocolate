import Images from '@/constants/Images';
import { useAppThemeColor } from '@/hooks/useAppTheme';
import { useThemeContext } from '@/providers/ThemeProvider';
import { useGameStore } from '@/state/useGameStore';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function CongratsPage() {
    const { isDark } = useThemeContext();
    const { t } = useTranslation();
    const { mode } = useGameStore();

    useEffect(() => {
        // Navigate to congratsChoco page after 2 seconds
        const timer = setTimeout(() => {
            if (mode === "B") router.push('/(game)/b/chocoStats');
        }, 2000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    if (isDark) {
        return (
            <View style={styles.topContainer}>
                <LinearGradient
                    style={styles.container}
                    colors={['#2D2F92', '#4E4FA6', '#8383C6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Image source={Images.IMAGES.image9} style={styles.congratsImage} />
                    {/* Main Content */}
                    <View style={styles.contentContainer}>
                        {/* Party Popper Graphic */}
                        <Image source={Images.IMAGES.image1} style={styles.partyPopperHeader} />
                        {/* Congratulatory Text */}
                        <View style={styles.textContainer}>
                            <Text style={[styles.congratsText, { color: useAppThemeColor('text') }]}>{t('congrats.title')}</Text>
                            <Text style={[styles.taskCompletedText, { color: useAppThemeColor('text') }]}>{t('congrats.taskCompleted')}</Text>

                            <View style={styles.subTextContainer}>
                                <Text style={[styles.subText, { color: useAppThemeColor('text') }]}>{t('congrats.line1')}</Text>
                                <Text style={[styles.subText, { color: useAppThemeColor('text') }]}>{t('congrats.line2')}</Text>
                                <Text style={[styles.subText, { color: useAppThemeColor('text') }]}>{t('congrats.line3')}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: '#E6E6FA' }]}>
            <Image source={Images.IMAGES.image9} style={styles.congratsImage} />
            {/* Main Content */}
            <View style={styles.contentContainer}>
                {/* Party Popper Graphic */}
                <Image source={Images.IMAGES.image1} style={styles.partyPopperHeader} />
                {/* Congratulatory Text */}
                <View style={styles.textContainer}>
                    <Text style={[styles.congratsText, { color: useAppThemeColor('text') }]}>{t('congrats.title')}</Text>
                    <Text style={[styles.taskCompletedText, { color: useAppThemeColor('text') }]}>{t('congrats.taskCompleted')}</Text>

                    <View style={styles.subTextContainer}>
                        <Text style={[styles.subText, { color: useAppThemeColor('text') }]}>{t('congrats.line1')}</Text>
                        <Text style={[styles.subText, { color: useAppThemeColor('text') }]}>{t('congrats.line2')}</Text>
                        <Text style={[styles.subText, { color: useAppThemeColor('text') }]}>{t('congrats.line3')}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        // backgroundColor: '#E6E6FA', // Light purple background
    },
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#E6E6FA', // Light purple background
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 60, // Account for status bar
    },
    partyPopperContainer: {
        marginBottom: 50,
        alignItems: 'center',
    },
    partyPopper: {
        alignItems: 'center',
        position: 'relative',
        width: 100,
        height: 100,
    },
    partyPopperHeader: {
        width: 170,
        height: 165,
    },

    popperBody: {
        alignItems: 'center',
    },
    popperBase: {
        width: 80,
        height: 120,
        backgroundColor: '#FFD700', // Gold color
        borderRadius: 40,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    popperOpening: {
        width: 60,
        height: 20,
        backgroundColor: '#FFD700',
        borderRadius: 30,
        marginTop: -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openingRim: {
        width: 40,
        height: 12,
        backgroundColor: '#B8860B',
        borderRadius: 6,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    congratsText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
        textAlign: 'center',
    },
    taskCompletedText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 30,
        textAlign: 'center',
    },
    subTextContainer: {
        alignItems: 'center',
    },
    subText: {
        fontSize: 18,
        color: '#4A4A4A',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 4,
    },
    emoji: {
        color: '#8B5CF6', // Purple color for the devil emoji
    },
    continueButton: {
        backgroundColor: '#8B5CF6', // Purple color
        paddingHorizontal: 40,
        paddingVertical: 16,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    congratsImage: {
        width: "100%",
        height: 300,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
});
