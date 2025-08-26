import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageContainer from "@/components/prompts/MessageContainer";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function Prompt1() {
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
        <View style={{
            flex: 1,
            backgroundColor: '#EDEFF2',
            height: "100%"
        }}>
            <MessageContainer gameStage={gameStage} />
            <ButtonContainer 
                gameStage={gameStage} 
                onStageChange={handleStageChange}
            />
        </View>
    )
}   