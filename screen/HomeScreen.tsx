import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: "Hem",
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/27005953-flor-de-lotus-branca-gratis-foto.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("BreathingExercise")}
        >
          <Text style={styles.cardText}>Andnings övning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("MeditationMusic")}
        >
          <Text style={styles.cardText}>Meditations Musik</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ReflectionNotes")}
        >
          <Text style={styles.cardText}>Självreflektion</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    width: "65%",
    maxWidth: 300,
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A4A",
    textAlign: "center",
  },
});
