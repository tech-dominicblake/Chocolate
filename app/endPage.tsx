import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useAppThemeColor } from '@/hooks/useAppTheme';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EndPage() {
    // Theme-aware colors
    const backgroundColor = useAppThemeColor('background');
    const cardBackground = useAppThemeColor('messageGrey');
    const textColor = useAppThemeColor('text');
    const secondaryTextColor = useAppThemeColor('placeholderText');
    const borderColor = useAppThemeColor('border');
    const primaryColor = useAppThemeColor('primary');

    const handleBringChocolate = () => {
        // // Handle bring chocolate action
        // console.log('Bring chocolate pressed');
        // // Navigate to next step or game
        router.push('/congrats');
    };

    const handleIBail = () => {
        // // Handle bail action
        // console.log('I bail pressed');
        // // Navigate back or to menu
        router.push('/congratsChoco');
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Top Section - Game Info and Player Profile */}
                <View style={[styles.topCard, { backgroundColor: useAppThemeColor('cardBackground') }]}>
                    <Text style={[styles.gameInfo, { color: '#8994A3' }]}>GAME B • ROUND 6</Text>
                    <View style={[styles.avatar, { backgroundColor: cardBackground, borderColor: primaryColor }]}>
                        <Image source={IMAGES.IMAGES.image7} style={styles.avatarImage} />
                    </View>
                    <Text style={[styles.playerName, { color: textColor }]}>Alex</Text>
                </View>
                {/* Bottom Section - Action Buttons */}
                <View style={styles.actionContainer}>
                    <View style={styles.messageContainer}>
                        <View style={[styles.speechBubble, { backgroundColor: cardBackground }]}>
                            <Text style={[styles.questionText, { color: textColor }]}>Still standing or emotionally  wrecked?</Text>
                            <View style={[styles.bubbleTail, { borderRightColor: cardBackground }]} />
                        </View>
                    </View>
                    <ActionButton
                        title="BRING THE CHOCOLATE"
                        onPress={handleBringChocolate}
                        variant="primary"
                        backgroundImage={IMAGES.IMAGES.buttonBg3}
                    />
                    <ActionButton
                        title="I BAIL"
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
        paddingTop: 60,
        paddingBottom: 40,
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
        marginTop: 136,
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
        borderRadius: 35,
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
        paddingHorizontal: 20,
        marginBottom: 32
    },
    speechBubble: {
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 16,
        maxWidth: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        left: '-5%',
        width: 0,
        height: 0,
        borderTopWidth: 40,
        borderRightWidth: 30,
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
