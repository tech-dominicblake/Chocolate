import Images from '@/constants/Images';
import { useAppThemeColor } from '@/hooks/useAppTheme';
import { useThemeContext } from '@/providers/ThemeProvider';
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

export default function CongratsChocoPage() {
    const { isDark } = useThemeContext();
    const textColor = useAppThemeColor('text');
    const { t } = useTranslation();

    useEffect(() => {
        // Navigate to congratsChoco page after 2 seconds
        const timer = setTimeout(() => {
            router.push('/(game)/b/chocoStats');
        }, 2000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    if (isDark) {
        return (
            <LinearGradient
                style={styles.container}
                colors={['#2D2F92', '#9D9DCD', '#8383C6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Image source={Images.IMAGES.image9} style={styles.congratsImage} />
                {/* Main Content */}
                <View style={styles.contentContainer}>
                    {/* Party Popper Graphic */}
                    <Image source={Images.IMAGES.choco12} style={styles.partyPopperHeader} />
                    {/* Congratulatory Text */}
                    <View style={styles.textContainer}>
                        <Text style={[styles.congratsText, { color: textColor }]}>{t('congrats.title')}</Text>
                        <Text style={[styles.taskCompletedText, { color: textColor }]}>{t('congrats.taskCompleted')}</Text>

                        <View style={styles.subTextContainer}>
                            <Text style={[styles.subText, { color: textColor }]}>{t('congrats.line1')}</Text>
                            <Text style={[styles.subText, { color: textColor }]}>{t('congrats.line2')}</Text>
                            <Text style={[styles.subText, { color: textColor }]}>{t('congrats.line3')}</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={Images.IMAGES.image9} style={styles.congratsImage} />
            {/* Main Content */}
            <View style={styles.contentContainer}>
                {/* Party Popper Graphic */}
                <Image source={Images.IMAGES.choco12} style={styles.partyPopperHeader} />
                {/* Congratulatory Text */}
                <View style={styles.textContainer}>
                    <Text style={styles.congratsText}>{t('congrats.title')}</Text>
                    <Text style={styles.taskCompletedText}>{t('congrats.taskCompleted')}</Text>

                    <View style={styles.subTextContainer}>
                        <Text style={styles.subText}>{t('congrats.line1')}</Text>
                        <Text style={styles.subText}>{t('congrats.line2')}</Text>
                        <Text style={styles.subText}>{t('congrats.line3')}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
