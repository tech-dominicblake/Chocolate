import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageContainer from "@/components/prompts/MessageContainer";
import { useAppThemeColor } from "@/hooks/useAppTheme";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function PromptB() {
    const params = useLocalSearchParams();
    const [gameStage, setGameStage] = useState(1);
    const [currentLevel] = useState(Number(params.level) || 1);

    const handleStageChange = (newStage: number) => {
        setGameStage(newStage);
    };

    // Reset game stage when level changes
    useEffect(() => {
        setGameStage(1);
    }, [currentLevel]);

    return (
        <View style={[{
            flex: 1,
            backgroundColor: '#EDEFF2',
            height: "100%"
        }, {backgroundColor: useAppThemeColor('background')}]}>
            <MessageContainer gameStage={gameStage} />
            <ButtonContainer 
                userType="him"
                gameStage={gameStage} 
                onStageChange={handleStageChange}
            />
        </View>
    )
}   