import { Audio } from 'expo-av';
import { Platform } from 'react-native';

// Simple global flags
let isCorkPopPlaying = false;
let isChatMessagePlaying = false;
let lastCorkPopTime = 0;

export const useSoundEffects = () => {
  const playCorkPop = async () => {
    const now = Date.now();
    
    // Prevent calls within 2000ms of each other
    if (now - lastCorkPopTime < 2000) {
      console.log('Cork pop called too soon, ignoring');
      return;
    }
    
    // Simple check - if already playing, just return
    if (isCorkPopPlaying) {
      console.log('Cork pop already playing, ignoring');
      return;
    }
    
    isCorkPopPlaying = true;
    lastCorkPopTime = now;
    console.log('Playing cork pop sound');
    
    try {
      console.log('Creating audio sound for wine cork pop...');
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
      
      console.log('Wine cork pop sound created and playing');
      
      // Reset flag when sound finishes
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          console.log('Wine cork pop sound finished');
          isCorkPopPlaying = false;
        }
      });
      
    } catch (error) {
      console.error('Error creating cork pop sound:', error);
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
