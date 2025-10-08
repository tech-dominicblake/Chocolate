import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

interface UseBackgroundMusicProps {
  musicFile: any; // Will be the require() path to the music file
  shouldPlay: boolean;
  volume?: number;
  loop?: boolean;
}

export const useBackgroundMusic = ({ 
  musicFile, 
  shouldPlay, 
  volume = 2, 
  loop = true 
}: UseBackgroundMusicProps) => {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAndPlayMusic = async () => {
      try {
        // Unload previous sound if exists
        if (soundRef.current) {
          try {
            await soundRef.current.unloadAsync();
          } catch (error) {
            console.warn('Error unloading previous sound:', error);
          }
          soundRef.current = null;
        }

        if (shouldPlay && musicFile) {
          // Configure audio mode with proper Android settings
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
            ...(Platform.OS === 'android' && {
              // Android-specific settings to prevent threading issues
              androidAudioFocus: 'gain' as any,
            }),
          });

          // Load the sound with proper error handling
          const { sound } = await Audio.Sound.createAsync(
            musicFile,
            { 
              shouldPlay: true, 
              isLooping: loop,
              volume: volume,
              // Android-specific settings
              ...(Platform.OS === 'android' && {
                androidImplementation: 'MediaPlayer',
              }),
            }
          );
          
          if (isMounted) {
            soundRef.current = sound;
          }
        } else if (!shouldPlay) {
          // If shouldPlay is false, ensure no music is playing
          if (soundRef.current) {
            try {
              const sound = soundRef.current as Audio.Sound;
              await sound.stopAsync();
              await sound.unloadAsync();
              soundRef.current = null;
            } catch (error) {
              console.error('Error stopping music:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error loading background music:', error);
      }
    };

    // Only load music if shouldPlay is true AND musicFile exists
    if (shouldPlay && musicFile) {
      loadAndPlayMusic();
    } else {
      // If shouldPlay is false, stop any existing music
      const stopMusic = async () => {
        if (soundRef.current) {
          try {
            const sound = soundRef.current as Audio.Sound;
            await sound.stopAsync();
            await sound.unloadAsync();
            soundRef.current = null;
          } catch (error) {
            console.error('Error stopping background music:', error);
          }
        }
      };
      stopMusic();
    }

    return () => {
      isMounted = false;
      // Cleanup function - always stop music when component unmounts
      const cleanup = async () => {
        if (soundRef.current) {
          try {
            const sound = soundRef.current as Audio.Sound;
            await sound.stopAsync();
            await sound.unloadAsync();
          } catch (error) {
            console.warn('Error unloading background music during cleanup:', error);
          }
          soundRef.current = null;
        }
      };
      // Use setTimeout to ensure cleanup happens on the main thread
      setTimeout(cleanup, 0);
    };
  }, [shouldPlay, musicFile, volume, loop]);

  // Function to manually stop music
  const stopMusic = async () => {
    if (soundRef.current) {
      try {
        const sound = soundRef.current as Audio.Sound;
        await sound.stopAsync();
        await sound.unloadAsync();
        soundRef.current = null;
      } catch (error) {
        console.warn('Error stopping background music:', error);
        // Force cleanup even if there's an error
        soundRef.current = null;
      }
    }
  };

  return { stopMusic };
};
