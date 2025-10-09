import { MenuButton } from '@/components/MenuButton';
import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useAppThemeColor } from '@/hooks/useAppTheme';
import { useGameStore } from '@/state/useGameStore';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EndPage() {
    // Theme-aware colors
    const backgroundColor = useAppThemeColor('background');
    const cardBackground = useAppThemeColor('messageGrey');
    const textColor = useAppThemeColor('text');
    const secondaryTextColor = useAppThemeColor('placeholderText');
    const borderColor = useAppThemeColor('border');
    const primaryColor = useAppThemeColor('primary');
    const { mode, currentTurn, playerAvatar, playerNames } = useGameStore();
    const { t } = useTranslation();

    const handleBringChocolate = () => {
        // // Handle bring chocolate action
        // // Navigate to next step or game
        if (mode === 'A') {
            router.push('/(game)/a/promptA');
        } else {
            router.push('/(game)/b/chocoStats');
        }
    };

    const handleIBail = () => {
        // // Handle bail action
        // // Navigate back or to menu
        router.push('/startPage');
    };

    const handleMenu = () => {
        router.push('/menu');
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                 <View style={styles.header}>
                    <MenuButton onPress={handleMenu} />
                </View>
                {/* Top Section - Game Info and Player Profile */}
                <View style={[styles.topCard, { backgroundColor: useAppThemeColor('cardBackground') }]}>
                    <Text style={[styles.gameInfo, { color: '#8994A3' }]}>{`GAME ${mode} • ${t('endPage.gameChallenge')} 1`}</Text>
                    <View style={[styles.avatar, { backgroundColor, borderColor: primaryColor }]}>
                        {currentTurn === 'her' ? <Image source={playerAvatar.her} style={styles.avatarImage} /> : <Image source={playerAvatar.him} style={styles.avatarImage} />}
                    </View>
                    <Text style={[styles.playerName, { color: textColor }]}>{playerNames.her}</Text>
                </View>
                {/* Bottom Section - Action Buttons */}
                <View style={styles.actionContainer}>
                    <View style={styles.messageContainer}>
                        <View style={[styles.speechBubble, { backgroundColor: cardBackground }]}>
                            <Text style={[styles.questionText, { color: textColor }]}>{t('endPage.question')}</Text>
                            <View style={[styles.bubbleTail, { borderRightColor: cardBackground }]} />
                        </View>
                    </View>
                    <ActionButton
                        title={t('endPage.bringChocolate')}
                        onPress={handleBringChocolate}
                        variant="primary"
                        backgroundImage={IMAGES.IMAGES.buttonBg3}
                    />
                    <ActionButton
                        title={t('endPage.bail')}
                        onPress={handleIBail}
                        variant="secondary"
                        backgroundImage={IMAGES.IMAGES.btnBg2}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginTop: 70,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    topCard: {
        height: "auto",
        marginTop: 30,
        borderRadius: 20,
        paddingTop: 46,
        marginHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    gameInfo: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 24,
        letterSpacing: 0.5,
    },
    avatarImage: {
        width: 64,
        height: 64,
        // borderRadius: 35,
    },
    avatar: {
        width: 128,
        height: 128,
        borderRadius: 100,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24
    },
    playerName: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 58
    },
    messageContainer: {
        alignItems: 'center',
        marginBottom: 32
    },
    speechBubble: {
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        paddingHorizontal: 16,
        paddingVertical: 16,
        position: 'relative',
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 24,
    },
    bubbleTail: {
        position: 'absolute',
        bottom: 0,
        left: -10,
        // left: '-8%',
        width: 0,
        height: 0,
        borderTopWidth: 20,
        borderRightWidth: 15,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        
    },
    actionContainer: {
        marginTop: 'auto',
        // paddingBottom: 40,
        paddingHorizontal: 20,
    },
    bringChocolateButton: {
        backgroundColor: '#8B9DC3',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    bailButton: {
        backgroundColor: '#FF4757',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
