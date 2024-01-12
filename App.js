import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

const App = () => {
  // State variables
  // Array to store notes
  const [notes, setNotes] = useState([]);

  // Selected note for editing
  const [selectedNote, setSelectedNote] = useState(null);

  // Note title
  const [title, setTitle] = useState("");

  // Note content
  const [content, setContent] = useState("");

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle saving a note
  const handleSaveNote = () => {
    if (selectedNote) {
      // If a note is selected, update it
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...note, title, content } : note
      );
      setNotes(updatedNotes);
      setSelectedNote(null);
    } else {
      // If no note is selected, add a new note
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([...notes, newNote]);
    }
    setTitle("");
    setContent("");
    setModalVisible(false);
  };

  // Function to handle editing a note
  const handleEditNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);
  };

  // Function to handle deleting a note
  const handleDeleteNote = (note) => {
    const updatedNotes = notes.filter((item) => item.id !== note.id);
    setNotes(updatedNotes);
    setSelectedNote(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>My Notes</Text>

      {/* List of notes */}
      <ScrollView style={styles.noteList}>
        {notes.map((note) => (
          <TouchableOpacity key={note.id} onPress={() => handleEditNote(note)}>
            <Text style={styles.noteTitle}>{note.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Note button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setTitle("");
          setContent("");
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Tap to Add Note</Text>
      </TouchableOpacity>

      {/* Modal for creating/editing notes */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {/* Note title input */}
          <TextInput
            style={styles.input}
            placeholder="Add title here"
            value={title}
            onChangeText={setTitle}
          />

          {/* Note content input */}
          <TextInput
            style={styles.contentInput}
            multiline
            placeholder="Type your note here"
            value={content}
            onChangeText={setContent}
          />

          {/* Buttons for saving, canceling, and deleting */}
          <View style={styles.buttonContainer}>
            <Button
              title="SAVE NOTE"
              onPress={handleSaveNote}
              color="#C7C5B6"
            />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="#e8060a"
            />
            {selectedNote && (
              <Button
                title="Delete"
                onPress={() => handleDeleteNote(selectedNote)}
                color="#FF9500"
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#EFE0DC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
    textAlign: "center",
  },
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15,
	marginTop:10,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    height: 40,
    width: "100%",
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5F4844",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "#FFFBDC",
  },
  input: {
    borderWidth: 1,
    borderColor: "#0F0E0E",
    padding: 10,
    marginBottom: 10,
    borderTopLeftRadius: 25,
	fontWeight: "bold"
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#0F0E0E",
    padding: 10,
    marginBottom: 20,
    borderBottomRightRadius: 25,
    height: 450,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default App;
