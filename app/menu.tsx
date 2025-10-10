import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useThemeToggle } from '@/hooks/useAppTheme';
import { useSettingsStore } from '@/state/useSettingsStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    Linking,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function MenuPage() {
    const { language, setLanguage } = useSettingsStore();
    const { t } = useTranslation();
    
    // Map i18n codes to menu display
    const langToDisplay = { en: 'ENG', ru: 'RUS', id: 'ID' } as const;
    const displayToLang = { ENG: 'en', RUS: 'ru', ID: 'id' } as const;
    const selectedLanguage = langToDisplay[language];
    
    // Use global theme context
    const { themeMode, setThemeMode, isDark } = useThemeToggle();
    
    const handleClose = () => {
        router.back();
    };

    const handleLanguageSelect = async (displayLang: 'ENG' | 'RUS' | 'ID') => {
        const langCode = displayToLang[displayLang];
        await setLanguage(langCode);
    };

    const handleThemeToggle = (mode: 'light' | 'dark') => {
        setThemeMode(mode);
    };

    const handleGameRules = () => {
        router.push('/gameRules');
    };

    const handleReviewApp = () => {
        router.push('/userInfo');
    };

    const handleHomeBtn = () => {
        router.push('/startPage');
    };

    const handleWhatsAppContact = async () => {
        const whatsappUrl = 'https://wa.me/6282342431740';
        try {
            const supported = await Linking.canOpenURL(whatsappUrl);
            if (supported) {
                await Linking.openURL(whatsappUrl);
            } else {
                Alert.alert(t('menu.errorTitle'), t('menu.errorWhatsAppNotInstalled'));
            }
        } catch (error) {
            Alert.alert(t('menu.errorTitle'), t('menu.errorWhatsAppFailed'));
        }
    };

    const handleWhatsAppAffiliate = async () => {
        const whatsappUrl = 'https://wa.me/6282342431740?text=Hi! I want to become an affiliate for Hushh Chocolate.';
        try {
            const supported = await Linking.canOpenURL(whatsappUrl);
            if (supported) {
                await Linking.openURL(whatsappUrl);
            } else {
                Alert.alert(t('menu.errorTitle'), t('menu.errorWhatsAppNotInstalled'));
            }
        } catch (error) {
            Alert.alert(t('menu.errorTitle'), t('menu.errorWhatsAppFailed'));
        }
    };

    const handleWhatsAppBuy = async () => {
        const hushhWebsiteUrl = 'https://hushh.asia/product/hushh/';
        try {
            const supported = await Linking.canOpenURL(hushhWebsiteUrl);
            if (supported) {
                await Linking.openURL(hushhWebsiteUrl);
            } else {
                Alert.alert(t('menu.errorTitle'), t('menu.errorCannotOpenLink'));
            }
        } catch (error) {
            Alert.alert(t('menu.errorTitle'), t('menu.errorOpenLinkFailed'));
        }
    };

    const handleShareFeedback = async () => {
        const hushhWebsiteUrl = 'https://hushh.asia';
        try {
            const supported = await Linking.canOpenURL(hushhWebsiteUrl);
            if (supported) {
                await Linking.openURL(hushhWebsiteUrl);
            } else {
                Alert.alert(t('menu.errorTitle'), t('menu.errorCannotOpenLink'));
            }
        } catch (error) {
            Alert.alert(t('menu.errorTitle'), t('menu.errorOpenLinkFailed'));
        }
    };

    const menuButtons = [
        { title: 'GAME RULES', color: '#5556A3' },
        { title: 'REVIEW APP', color: '#5556A3' },
        { title: 'SHARE YOUR FEEDBACK', color: '#5556A3' },
        { title: 'CONTACT SUPPORT', color: '#5556A3' },
        { title: 'BECOME AN AFFILIATE', color: '#5556A3' },
        { title: 'BUY HUSHH CHOCOLATE', color: '#5556A3' } // Darker purple-blue
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1F2937' : '#F8F9FA' }]}>
             <View style={styles.headerIcon}>
                <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={handleClose}
                    activeOpacity={0.7}
                >
                    <Ionicons 
                        name="close" 
                        size={24} 
                        color='#8994A3' 
                    />
                </TouchableOpacity>
                </View>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>{t('menu.title')}</Text>
            </View>

            {/* Controls Section */}
            <View style={styles.controlsSection}>
                {/* Language Selector */}
                <View style={[styles.languageSelector, { 
                    backgroundColor: isDark ? '#374151' : '#E1E5EB',
                    borderColor: isDark ? '#4B5563' : '#E5E7EB',
                    borderWidth: 1 
                }]}>
                    {(['ENG', 'RUS', 'ID'] as const).map((language) => (
                        <TouchableOpacity
                            key={language}
                            style={[
                                styles.languageOption,
                                selectedLanguage === language && styles.selectedLanguage
                            ]}
                            onPress={() => handleLanguageSelect(language)}
                        >
                            <Text style={[
                                styles.languageText,
                                { color: isDark ? '#9CA3AF' : '#6B7280' },
                                selectedLanguage === language && styles.selectedLanguageText
                            ]}>
                                {language}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Theme Toggle */}
                <View style={[styles.themeToggle, { 
                    backgroundColor: isDark ? '#374151' : '#E1E5EB',
                    borderColor: isDark ? '#4B5563' : '#E5E7EB',
                    borderWidth: 1 
                }]}>
                    <TouchableOpacity
                        style={[
                            styles.themeOption,
                            themeMode === 'light' && styles.selectedTheme
                        ]}
                        onPress={() => handleThemeToggle('light')}
                    >
                        <Image source={IMAGES.IMAGES.sun} style={styles.themeIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.themeOption,
                            themeMode === 'dark' && styles.selectedTheme
                        ]}
                        onPress={() => handleThemeToggle('dark')}
                    >
                        <Image source={IMAGES.IMAGES.moon} style={styles.themeIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Menu Buttons */}
            <View style={styles.menuButtons}>
                <ActionButton
                    title={t('menu.home')}
                    onPress={handleHomeBtn}
                    variant="primary"
                    backgroundImage={IMAGES.IMAGES.buttonBg1}
                    color='#33358F'
                />
                <ActionButton
                    title={t('menu.gameRules')}
                    onPress={handleGameRules}
                    variant="primary"
                    backgroundImage={IMAGES.IMAGES.buttonBg2}
                    color='#33358F'
                />
                <ActionButton
                    title={t('menu.reviewApp')}
                    onPress={handleReviewApp}
                    variant="primary"
                    backgroundImage={IMAGES.IMAGES.buttonBg1}
                    color='#33358F'
                />
                <ActionButton
                    title={t('menu.shareFeedback')}
                    onPress={handleShareFeedback}
                    variant="primary"
                    backgroundImage={IMAGES.IMAGES.buttonBg2}
                    color='#33358F'
                />
                <ActionButton
                    title={t('menu.contactSupport')}
                    onPress={handleWhatsAppContact}
                    variant="secondary"
                    backgroundImage={IMAGES.IMAGES.buttonBg1}
                    color='#33358F'
                />
                <ActionButton
                    title={t('menu.becomeAffiliate')}
                    onPress={handleWhatsAppAffiliate}
                    variant="primary"
                    backgroundImage={IMAGES.IMAGES.buttonBg2}
                    color= '#33358F'
                />
                <ActionButton
                    title={t('menu.buyChocolate')}
                    onPress={handleWhatsAppBuy}
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
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 52,
        position: 'relative',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    controlsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 64,
    },
    languageSelector: {
        flexDirection: 'row',
        borderRadius: 25,
        padding: 4,
    },
    languageOption: {
        width: 80,
        height: 40,
        borderRadius: 25,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedLanguage: {
        backgroundColor: '#FFBC47', // Bright orange
    },
    languageText: {
        fontSize: 16,
        fontWeight: '600',
    },
    selectedLanguageText: {
        color: '#FFFFFF',
    },

    themeToggle: {
        flexDirection: 'row',
        borderRadius: 25,
        backgroundColor: '#E1E5EB',
        padding: 4,
        marginLeft: 10, // Add some space between language selector and theme toggle
    },
    themeOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTheme: {
        backgroundColor: '#2DE069', // Bright orange
    },
    themeIcon: {
        width: 24,
        height: 24,
    },

    menuButtons: {
        flex: 1,
        // gap: 12,
    },
    menuButton: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 16,
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
    menuButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    headerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginTop: 70,
    },
});
