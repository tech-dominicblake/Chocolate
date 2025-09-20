import { IMAGES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeToggle } from '../../hooks/useAppTheme';
import { useGameStore } from '../../state/useGameStore';

// Header component for game pages
const GameAHeader = () => {
    const { round, level, currentTurn, playerNames, playerAvatar, activeTooltip } = useGameStore();
    const { isDark } = useThemeToggle();

    const isRoundThree = round === 3;
    const herAvatar = playerAvatar.her || IMAGES.IMAGES.avatarGirl1;
    const himAvatar = playerAvatar.him || IMAGES.IMAGES.avatarMan1;
    const userName = playerNames?.[currentTurn] || '';

    return (
        <View style={[styles.header, {
            backgroundColor: isDark ? '#27282A' : '#FFFFFF',
            borderBottomColor: isDark ? '#4B5563' : '#E5E5E5'
        }]}>
            {/* Left side - Game status and user info */}
            <View style={styles.leftSection}>
                {/* Game status */}
                <View style={styles.gameStatus}>
                    <Text style={[styles.roundText, { color: isDark ? '#9CA3AF' : '#9BA1A6' }]}>ROUND{round}</Text>
                    {round < 3 && <Text style={[styles.separator, { color: isDark ? '#9CA3AF' : '#9BA1A6' }]}> • </Text>}
                    {round < 3 && <Text style={[styles.levelText, { color: isDark ? '#FF6B9D' : '#FF6B9D' }]}>LVL {Math.ceil(level / 2)}</Text>}
                </View>

                {/* User info */}
                {isRoundThree ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={herAvatar} style={[styles.avatar, styles.avatar]} />
                        <Image source={himAvatar} style={[styles.avatar, styles.avatar]} />
                        <Text style={[styles.userName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                            {(playerNames?.her || 'Her') + ' & ' + (playerNames?.him || 'Him')}
                        </Text>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={currentTurn === 'her' ? herAvatar : himAvatar} style={styles.avatar} />
                        <Text style={[styles.userName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                            {playerNames?.[currentTurn]}
                        </Text>
                    </View>
                )}
            </View>

            {/* Right side - Action icons */}
            <View style={styles.rightSection}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="map-outline" size={24} color="#9BA1A6" />
                </TouchableOpacity>

                <View>
                    <TouchableOpacity style={styles.iconButton}
                        onPress={() => router.push('/(game)/a/chocoStatsRound1')}
                    >
                        <Ionicons name="cube-outline" size={24} color={activeTooltip ? '#7E80F4' : '#9BA1A6'} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/menu')}>
                    <Ionicons name="menu-outline" size={24} color="#9BA1A6" />
                </TouchableOpacity>
            </View>

            {/* Speech Bubble - Production-safe positioning */}
            {activeTooltip && (
                <View style={[
                    styles.speechBubbleContainer,
                ]}>
                    <View style={styles.speechBubble}>
                        <Text style={styles.speechBubbleText}>Locate the floating Chocolate in the box</Text>
                        <View style={styles.speechBubbleTail} />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB', // Add explicit border color
        zIndex: 10, // Lower z-index to allow speech bubble to appear above
        elevation: 2, // Lower elevation for Android
    },
    leftSection: {
        flex: 1,
    },
    gameStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    roundText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#9BA1A6',
    },
    separator: {
        fontSize: 16,
        color: '#9BA1A6',
        marginHorizontal: 4,
    },
    levelText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF6B9D',
    },
    turnText: {
        fontSize: 14,
        fontWeight: '600',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        // borderRadius: 16,
        marginRight: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
        marginLeft: 8,
    },
    speechBubbleContainer: {
        position: 'absolute',
        top: 100, // Position below the header
        right: 20, // Align with the right side where cube icon is
        zIndex: 9999, // Much higher z-index to ensure it's above everything
        elevation: 50, // Very high elevation for Android production builds
        // Additional production-specific properties
        backgroundColor: 'transparent', // Ensure no background conflicts
    },
    speechBubble: {
        backgroundColor: '#7E80F4',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        position: 'relative',
        width: '100%',
        // Add explicit border for production
        borderWidth: 1,
        borderColor: '#6366F1', // Slightly darker purple for border
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8, // For Android shadow
    },
    speechBubbleText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    speechBubbleTail: {
        position: 'absolute',
        top: -11,
        right: 55, // Position tail to point to cube icon
        width: 0,
        height: 0,
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderBottomWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#7E80F4',
        zIndex: 10000, // Even higher than speech bubble container
        elevation: 51, // Even higher elevation for Android production
    },
    // Android production-specific fix
    androidProductionFix: {
        position: 'absolute',
        top: 0, // Position at very top
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        elevation: 100,
        pointerEvents: 'box-none', // Allow touches to pass through
    },
});

export default GameAHeader;
