import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Animated, Button, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../App";

function useToggle(initialValue: boolean) {
  const [state, setState] = useState(initialValue);

  const toggle = () => {
    setState((state) => !state);
  };
  return { state, toggle, setState };
}
type Props = NativeStackScreenProps<RootStackParamList, "MeditationMusic">;

export default function MeditationMusic() {
  const [sound, setSound] = useState<Audio.Sound>();
  const { state: isPlaying, setState: setIsPlaying, toggle } = useToggle(false);

  const [scaleValue] = useState(new Animated.Value(1));

  async function playSound() {
    if (sound && isPlaying) {
      await sound.stopAsync();
      setIsPlaying(false);
      stopAnimation();
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sound/relaxing-meditation-231762.mp3")
      );
      setSound(sound);
      setIsPlaying(true);
      startAnimation();
      await sound.playAsync();
    }
  }

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 4,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  const stopAnimation = () => {
    scaleValue.setValue(1);
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View
        style={[
          styles.animatedBackground,
          { transform: [{ scale: scaleValue }] },
        ]}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[
            "#FFB3BA",
            "#FFDFBA",
            "#FFFFBA",
            "#BAFFC9",
            "#BAE1FF",
            "#DABFFF",
          ]}
          style={styles.background}
        />
      </Animated.View>
      <Button title={isPlaying ? "Stop" : "Play"} onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  animatedBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

//https://pixabay.com/sv/music/meditation-andlig-relaxing-meditation-231762/

//https://freemusicarchive.org/music/kirk-osamayo/season-two-yellow/meditation-on-love/
