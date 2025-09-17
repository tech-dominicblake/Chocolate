import { Stack } from 'expo-router';
import { useThemeToggle } from '../../../hooks/useAppTheme';

// Simplified layout component - header is now handled in individual pages
export default function GameLayout() {
    const { isDark } = useThemeToggle();

    return (
        <Stack
            screenOptions={{
                headerShown: false, // Header is now handled in individual pages
                contentStyle: { backgroundColor: isDark ? '#27282A' : '#151718' },
            }}
        >
            <Stack.Screen name="promptA" options={{
                headerShown: false,
            }} />
        </Stack>
    );
}
