// components/PrimaryButton.tsx
import { Pressable, Text } from "react-native";
export function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{ padding: 14, borderRadius: 12, backgroundColor: "#6B5BFF", alignItems: "center" }}
    >
      <Text style={{ color: "white", fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}
