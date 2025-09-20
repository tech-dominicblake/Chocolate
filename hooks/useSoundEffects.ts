import { Audio } from 'expo-av';
import { useRef } from 'react';

export const useSoundEffects = () => {
  const soundRef = useRef<Audio.Sound | null>(null);

  const playCorkPop = async () => {
    try {
      // Unload previous sound if exists
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Create a wine cork pop sound effect using the existing background music file
      // This will play a short burst of the background music as a "pop" sound
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/images/audio/background-music.mpeg'),
        { 
          shouldPlay: true, 
          isLooping: false,
          volume: 0.3, // Lower volume for the pop effect
          positionMillis: 0 // Start from beginning
        }
      );
      
      soundRef.current = sound;
      
      // Stop the sound after 500ms to create a short pop effect
      setTimeout(async () => {
        if (soundRef.current) {
          await soundRef.current.stopAsync();
        }
      }, 500);
      
      // Clean up after sound finishes playing
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
      
    } catch (error) {
      console.error('Error playing cork pop sound:', error);
    }
  };

  return { playCorkPop };
};
