import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

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
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }

        if (shouldPlay && musicFile) {
          // Configure audio mode
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });

          // Load the sound
          const { sound } = await Audio.Sound.createAsync(
            musicFile,
            { 
              shouldPlay: true, 
              isLooping: loop,
              volume: volume 
            }
          );
          
          if (isMounted) {
            soundRef.current = sound;
          }
        } else if (!shouldPlay) {
          // If shouldPlay is false, ensure no music is playing
          if (soundRef.current) {
            try {
              await (soundRef.current as Audio.Sound).stopAsync();
              await (soundRef.current as Audio.Sound).unloadAsync();
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
            const sound = soundRef.current;
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
            const sound = soundRef.current;
            await sound.stopAsync();
            await sound.unloadAsync();
          } catch (error) {
            console.error('Error unloading background music:', error);
          }
          soundRef.current = null;
        }
      };
      cleanup();
    };
  }, [shouldPlay, musicFile, volume, loop]);

  // Function to manually stop music
  const stopMusic = async () => {
    if (soundRef.current) {
      try {
        const sound = soundRef.current;
        await sound.stopAsync();
        await sound.unloadAsync();
        soundRef.current = null;
      } catch (error) {
        console.error('Error stopping background music:', error);
      }
    }
  };

  return { stopMusic };
};
