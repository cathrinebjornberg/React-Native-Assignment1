import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
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

  async function playSound() {
    if (sound && isPlaying) {
      await sound.stopAsync();
      setIsPlaying(false);
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sound/relaxing-meditation-231762.mp3")
      );
      setSound(sound);
      setIsPlaying(true);
      await sound.playAsync();
    }
  }

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
      <Text>Meditation Music</Text>
      <Button title={isPlaying ? "Stop" : "Play"} onPress={playSound} />
    </View>
  );
}

//https://pixabay.com/sv/music/meditation-andlig-relaxing-meditation-231762/

//https://freemusicarchive.org/music/kirk-osamayo/season-two-yellow/meditation-on-love/
