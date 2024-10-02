import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "BreathingExercise">;

export default function BreathingExercise({ navigation }: Props) {
  const animation = useRef(new Animated.Value(1)).current;
  const [breathPhase, setBreathPhase] = useState("Andas in");
  const [isRunning, setIsRunning] = useState(false);

  const breathTimes = {
    inhale: 4000,
    holdInhale: 4000,
    exhale: 6000,
    holdExhale: 2000,
  };

  useEffect(() => {
    if (isRunning) {
      const phases = ["Andas in", "Håll andan", "Andas ut", "Håll andan"];
      let cycleIndex = 0;

      const startBreathingCycle = () => {
        setBreathPhase(phases[cycleIndex]);

        switch (cycleIndex) {
          case 0:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            animation.setValue(1);
            animateBall(1, 2, breathTimes.inhale, () => {
              cycleIndex++;
              setBreathPhase("Håll andan");
              setTimeout(() => {
                cycleIndex++;
                startBreathingCycle();
              }, breathTimes.holdInhale);
            });
            break;

          case 1:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setTimeout(() => {
              cycleIndex++;
              setBreathPhase("Andas ut");
              animateBall(2, 1, breathTimes.exhale, () => {
                cycleIndex++;
                startBreathingCycle();
              });
            }, breathTimes.holdInhale);
            break;

          case 2:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            animateBall(2, 1, breathTimes.exhale, () => {
              cycleIndex++;
              setBreathPhase("Håll andan");
              setTimeout(() => {
                startBreathingCycle();
              }, breathTimes.holdExhale);
            });
            break;

          case 3:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setTimeout(() => {
              cycleIndex = 0;
              setBreathPhase("Andas in");
              startBreathingCycle();
            }, breathTimes.holdExhale);
            break;
        }
      };

      startBreathingCycle();
    } else {
      animation.stopAnimation();
    }

    return () => {
      animation.stopAnimation();
    };
  }, [isRunning]);

  const animateBall = (
    fromSize: number,
    toSize: number,
    duration: number,
    callback: () => void
  ) => {
    Animated.timing(animation, {
      toValue: toSize,
      duration: duration,
      useNativeDriver: false,
    }).start(() => {
      if (callback) callback();
    });
  };

  const ballSize = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [100, 200],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.breathText}>{breathPhase}</Text>
      <Animated.View
        style={[styles.ball, { width: ballSize, height: ballSize }]}
      />
      <Button
        title={isRunning ? "Stop" : "Start"}
        onPress={() => setIsRunning(!isRunning)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    backgroundColor: "lightblue",
    borderRadius: 100,
  },
  breathText: {
    fontSize: 24,
    marginBottom: 50,
  },
});
