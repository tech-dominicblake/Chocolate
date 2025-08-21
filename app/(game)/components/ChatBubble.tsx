import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';

interface ChatBubbleProps {
  message: string;
  type?: 'sent' | 'received';
}

function ChatBubble({ message, type = 'received' }: ChatBubbleProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        alignSelf: type === 'sent' ? 'flex-end' : 'flex-start',
        backgroundColor: type === 'sent' ? colors.primary : colors.card,
        padding: 12,
        borderRadius: 16,
        maxWidth: '80%',
        marginVertical: 4,
      }}
    >
      <Text
        style={{
          color: type === 'sent' ? 'white' : colors.text,
          fontSize: 16,
        }}
      >
        {message}
      </Text>
    </View>
  );
}
export default ChatBubble;