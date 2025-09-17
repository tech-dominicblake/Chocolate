import { IMAGES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeToggle } from '../../hooks/useAppTheme';
import { useGameStore } from '../../state/useGameStore';

// Header component for game pages
const GameAHeader = () => {
    const { round, level, currentTurn, playerNames } = useGameStore();
    const { isDark } = useThemeToggle();

    const isRoundThree = round === 3;
    const herAvatar = IMAGES.IMAGES.image12;
    const himAvatar = IMAGES.IMAGES.image7;
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

                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="cube-outline" size={24} color={isDark ? '#7F81F5' : '#9BA1A6'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/menu')}>
                    <Ionicons name="menu-outline" size={24} color="#9BA1A6" />
                </TouchableOpacity>
            </View>
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
        borderRadius: 16,
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
});

export default GameAHeader;
