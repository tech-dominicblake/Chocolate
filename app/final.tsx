import Images from '@/constants/Images';
import { useThemeContext } from '@/providers/ThemeProvider';
import { useGameStore } from '@/state/useGameStore';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function FinalPage() {
const { clearAllStates } = useGameStore();
const { isDark } = useThemeContext();
const { t } = useTranslation();

    useEffect(() => {
        // Clear ALL global states comprehensively
        clearAllStates();
        
        const timer = setTimeout(() => {
            router.push('/startPage');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* Gradient Background */}
            <LinearGradient
                colors={isDark ? ['#B42322', '#D25A28', '#DE9729'] : ['#C74444', '#DA764C', '#F2B658']}
                style={styles.gradientBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            
            {/* Concentric Circles Layer */}
            <View style={styles.circlesContainer}>
                <View style={styles.circle1} />
                <View style={styles.circle2} />
                <View style={styles.circle3} />
                <View style={styles.circle4} />
                <View style={styles.circle5} />
                <View style={styles.circle6} />
                <View style={styles.circle7} />
                <View style={styles.circle8} />
            </View>

            {/* Central Heart Graphic */}
            <View style={styles.heartContainer}>
               <Image source={Images.IMAGES.choco6} style={styles.heart} />
            </View>

            {/* Text Message */}
            <View style={styles.textContainer}>
                <Text style={styles.messageText}>
                    {t('final.message')}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    gradientBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    circlesContainer: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: [{ translateX: '0%' }, { translateY: '-50%' }],
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle1: {
        position: 'absolute',
        width: 896,
        height: 896,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 448,
        opacity: 0.16,
        top: '50%',
        left: '50%',
        marginTop: -448,
        marginLeft: -448,
    },
    circle8: {
        position: 'absolute',
        width: 1152,
        height: 1152,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 576,
        opacity: 0.16,
        top: '50%',
        left: '50%',
        marginTop: -576,
        marginLeft: -576,
    },
    circle7: {
        position: 'absolute',
        width: 1024,
        height: 1024,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 512,
        opacity: 0.16,
        top: '50%',
        left: '50%',
        marginTop: -512,
        marginLeft: -512,
    },
    circle2: {
        position: 'absolute',
        width: 768,
        height: 768,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 384,
        opacity: 0.16,
        top: '50%',
        left: '50%',
        marginTop: -384,
        marginLeft: -384,
    },
    circle3: {
        position: 'absolute',
        width: 640,
        height: 640,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 320,
        opacity: 0.16,
        top: '50%',
        left: '50%',
        marginTop: -320,
        marginLeft: -320,
    },
    circle4: {
        position: 'absolute',
        width: 512,
        height: 512,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 256,
        opacity: 0.16,
        top: '50%',
        left: '50%',
        marginTop: -256,
        marginLeft: -256,
    },
    circle5: {
        position: 'absolute',
        width: 384,
        height: 384,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 192,
        opacity: 0.16,
        top: '50%',
        left: '50%',
        marginTop: -192,
        marginLeft: -192,
    },
    circle6: {
        position: 'absolute',
        width: 256,
        height: 256,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 128,
        opacity: 0.16,
        top: '50%',
        left: '50%',
        marginTop: -128,
        marginLeft: -128,
    },
    heartContainer: {
       position: 'absolute',
       top: '40%',
       left: '33%',
       transform: [{ translateX: '0%' }, { translateY: '-50%' }],
       alignItems: 'center',
       justifyContent: 'center',
    },
    heart: {
        width: 170,
        height: 165,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heartBody: {
        width: 100,
        height: 100,
        backgroundColor: '#8B0000', // Dark red
        borderRadius: 50,
        // Create heart shape with transforms
        transform: [
            { rotate: '45deg' },
            { scaleX: 1.2 },
            { scaleY: 0.8 }
        ],
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
    },
    heartHighlight1: {
        position: 'absolute',
        width: 30,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 15,
        top: 15,
        left: 15,
        transform: [{ rotate: '45deg' }],
    },
    heartHighlight2: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        top: 25,
        right: 20,
        transform: [{ rotate: '45deg' }],
    },
    heartHighlight3: {
        position: 'absolute',
        width: 15,
        height: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 7.5,
        bottom: 20,
        left: 30,
        transform: [{ rotate: '45deg' }],
    },
    textContainer: {
        position: 'absolute',
        top: '57%',
        left: '10%',
        transform: [{ translateX: '0%' }, { translateY: '-50%' }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        fontSize: 32,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 50,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});
