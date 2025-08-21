import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageContainer from "@/components/prompts/MessageContainer";
import { View } from "react-native";

export default function Prompt1() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#EDEFF2',
            height: "100%"
        }}>
            <MessageContainer />
            <ButtonContainer />

        </View>
    )
}   