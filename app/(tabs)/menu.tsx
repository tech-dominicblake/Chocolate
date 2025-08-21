import { useTheme } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const menuItems = [
  { title: 'Game Rules', action: () => console.log('Rules') },
  { title: 'Review App', action: () => console.log('Review') },
  { title: 'Share Your Feedback', action: () => console.log('Feedback') },
  { title: 'Contact Support', action: () => console.log('Support') },
  { title: 'Become an Affiliate', action: () => console.log('Affiliate') },
  { title: 'Buy HUSHH Chocolate', action: () => console.log('Buy') },
];

export default function MenuScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: colors.text, fontSize: 24, marginBottom: 20 }}>
          Menu
        </Text>
        
        <View style={{ gap: 10 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.action}
              style={{
                backgroundColor: colors.card,
                padding: 15,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.text, fontSize: 16 }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}