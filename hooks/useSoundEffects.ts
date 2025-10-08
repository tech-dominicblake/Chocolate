import { Audio } from 'expo-av';
import { Platform } from 'react-native';

// Simple global flags
let isCorkPopPlaying = false;
let isChatMessagePlaying = false;

export const useSoundEffects = () => {
  const playCorkPop = async () => {
    // Simple check - if already playing, just return
    if (isCorkPopPlaying) {
      return;
    }
    
    isCorkPopPlaying = true;
    
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/images/audio/wine-cork-pop.mpeg'),
        { 
          shouldPlay: true, 
          isLooping: false,
          volume: 0.8,
          ...(Platform.OS === 'android' && {
            androidImplementation: 'MediaPlayer',
          }),
        }
      );
      
      // Reset flag when sound finishes
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          isCorkPopPlaying = false;
        }
      });
      
    } catch (error) {
      isCorkPopPlaying = false;
    }
  };

  const playChatMessage = async () => {
    // Simple check - if already playing, just return
    if (isChatMessagePlaying) {
      return;
    }
    
    isChatMessagePlaying = true;
    
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/images/audio/chat-message.mpeg'),
        { 
          shouldPlay: true, 
          isLooping: false,
          volume: 0.6,
          ...(Platform.OS === 'android' && {
            androidImplementation: 'MediaPlayer',
          }),
        }
      );
      
      // Reset flag when sound finishes
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          isChatMessagePlaying = false;
        }
      });
      
    } catch (error) {
      isChatMessagePlaying = false;
    }
  };

  return { playCorkPop, playChatMessage };
};
