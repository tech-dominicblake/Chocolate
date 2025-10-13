import CongratsPage from "@/app/congrats";
import CongratsChocoPage from "@/app/congratsChoco";
import GameAHeader from "@/components/game/GameHeader";
import ButtonContainer from "@/components/prompts/ButtonContainer";
import MessageItem from "@/components/prompts/MessageItem";
import { getPrompt } from "@/constants/Functions";
import { categoryTypes } from "@/constants/Prompts";
import { Message, ProcessingState } from "@/constants/Types";
import { useThemeToggle } from "@/hooks/useAppTheme";
import { useHeartbeatSound } from "@/hooks/useHeartbeatSound";
import { useGameStore, useMessages } from "@/state/useGameStore";
import { supabase } from "@/utils/supabase";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function Prompt() {
  const [gameStage, setGameStage] = useState(1);
  const [playerChoice, setPlayerChoice] = useState<string | undefined>();
  const [showSuccessDelay, setShowSuccessDelay] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsType, setCongratsType] = useState<'normal' | 'choco'>('normal');
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { isDark } = useThemeToggle();
  const { startHeartbeat, stopHeartbeat } = useHeartbeatSound();
  const scrollViewRef = useRef<ScrollView>(null);
  const hasFailedOnce = useGameStore.getState().hasFailedOnce;
  const showBtns = useGameStore.getState().showBtns;

  const {
    currentTurn,
    round,
    level,
    failsSuffered,
    language,
    mode,
    setTaskCompleted,
    setRoundLevel,
    enqueueGameInfoMessages,
    getMockMessageByKind,
    setHasFailedOnce,
    consumeChocolate,
    setConsumedChocolatesEachCount,
    setSheFailedTwice,
    setCurrentTurn,
    setActiveTooltip,
    setDidFinal,
    setHimTimePerLevel,
    setHerTimePerLevel,
  } = useGameStore();

  const { queue, enqueue, clear, isProcessing } = useMessages();

  // Heartbeat sound logic
  useEffect(() => {
    if (!isProcessing && queue.length > 0) {
      const lastMessage = queue[queue.length - 1];
      if (lastMessage.kind === 'prompt') {
        startHeartbeat();
      } else {
        stopHeartbeat();
      }
    } else if (isProcessing) {
      stopHeartbeat();
    }
  }, [queue, isProcessing, startHeartbeat, stopHeartbeat]);

  useEffect(() => {
    const initializeGame = async () => {
      setDidFinal(false);
      setButtonLoading(true);
      enqueueGameInfoMessages();
      setActiveTooltip(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
      setActiveTooltip(false);
      setButtonLoading(false);
    };
    initializeGame();
  }, []);

  // Timer functionality
  useEffect(() => {
    const start = Date.now();
    setStartTime(start);

    return () => {
      if (startTime) {
        const end = Date.now();
        const timeSpent = end - start;
        setElapsedTime(timeSpent);
        if (currentTurn === 'him') {
          setHimTimePerLevel(level, timeSpent);
        } else if (currentTurn === 'her') {
          setHerTimePerLevel(level, timeSpent);
        }
      }
    };
  }, [currentTurn, level]);

  useEffect(() => {
    const handleRoundChange = async () => {
      setButtonLoading(true);
      setActiveTooltip(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
      setActiveTooltip(false);
      setButtonLoading(false);
    };
    handleRoundChange();
    round === 3 && setDidFinal(true);
  }, [round]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (queue.length > 0 && shouldAutoScroll) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [queue, shouldAutoScroll]);

  // Handle scroll events to determine if auto-scroll should be enabled
  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
    setShouldAutoScroll(isAtBottom);
  };

  const handlePlayerChoice = async (choice: string, buttonType: 'success' | 'fail') => {
    setButtonLoading(true);
    if (buttonType === 'success') {
      await enqueue({
        kind: 'userchoice' as const,
        body: choice,
        group: 'user_action' as const,
        meta: { buttonType },
        durationMs: 2000,
      });

      const { data: prompt } = await supabase
        .from('content_items')
        .select('*')
        .eq('category', `${categoryTypes.taskComplete}`);

      if (prompt && prompt.length > 0) {
        const randomIndex = Math.floor(Math.random() * prompt.length);
        const messages = getPrompt(prompt[randomIndex], 'success');
        for (const message of messages) {
          const sentences = message.body.split('#end').filter(sentence => sentence.trim());
          for (const sentence of sentences) {
            await enqueue({
              kind: 'success' as const,
              body: sentence.trim(),
              group: 'game_result' as const,
              durationMs: 2000,
            });
          }
        }
      }
    }

    if (buttonType === 'fail') {
      if (!hasFailedOnce) {
        setHasFailedOnce(true);
        await enqueue({
          kind: 'userchoice' as const,
          body: 'Nah, I bail.',
          group: 'game_result' as const,
          durationMs: 2000,
        });
        await enqueue({
          ...getMockMessageByKind('dare'),
          group: 'game_result' as const,
          durationMs: 2000,
        });

        const lan = language === 'english'
          ? 'English'
          : language === 'russian'
            ? 'Russian'
            : 'Indonesian';

        const { data: dareData } = await supabase
          .from('content_items')
          .select('id, content, subContent_1, subContent_2, subContent_3, subContent_4, subContent_5, content_1_time, content_2_time, content_3_time, content_4_time, content_5_time, challenges!inner ( id, name )')
          .ilike('category', `%${categoryTypes.fail}%`)
          .eq('metadata->>lang', lan);

        if (dareData && dareData.length > 0) {
          const randomIndex = Math.floor(Math.random() * dareData.length);
          const messages = getPrompt(dareData[randomIndex], 'dare');
          if (messages) {
            for (const message of messages) {
              const sentences = message.body.split('#end').filter(sentence => sentence.trim());
              for (const sentence of sentences) {
                await enqueue({
                  ...message,
                  body: sentence.trim(),
                  durationMs: 2000,
                } as Message);
              }
            }
          }
        }
      } else {
        await enqueue({
          kind: 'userchoice' as const,
          body: "I can't hang.",
          group: 'game_result' as const,
          durationMs: 2000,
        });

        const { data: failData } = await supabase
          .from('content_items')
          .select('id, content, subContent_1, subContent_2, subContent_3, subContent_4, subContent_5, content_1_time, content_2_time, content_3_time, content_4_time, content_5_time, challenges!inner ( id, name )')
          .ilike('category', `%${categoryTypes.postFail}%`);

        if (failData && failData.length > 0) {
          const randomIndex = Math.floor(Math.random() * failData.length);
          const messages = getPrompt(failData[randomIndex], 'fail');
          for (const message of messages) {
            await enqueue(message as Message);
          }
        } else {
          console.log('No fail message found');
        }

        if (currentTurn === 'her') setSheFailedTwice(true);
        setRoundLevel(level);
        const newLevel = level + 1;
        setCurrentTurn(newLevel);
        enqueueGameInfoMessages();
        setHasFailedOnce(false);
      }
    }

    setButtonLoading(false);
  };

  const handleContinue = (gameState: ProcessingState) => {
    setButtonLoading(true);
    if (startTime) {
      const end = Date.now();
      const timeSpent = end - startTime;
      if (currentTurn === 'him') setHimTimePerLevel(level, timeSpent);
      else if (currentTurn === 'her') setHerTimePerLevel(level, timeSpent);
    }

    if (round === 3) {
      router.push('/(game)/a/statsA');
      setButtonLoading(false);
      return;
    }

    if (gameState.gameSucceeded) {
      const randomType = Math.random() < 0.5 ? 'normal' : 'choco';
      setCongratsType(randomType);
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
        setTaskCompleted(currentTurn);
        setRoundLevel(level);
        setCurrentTurn(level + 1);
        setConsumedChocolatesEachCount();
        enqueueGameInfoMessages();
      }, 2000);
    } else if (gameState.gameSurvived) {
      setTaskCompleted(currentTurn);
      setRoundLevel(level);
      setCurrentTurn(level + 1);
      setConsumedChocolatesEachCount();
      setHasFailedOnce(false);
      enqueueGameInfoMessages();
    }

    consumeChocolate(currentTurn === 'her' ? Math.ceil(level / 2) : Math.ceil(level / 2) + 6, round);
    if (gameState.gameFailed) {
      setRoundLevel(level);
      setCurrentTurn(level + 1);
      enqueueGameInfoMessages();
    }
    setButtonLoading(false);
  };

  const renderMessages = () => {
    return queue.map((message, index) => {
      if (message.kind === 'separator') {
        return <MessageItem key={index} text={message.body} isDark={isDark} kind="separator" />;
      }
      if (message.kind === 'prompt' && message.title) {
        return (
          <View key={index} style={styles.promptContainer}>
            <MessageItem text={message.title} isDark={isDark} textStyle="large" kind="prompt" isBody={false} />
            <MessageItem text={message.body} isDark={isDark} textStyle="large" kind="prompt" isBody={true} />
          </View>
        );
      }
      if (message.kind === 'userchoice') {
        return (
          <View key={index} style={styles.userChoiceContainer}>
            <MessageItem text={message.body} isDark={isDark} kind={message.kind} />
          </View>
        );
      }
      return (
        <View key={index} style={styles.regularMessageContainer}>
          <MessageItem text={message.body} isDark={isDark} kind={message.kind} />
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#27282A' : '#151718' }}>
      <GameAHeader onIconClick={stopHeartbeat} />
      <View style={{ flex: 1, backgroundColor: isDark ? '#27282A' : '#EDEFF2', height: "100%" }}>
        <View style={styles.scrollContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={[styles.container, showBtns ? { paddingBottom: 80 } : {}]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {renderMessages()}
          </ScrollView>

          {/* ✅ Fixed fading overlay */}
          <LinearGradient
            colors={
              isDark
                ? ['rgba(39,40,42,1)', 'rgba(39,40,42,0.4)', 'rgba(39,40,42,0)']
                : ['rgba(237,239,242,1)', 'rgba(237,239,242,0.4)', 'rgba(237,239,242,0)']
            }
            locations={[0, 0.3, 1]}
            style={styles.fadeOverlay}
            pointerEvents="none"
          />
        </View>

        {showBtns && (
          <ButtonContainer
            onPlayerChoice={handlePlayerChoice}
            onContinue={handleContinue}
            isGamePaused={isGamePaused}
            loading={buttonLoading}
            onButtonClick={stopHeartbeat}
          />
        )}
      </View>

      {showCongrats && (
        <View style={styles.congratsOverlay}>
          {congratsType === 'normal' ? <CongratsPage /> : <CongratsChocoPage />}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  fadeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  promptContainer: {
    marginBottom: 10,
  },
  userChoiceContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  regularMessageContainer: {
    marginBottom: 10,
  },
  congratsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
});
