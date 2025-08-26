// app/(game)/a/index.tsx
import { router } from "expo-router";
import { View } from "react-native";
import  PrimaryButton  from "../../components/PrimaryButton";
import ScreenTitle  from "../../components/ScreenTitle";
export default function GameAIndex() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <ScreenTitle title="Game A" subtitle="Sequential" />
      <PrimaryButton label="Open Board" onPress={() => router.push("/(game)/b/round/board")} />
    </View>
  );
}
