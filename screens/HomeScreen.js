import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import NoteItem from '../components/NoteItem';
import { NotesContext } from '../context/NotesContext';
import { LabelsContext } from '../context/LabelsContext';

const HomeScreen = () => {
  const { notes } = useContext(NotesContext);
  const { labels } = useContext(LabelsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setFilteredNotes(notes);
    }
  }, [notes, isFocused]);

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
          renderItem={({ item }) => <NoteItem item={item} labels={labels} />}
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
