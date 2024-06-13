import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NOTES } from '../data/dummy-data';
import NoteItem from '../components/NoteItem';

const HomeScreen = ({ route }) => {
  const [notes, setNotes] = useState(NOTES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(NOTES);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route.params?.newNote && isFocused) {
      const newNote = {
        ...route.params.newNote,
        updateAt: new Date(route.params.newNote.updateAt), // Convert back to Date object
      };
      setNotes((prevNotes) => {
        if (prevNotes.some(note => note.id === newNote.id)) {
          return prevNotes;
        }
        const updatedNotes = [...prevNotes, newNote];
        NOTES.push(newNote); // Update the global NOTES array
        return updatedNotes;
      });
      setFilteredNotes((prevNotes) => {
        if (prevNotes.some(note => note.id === newNote.id)) {
          return prevNotes;
        }
        return [...prevNotes, newNote];
      });
    }

    if (route.params?.updatedNote && isFocused) {
      const updatedNote = {
        ...route.params.updatedNote,
        updateAt: new Date(route.params.updatedNote.updateAt), // Convert back to Date object
      };
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
      setFilteredNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    }
  }, [route.params?.newNote, route.params?.updatedNote, isFocused]);

  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search notes"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      {filteredNotes.length === 0 ? (
        <Text style={styles.noNotesText}>{searchQuery ? 'Not found!' : 'Please add a new note'}</Text>
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={({ item }) => <NoteItem item={item} />}
          keyExtractor={(item) => item.id}
          style={styles.notesList}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewNote')}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  noNotesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  notesList: {
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
