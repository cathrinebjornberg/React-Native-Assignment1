import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BreathingExercise from "./screen/BreathingExercise";
import HomeScreen from "./screen/HomeScreen";
import MeditationMusic from "./screen/MeditationMusic";
import ReflectionNotes from "./screen/ReflectionNotes";

export type RootStackParamList = {
  Home: undefined;
  MeditationMusic: undefined;
  ReflectionNotes: undefined;
  BreathingExercise: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MeditationMusic" component={MeditationMusic} />
        <Stack.Screen name="ReflectionNotes" component={ReflectionNotes} />
        <Stack.Screen name="BreathingExercise" component={BreathingExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

