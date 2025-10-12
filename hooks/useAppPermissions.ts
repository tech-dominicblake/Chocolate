import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as TrackingTransparency from 'expo-tracking-transparency';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const PERMISSIONS_STORAGE_KEY = '@app_permissions';

interface PermissionStatus {
  trackingPermission: 'granted' | 'denied' | 'not-determined' | null;
  notificationPermission: 'granted' | 'denied' | 'not-determined' | null;
  hasAskedForPermissions: boolean;
}

export const useAppPermissions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [permissionsRequested, setPermissionsRequested] = useState(false);

  useEffect(() => {
    checkPermissionsStatus();
  }, []);

  const checkPermissionsStatus = async () => {
    try {
      const storedPermissions = await AsyncStorage.getItem(PERMISSIONS_STORAGE_KEY);
      if (storedPermissions) {
        const permissions: PermissionStatus = JSON.parse(storedPermissions);
        setPermissionsRequested(permissions.hasAskedForPermissions);
      }
    } catch (error) {
      console.error('Error checking permissions status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePermissionStatus = async (status: PermissionStatus) => {
    try {
      await AsyncStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(status));
    } catch (error) {
      console.error('Error saving permission status:', error);
    }
  };

  const requestAppTrackingPermission = async (): Promise<'granted' | 'denied' | 'not-determined'> => {
    if (Platform.OS !== 'ios') {
      return 'not-determined';
    }

    try {
      const { status } = await TrackingTransparency.requestTrackingPermissionsAsync();
      
      if (status === 'granted') {
        console.log('📍 App Tracking Permission: Granted');
        return 'granted';
      } else if (status === 'denied') {
        console.log('🚫 App Tracking Permission: Denied');
        return 'denied';
      }
      
      return 'not-determined';
    } catch (error) {
      console.error('Error requesting tracking permission:', error);
      return 'denied';
    }
  };

  const requestNotificationPermission = async (): Promise<'granted' | 'denied' | 'not-determined'> => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      
      let finalStatus = existingStatus;
      
      // Only ask if not already determined
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
          },
        });
        finalStatus = status;
      }
      
      if (finalStatus === 'granted') {
        console.log('🔔 Notification Permission: Granted');
        
        // Configure notification behavior
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
        
        return 'granted';
      } else {
        console.log('🔕 Notification Permission: Denied');
        return 'denied';
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  };

  const requestAllPermissions = async () => {
    if (permissionsRequested) {
      console.log('✅ Permissions already requested, skipping...');
      return;
    }

    setIsLoading(true);

    try {
      let trackingStatus: 'granted' | 'denied' | 'not-determined' | null = null;
      let notificationStatus: 'granted' | 'denied' | 'not-determined' | null = null;

      // iOS: Request ATT (App Tracking Transparency) first
      if (Platform.OS === 'ios') {
        console.log('📱 iOS detected - requesting ATT permission first...');
        trackingStatus = await requestAppTrackingPermission();
        
        // Small delay to ensure ATT prompt is fully dismissed
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Request notification permission (both iOS and Android 13+)
      console.log('🔔 Requesting notification permission...');
      notificationStatus = await requestNotificationPermission();

      // Save permission status
      const permissionStatus: PermissionStatus = {
        trackingPermission: trackingStatus,
        notificationPermission: notificationStatus,
        hasAskedForPermissions: true,
      };

      await savePermissionStatus(permissionStatus);
      setPermissionsRequested(true);

      console.log('✅ All permissions requested and saved');
    } catch (error) {
      console.error('Error requesting permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPermissions = async () => {
    try {
      await AsyncStorage.removeItem(PERMISSIONS_STORAGE_KEY);
      setPermissionsRequested(false);
      console.log('🔄 Permissions reset successfully');
    } catch (error) {
      console.error('Error resetting permissions:', error);
    }
  };

  return {
    isLoading,
    permissionsRequested,
    requestAllPermissions,
    resetPermissions,
  };
};

