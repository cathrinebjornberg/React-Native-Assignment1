import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Checkbox } from "expo-checkbox";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "ReflectionNotes">;

export default function ReflectionNotes({ navigation }: Props) {
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, [navigation]);

  const [note, setNote] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<Record<number, boolean>>(
    {}
  );

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNote = async () => {
    if (note.trim() === "") {
      Alert.alert("Vänligen skriv en anteckning innan du sparar.");
      return;
    }
    try {
      const newNotes = [...savedNotes, note];
      await AsyncStorage.setItem("userNotes", JSON.stringify(newNotes));
      Alert.alert("Anteckning sparad!");
      setSavedNotes(newNotes);
      setNote("");
    } catch (error) {
      Alert.alert("Misslyckades att spara.");
    }
  };

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("userNotes");
      if (storedNotes) {
        setSavedNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      Alert.alert("Misslyckades att ladda anteckningar.");
    }
  };

  const deleteSelectedNotes = async () => {
    const remainingNotes = savedNotes.filter(
      (_, index) => !selectedNotes[index]
    );
    try {
      await AsyncStorage.setItem("userNotes", JSON.stringify(remainingNotes));
      setSavedNotes(remainingNotes);
      setSelectedNotes({});
      Alert.alert("Anteckning raderad!");
    } catch (error) {
      Alert.alert("Misslyckades att radera anteckningar.");
    }
  };

  const hasSelectedNotes = () => {
    return Object.values(selectedNotes).some((isSelected) => isSelected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ny Anteckning</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Skriv här..."
        value={note}
        onChangeText={setNote}
      />
      <Button title="Spara" onPress={saveNote} />

      <ScrollView style={styles.savedNotesContainer}>
        {savedNotes.map((savedNote, index) => (
          <View key={index} style={styles.noteContainer}>
            <Checkbox
              value={!!selectedNotes[index]}
              onValueChange={() => {
                setSelectedNotes((prev) => ({
                  ...prev,
                  [index]: !prev[index],
                }));
              }}
            />
            <Text style={styles.savedNote}>{savedNote}</Text>
          </View>
        ))}
      </ScrollView>

      {hasSelectedNotes() && (
        <Button title="Radera vald anteckning" onPress={deleteSelectedNotes} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  savedNotesContainer: {
    marginTop: 20,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  savedNote: {
    fontSize: 16,
    marginLeft: 10,
  },
});
