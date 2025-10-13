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
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

export default function MenuPage() {
  const { language, setLanguage } = useSettingsStore();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  // Map i18n codes to menu display
  const langToDisplay = { en: 'ENG', ru: 'RUS', id: 'ID' } as const;
  const displayToLang = { ENG: 'en', RUS: 'ru', ID: 'id' } as const;
  const selectedLanguage = langToDisplay[language];

  // Use global theme context
  const { themeMode, setThemeMode, isDark } = useThemeToggle();

  const handleClose = () => router.back();

  const handleLanguageSelect = async (displayLang: 'ENG' | 'RUS' | 'ID') => {
    const langCode = displayToLang[displayLang];
    await setLanguage(langCode);
  };

  const handleThemeToggle = (mode: 'light' | 'dark') => {
    setThemeMode(mode);
  };

  const handleGameRules = () => router.push('/gameRules');
  const handleReviewApp = () => router.push('/userInfo');
  const handleHomeBtn = () => router.push('/startPage');

  const handleWhatsAppContact = async () => {
    const whatsappUrl = 'https://wa.me/6282342431740';
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) await Linking.openURL(whatsappUrl);
      else Alert.alert(t('menu.errorTitle'), t('menu.errorWhatsAppNotInstalled'));
    } catch (error) {
      Alert.alert(t('menu.errorTitle'), t('menu.errorWhatsAppFailed'));
    }
  };

  const handleWhatsAppAffiliate = async () => {
    const whatsappUrl =
      'https://wa.me/6282342431740?text=Hi! I want to become an affiliate for Hushh Chocolate.';
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) await Linking.openURL(whatsappUrl);
      else Alert.alert(t('menu.errorTitle'), t('menu.errorWhatsAppNotInstalled'));
    } catch (error) {
      Alert.alert(t('menu.errorTitle'), t('menu.errorWhatsAppFailed'));
    }
  };

  const handleWhatsAppBuy = async () => {
    const hushhWebsiteUrl = 'https://hushh.asia/product/hushh/';
    try {
      const supported = await Linking.canOpenURL(hushhWebsiteUrl);
      if (supported) await Linking.openURL(hushhWebsiteUrl);
      else Alert.alert(t('menu.errorTitle'), t('menu.errorCannotOpenLink'));
    } catch (error) {
      Alert.alert(t('menu.errorTitle'), t('menu.errorOpenLinkFailed'));
    }
  };

  const handleShareFeedback = async () => {
    const hushhWebsiteUrl = 'https://hushh.asia';
    try {
      const supported = await Linking.canOpenURL(hushhWebsiteUrl);
      if (supported) await Linking.openURL(hushhWebsiteUrl);
      else Alert.alert(t('menu.errorTitle'), t('menu.errorCannotOpenLink'));
    } catch (error) {
      Alert.alert(t('menu.errorTitle'), t('menu.errorOpenLinkFailed'));
    }
  };

  // === Responsive widths ===
  const totalPadding = 48; // 24 left + 24 right
  const spacingBetween = 12; // space between language selector and theme toggle
  const availableWidth = width - totalPadding - spacingBetween;
  const languageWidth = availableWidth * 0.75;
  const themeWidth = availableWidth * 0.25;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1F2937' : '#F8F9FA' }]}>
      <ScrollView>
        {/* Close Icon */}
        <View style={styles.headerIcon}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose} activeOpacity={0.7}>
            <Ionicons name="close" size={24} color="#8994A3" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            {t('menu.title')}
          </Text>
        </View>

        {/* Controls Section */}
        <View
          style={[
            styles.iosMenu,
            {
              justifyContent: 'space-between',
              width: width - 48, // fits within screen
              alignSelf: 'center',
            },
          ]}
        >
          {/* Language Selector */}
          <View
            style={[
              styles.languageSelector,
              {
                width: languageWidth,
                backgroundColor: isDark ? '#374151' : '#E1E5EB',
                borderColor: isDark ? '#4B5563' : '#E5E7EB',
                borderWidth: 1,
              },
            ]}
          >
            {(['ENG', 'RUS', 'ID'] as const).map((language) => (
              <TouchableOpacity
                key={language}
                style={[
                  styles.languageOption,
                  selectedLanguage === language && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageSelect(language)}
              >
                <Text
                  style={[
                    styles.languageText,
                    { color: isDark ? '#9CA3AF' : '#6B7280' },
                    selectedLanguage === language && styles.selectedLanguageText,
                  ]}
                >
                  {language}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Theme Toggle */}
          <View
            style={[
              styles.themeToggle,
              {
                width: themeWidth,
                backgroundColor: isDark ? '#374151' : '#E1E5EB',
                borderColor: isDark ? '#4B5563' : '#E5E7EB',
                borderWidth: 1,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.themeOption, themeMode === 'light' && styles.selectedTheme]}
              onPress={() => handleThemeToggle('light')}
            >
              <Image source={IMAGES.IMAGES.sun} style={styles.themeIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeOption, themeMode === 'dark' && styles.selectedTheme]}
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
            color="#33358F"
          />
          <ActionButton
            title={t('menu.gameRules')}
            onPress={handleGameRules}
            variant="primary"
            backgroundImage={IMAGES.IMAGES.buttonBg2}
            color="#33358F"
          />
          <ActionButton
            title={t('menu.reviewApp')}
            onPress={handleReviewApp}
            variant="primary"
            backgroundImage={IMAGES.IMAGES.buttonBg1}
            color="#33358F"
          />
          <ActionButton
            title={t('menu.shareFeedback')}
            onPress={handleShareFeedback}
            variant="primary"
            backgroundImage={IMAGES.IMAGES.buttonBg2}
            color="#33358F"
          />
          <ActionButton
            title={t('menu.contactSupport')}
            onPress={handleWhatsAppContact}
            variant="secondary"
            backgroundImage={IMAGES.IMAGES.buttonBg1}
            color="#33358F"
          />
          <ActionButton
            title={t('menu.becomeAffiliate')}
            onPress={handleWhatsAppAffiliate}
            variant="primary"
            backgroundImage={IMAGES.IMAGES.buttonBg2}
            color="#33358F"
          />
          <ActionButton
            title={t('menu.buyChocolate')}
            onPress={handleWhatsAppBuy}
            variant="primary"
            backgroundImage={IMAGES.IMAGES.buttonBg3}
            color="#33358F"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  headerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 52,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iosMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 64,
    alignSelf: 'center',
  },
  languageSelector: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 4,
  },
  languageOption: {
    flex: 1,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedLanguage: {
    backgroundColor: '#FFBC47',
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
    padding: 4,
  },
  themeOption: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTheme: {
    backgroundColor: '#2DE069',
  },
  themeIcon: {
    width: 24,
    height: 24,
  },
  menuButtons: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 68,
  },
});
