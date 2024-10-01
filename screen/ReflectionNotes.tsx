import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function ReflectionNotes() {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");

  useEffect(() => {
    loadNote();
  }, []);

  const saveNote = async () => {
    try {
      await AsyncStorage.setItem("userNote", note);
      Alert.alert("Note saved successfully!");
      setSavedNote(note);
    } catch (error) {
      Alert.alert("Failed to save note.");
    }
  };

  const loadNote = async () => {
    try {
      const storedNote = await AsyncStorage.getItem("userNote");
      if (storedNote) {
        setSavedNote(storedNote);
      }
    } catch (error) {
      Alert.alert("Failed to load note.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reflection Notes</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your reflection here..."
        value={note}
        onChangeText={setNote}
      />
      <Button title="Save Note" onPress={saveNote} />

      {savedNote ? (
        <View style={styles.savedNoteContainer}>
          <Text style={styles.savedNoteHeading}>Your Saved Note:</Text>
          <Text style={styles.savedNote}>{savedNote}</Text>
        </View>
      ) : null}
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
  savedNoteContainer: {
    marginTop: 20,
  },
  savedNoteHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  savedNote: {
    fontSize: 16,
    marginTop: 10,
  },
});
