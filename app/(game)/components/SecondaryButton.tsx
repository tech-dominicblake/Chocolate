// components/SecondaryButton.tsx
import { Pressable, Text } from "react-native";
function SecondaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{ padding: 14, borderRadius: 12, backgroundColor: "#eee", alignItems: "center" }}
    >
      <Text style={{ fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}
export default SecondaryButton;
