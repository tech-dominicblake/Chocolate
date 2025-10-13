import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

export const useHeartbeatSound = () => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const isLoadingRef = useRef<boolean>(false);

  // Helper function to check if sound object is valid
  const isValidSound = (sound: Audio.Sound | null): sound is Audio.Sound => {
    return sound !== null && typeof sound === 'object';
  };

  const startHeartbeat = async () => {
    try {
      // If already playing or currently loading, don't start again
      if (soundRef.current || isLoadingRef.current) {
        return;
      }

      isLoadingRef.current = true;

      // Configure audio mode cross-platform
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
        ...(Platform.OS === 'android' && {
          androidAudioFocus: 'gain' as any,
        }),
      });

      // Load and play the heartbeat sound
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/images/audio/heart-beat.mp3'),
        { 
          shouldPlay: true, 
          isLooping: true,
          volume: 1, // Moderate volume for heartbeat
          // Android-specific settings
          ...(Platform.OS === 'android' && {
            androidImplementation: 'MediaPlayer',
          }),
        }
      );
      
       soundRef.current = sound;
       
     } catch (error) {
       console.error('Error starting heartbeat sound:', error);
     } finally {
       isLoadingRef.current = false;
     }
   };

  const stopHeartbeat = async () => {
    try {
      // Reset loading state
      isLoadingRef.current = false;
      
      if (isValidSound(soundRef.current)) {
        try {
          // Try to get status first
          const status = await soundRef.current.getStatusAsync();
          if (status.isLoaded) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
          }
        } catch (statusError) {
          // If status check fails, try direct stop/unload
          try {
            await soundRef.current.stopAsync();
          } catch (stopError) {
            // Ignore stop errors - sound might already be stopped
          }
          try {
            await soundRef.current.unloadAsync();
          } catch (unloadError) {
            // Ignore unload errors - sound might already be unloaded
          }
        }
        soundRef.current = null;
      }
    } catch (error) {
      console.error('Error stopping heartbeat sound:', error);
      // Force cleanup even if there's an error
      soundRef.current = null;
      isLoadingRef.current = false;
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      const cleanup = async () => {
        if (isValidSound(soundRef.current)) {
          try {
            try {
              // Try to get status first
              const status = await soundRef.current.getStatusAsync();
              if (status.isLoaded) {
                await soundRef.current.stopAsync();
                await soundRef.current.unloadAsync();
              }
            } catch (statusError) {
              // If status check fails, try direct stop/unload
              try {
                await soundRef.current.stopAsync();
              } catch (stopError) {
                // Ignore stop errors - sound might already be stopped
              }
              try {
                await soundRef.current.unloadAsync();
              } catch (unloadError) {
                // Ignore unload errors - sound might already be unloaded
              }
            }
          } catch (error) {
            console.warn('Error cleaning up heartbeat sound:', error);
          }
          soundRef.current = null;
          isLoadingRef.current = false;
        }
      };
      // Use setTimeout to ensure cleanup happens on the main thread
      setTimeout(cleanup, 0);
    };
  }, []);

  return { startHeartbeat, stopHeartbeat };
};
