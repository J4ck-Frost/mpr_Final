import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LABELS } from '../data/dummy-data';
import { useNavigation } from '@react-navigation/native';

const getLabelText = (labelId) => {
  const label = LABELS.find(label => label.id === labelId);
  return label ? label.label : labelId;
};

const NoteItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.noteItem, { borderLeftColor: item.color || '#ddd' }]}
      onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
    >
      <Text style={styles.noteTime}>{`${new Date(item.updateAt).toLocaleDateString()} ${new Date(item.updateAt).toLocaleTimeString()}`}</Text>
      <View style={styles.labelContainer}>
        {item.labelIds.map(labelId => (
          <Text key={labelId} style={styles.label}>{getLabelText(labelId)}</Text>
        ))}
      </View>
      <Text style={styles.noteContent}>{item.content}</Text>
      {item.isBookmarked && (
        <Ionicons name="bookmark" size={16} color="black" style={styles.bookmarkIcon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderLeftWidth: 4,
    marginBottom: 10,
    position: 'relative',
  },
  noteContent: {
    fontSize: 16,
    marginTop: 8,
  },
  noteTime: {
    fontSize: 12,
    color: '#555',
  },
  labelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    backgroundColor: '#ddd',
    borderRadius: 12,
    padding: 4,
    margin: 2,
    fontSize: 12,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default NoteItem;
