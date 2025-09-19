import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useThemeToggle } from '@/hooks/useAppTheme';
import { useGameStore } from '@/state/useGameStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Avatar data - using emoji representations
const GirlAVATARS = [
    { id: 1, emoji: IMAGES.IMAGES.avatarGirl1, name: 'Blonde', skinTone: 'light' },
    { id: 2, emoji: IMAGES.IMAGES.avatarGirl2, name: 'Black Hair', skinTone: 'light' },
    { id: 3, emoji: IMAGES.IMAGES.avatarGirl3, name: 'Dirty Blonde', skinTone: 'light-medium' },
    { id: 4, emoji: IMAGES.IMAGES.avatarGirl4, name: 'Brown Hair', skinTone: 'medium' },
    { id: 5, emoji: IMAGES.IMAGES.avatarGirl5, name: 'Dark Brown Hair', skinTone: 'medium-dark' },
    { id: 6, emoji: IMAGES.IMAGES.avatarGirl6, name: 'Black Hair', skinTone: 'dark' },
];
const BoyAVATARS = [
    { id: 1, emoji: IMAGES.IMAGES.avatarMan1, name: 'Blonde', skinTone: 'light' },
    { id: 2, emoji: IMAGES.IMAGES.avatarMan2, name: 'Black Hair', skinTone: 'light' },
    { id: 3, emoji: IMAGES.IMAGES.avatarMan3, name: 'Dirty Blonde', skinTone: 'light-medium' },
    { id: 4, emoji: IMAGES.IMAGES.avatarMan4, name: 'Brown Hair', skinTone: 'medium' },
    { id: 5, emoji: IMAGES.IMAGES.avatarMan5, name: 'Dark Brown Hair', skinTone: 'medium-dark' },
    { id: 6, emoji: IMAGES.IMAGES.avatarMan6, name: 'Black Hair', skinTone: 'dark' },
];

export default function BoyAvatarSelection() {
    const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
    const { isDark } = useThemeToggle();
    const { playerNames, setPlayerAvatar } = useGameStore();

    const handleAvatarSelect = (avatarId: number) => {
        setSelectedAvatar(avatarId);
    };

    const handleContinue = () => {
        // Save avatar selection and navigate to game
        setPlayerAvatar('him', BoyAVATARS[selectedAvatar - 1].emoji);
        // You can add avatar selection to your game store here if needed
        router.push('/gameSelection');
    };

    const handleBack = () => {
        // Go back to sign-in page
        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#27282A' : '#F5F5F5' }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            
            {/* Header */}
            <View style={[styles.header, { backgroundColor: isDark ? '#27282A' : '#F5F5F5' }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color='#79828F' />
                </TouchableOpacity>
                
                <View style={styles.headerCenter}>
                    <Text style={[styles.playerText, { color: '#7E80F4' }]}>
                        PLAYER 2 • HIM
                    </Text>
                    <Text style={[styles.nameText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                        {playerNames?.him}
                    </Text>
                </View>
                
                <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/menu')}>
                    <Ionicons name="menu" size={24} color='#79828F' />
                </TouchableOpacity>
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                    Choose avatar
                </Text>
            </View>

            {/* Avatar Grid */}
            <View style={styles.avatarContainer}>
                <ScrollView 
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.avatarGrid}>
                        {BoyAVATARS.map((avatar, index) => (
                            <View key={avatar.id} style={styles.avatarColumn}>
                                <TouchableOpacity
                                    style={[
                                        styles.avatarCard,
                                        {
                                            backgroundColor: selectedAvatar === avatar.id 
                                            ? (isDark ? '#31333D' : '#ECECFD')
                                             : isDark ? '#3A3A3A' : '#FFFFFF',
                                         borderColor: selectedAvatar === avatar.id 
                                             ? '#7E80F4' 
                                             : isDark ? '#4B5563' : '#E5E5E5',
                                        }
                                    ]}
                                    onPress={() => handleAvatarSelect(avatar.id)}
                                    activeOpacity={0.7}
                                >
                                   <Image source={avatar.emoji} style={styles.avatarImage} />
                                   
                                    {selectedAvatar === avatar.id && (
                                        <View style={[styles.checkmarkContainer, { backgroundColor: isDark ? '#7E80F4' : '#7E80F4' }]}>
                                        <Ionicons name="checkmark" size={16} color={isDark ? '#363339' : '#FFFFFF'} />
                                    </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* Continue Button */}
            <View style={styles.buttonContainer}>
                <ActionButton
                    title="CONTINUE"
                    onPress={handleContinue}
                    variant="primary"
                    backgroundImage={IMAGES.IMAGES.buttonBg3}
                    color='#33358F'
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginTop: 70,
    },
    backButton: {
        padding: 8,
    },
    headerCenter: {
        alignItems: 'center',
        flex: 1,
    },
    playerText: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 2,
    },
    menuButton: {
        padding: 8,
    },
    titleContainer: {
        paddingHorizontal: 20,
        // paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
    },
    avatarContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 10,
    },
    avatarColumn: {
        width: 145,
        // marginBottom: 8,
    },
    avatarCard: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatarEmoji: {
        fontSize: 48,
    },
    avatarImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    checkmarkContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingBottom: 48,
    },
    continueButton: {
        backgroundColor: '#FF6B9D',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#FF6B9D',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1,
    },
});
