import { Audio } from 'expo-av';
import { Platform } from 'react-native';

// Simple global flag
let isPlaying = false;

export const useSoundEffects = () => {
  const playCorkPop = async () => {
    // Simple check - if already playing, just return
    if (isPlaying) {
      return;
    }
    
    isPlaying = true;
    
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
          isPlaying = false;
        }
      });
      
    } catch (error) {
      isPlaying = false;
    }
  };

  return { playCorkPop };
};
