// app/(game)/b/round/board.tsx
import { Text, View } from "react-native";
import ChocolateGrid from "../../components/ChocolateGrid";
export default function BoardB() {
  return (
    <View style={{ padding: 16 }}>
      <Text>Board: 1 → 13</Text>
      <Text>No skipping. One bite at a time.</Text>
      <ChocolateGrid mode="A" consumedChocolates={[]} onSelectChocolate={() => {}} />
    </View>
  );
}
