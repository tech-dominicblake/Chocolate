import { IMAGES } from '@/constants';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionButton from '../../components/prompts/ActionButton';
import { CustomInput } from '../../components/ui/CustomInput';
import { useAppThemeColor, useThemeToggle } from '../../hooks/useAppTheme';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const background = useAppThemeColor('background');
  const textColor = useAppThemeColor('text');
  const inputBackground = useAppThemeColor('inputBackground');
  const inputBorder = useAppThemeColor('inputBorder');
  const inputText = useAppThemeColor('inputText');
  const placeholderText = useAppThemeColor('placeholderText');
  const { isDark } = useThemeToggle();

  const handleSendMessage = () => {
    // Handle send message logic
    console.log('Send message:', { name, email, message });
    router.push('/(game)/play');
  };

  const handleWhatsApp = () => {
    // Handle WhatsApp contact
    console.log('WhatsApp contact');
  };

  const handleTelegram = () => {
    // Handle Telegram contact
    console.log('Telegram contact');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Contact Us Title */}
          <Text style={[styles.title, { color: textColor }]}>Contact Us</Text>

          {/* Contact Form Section */}
          <View style={styles.formContainer}>
            {/* Name Input */}
            <CustomInput
              value={name}
              onChangeText={setName}
              placeholder="Name"
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
            />

            {/* Email Input */}
            <CustomInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Message Input - 128px height */}
            <View style={[styles.messageContainer, { 
              backgroundColor: isDark ? '#33373D' : '#E6E8EB', // Dark theme: #33373D, Light theme: original #E6E8EB
              borderColor: inputBorder 
            }]}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Message"
                placeholderTextColor={isDark ? placeholderText : '#808080'} // Dark theme: theme-aware, Light theme: original #808080
                style={[styles.messageInput, { 
                  color: isDark ? inputText : '#191919', // Dark theme: theme-aware, Light theme: original #191919
                  backgroundColor: isDark ? '#33373D' : '#E6E8EB' // Dark theme: #33373D, Light theme: original #E6E8EB
                }]}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                autoCapitalize="sentences"
                autoCorrect={false}
              />
            </View>

            {/* Send Message Button */}
            <ActionButton
              title="SEND MESSAGE"
              onPress={handleSendMessage}
              variant="primary"
              backgroundImage={IMAGES.IMAGES.buttonBg3}
              color='#33358F'
            />
          </View>

          {/* Other Ways to Reach Us Section */}
          <View style={styles.alternativeContact}>
            <Text style={[styles.alternativeTitle, { color: textColor }]}>
              Other ways to reach us
            </Text>
            
            {/* Social Media Icons */}
            <View style={styles.socialIcons}>
              {/* WhatsApp Icon */}
              <TouchableOpacity 
                style={styles.whatsappIcon} 
                onPress={handleWhatsApp}
                activeOpacity={0.8}
              >
                <Image source={IMAGES.IMAGES.image8} style={styles.iconImage} />
              </TouchableOpacity>
              
              {/* Telegram Icon */}
              <TouchableOpacity 
                style={styles.telegramIcon} 
                onPress={handleTelegram}
                activeOpacity={0.8}
              >
                <Image source={IMAGES.IMAGES.image4} style={styles.iconImage} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 143,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Inter',
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  formContainer: {
    gap: 8,
  },
  messageContainer: {
    height: 128, // Exact height from design: 128px
    borderRadius: 10, // Match CustomInput border radius
    borderWidth: 1,
    marginBottom: 30,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter',
    backgroundColor: '#E6E8EB', // Restored original light theme background
    borderColor: '#CAD3E0',
    borderRadius: 10,
  },
  alternativeContact: {
    alignItems: 'center',
    marginTop: 64,
  },
  alternativeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#191919',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  whatsappIcon: {
    borderRadius: 25,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  telegramIcon: {
    borderRadius: 25,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 80,
    height: 80,
  },
});