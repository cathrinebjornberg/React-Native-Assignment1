import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { s } from "../style";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={s.container}>
      <Text>Home Screen</Text>
      <Button
        title="Breathing exercise"
        onPress={() => navigation.navigate("BreathingExercise")}
      />
      <Button
        title="meditation music"
        onPress={() => navigation.navigate("MeditationMusic")}
      />
      <Button
        title="Reflection notes"
        onPress={() => navigation.navigate("ReflectionNotes")}
      />
    </View>
  );
}
