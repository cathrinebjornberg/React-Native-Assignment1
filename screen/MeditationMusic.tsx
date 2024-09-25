import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "MeditationMusic">;

export default function MeditationMusic() {
  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sound/relaxing-meditation-231762.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Meditation Music</Text>
      <Button title="Play" onPress={playSound} />
    </View>
  );
}

//https://pixabay.com/sv/music/meditation-andlig-relaxing-meditation-231762/

//https://freemusicarchive.org/music/kirk-osamayo/season-two-yellow/meditation-on-love/
