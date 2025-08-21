// components/ScreenTitle.tsx
import { Text, View } from "react-native";
function ScreenTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title}</Text>
      {subtitle && <Text style={{ fontSize: 16 }}>{subtitle}</Text>}
    </View>
  );
}
export default ScreenTitle;