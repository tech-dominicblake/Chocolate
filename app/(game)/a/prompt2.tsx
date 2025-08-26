import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageContainer from "@/components/prompts/MessageContainer";
import { useThemeToggle } from "@/hooks/useAppTheme";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function Prompt2() {
    const params = useLocalSearchParams();
    const [gameStage, setGameStage] = useState(1);
    const [currentLevel] = useState(Number(params.level) || 1);
    const [playerChoice, setPlayerChoice] = useState<string | undefined>();
    const { isDark } = useThemeToggle();

    const handleStageChange = (newStage: number) => {
        setGameStage(newStage);
    };

    const handlePlayerChoice = (choice: string) => {
        setPlayerChoice(choice);
    };

    // Reset game stage and player choice when level changes
    useEffect(() => {
        setGameStage(1);
        setPlayerChoice(undefined);
    }, [currentLevel]);

    return (
        <View style={{
            flex: 1,
            backgroundColor: isDark ? '#27282A' : '#EDEFF2', // Dark theme: #27282A, Light theme: original #EDEFF2
            height: "100%"
        }}>
            <MessageContainer 
                userType="him"
                gameStage={gameStage} 
                playerChoice={playerChoice}
                isDark={isDark}
            />
            <ButtonContainer 
                gameStage={gameStage} 
                onStageChange={handleStageChange}
                onPlayerChoice={handlePlayerChoice}
                userType="him"
                isDark={isDark}
            />
        </View>
    )
}
