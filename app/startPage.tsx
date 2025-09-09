import { Logo } from "@/components/Logo";
import ActionButton from "@/components/prompts/ActionButton";
import { IMAGES } from "@/constants";
import { useAppThemeColor } from "@/hooks/useAppTheme";
import { useGameStore, useMessages } from "@/state/useGameStore";
import { router } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";


export default function StartPage() {

    const { queue } = useMessages();
    const { mode } = useGameStore();
    const { clear } = useMessages();

    const handleRestartGame = () => {
        router.push('/userInfo');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Logo size={186} />
                <Text style={[styles.title, { color: useAppThemeColor('text') }]}>It's tension you can taste.</Text>
            </View>
            <View style={styles.buttonContainer} >
                {queue.length !== 0 ?
                    <>
                        <ActionButton
                            title="CONTINUE PLAYING"
                            onPress={() => { router.push(mode === 'A' ? '/(game)/a/promptA' : '/(game)/b/promptB') }}
                            variant="primary"
                            backgroundImage={IMAGES.IMAGES.buttonBg3}
                            color='#33358F'
                        />
                        <ActionButton
                            title="RESTART GAME"
                            onPress={() => { handleRestartGame() }}
                            variant="primary"
                            backgroundImage={IMAGES.IMAGES.buttonBg2}
                            color='#33358F'

                        />
                        <ActionButton
                            title="WHAT IS HUSHH?"
                            onPress={() => { router.push('/gameRules') }}
                            variant="primary"
                            backgroundImage={IMAGES.IMAGES.buttonBg1}
                            color='#33358F'
                        />
                    </>
                    :
                    <>
                        <ActionButton
                            title="START GAME"
                            onPress={() => { router.push('/languageSelection') }}
                            variant="primary"
                            backgroundImage={IMAGES.IMAGES.buttonBg3}
                            color='#33358F'
                        />
                        <ActionButton
                            title="WHAT IS HUSHH?"
                            onPress={() => router.push('/gameRules')}
                            variant="primary"
                            backgroundImage={IMAGES.IMAGES.buttonBg2}
                            color='#33358F'
                        />
                    </>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center"
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 46, // Increased spacing
        marginTop: 20,
    },
    title: {
        fontSize: 20, // Increased font size
        fontWeight: 500, // Bolder font weight
        textAlign: 'center',
        fontFamily: 'Inter',
        marginTop: 32, // Increased spacing
        letterSpacing: -0.5, // Better letter spacing
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        padding: 16,
    }
});