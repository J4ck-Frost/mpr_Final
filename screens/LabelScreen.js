import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import { NotesContext } from '../context/NotesContext';
import { LabelsContext } from '../context/LabelsContext';

const LabelScreen = () => {
  const { labels, setLabels } = useContext(LabelsContext);
  const { notes, setNotes } = useContext(NotesContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleAddLabel = () => {
    if (newLabel.trim() === '') return;

    const newLabelObj = { id: `l${labels.length + 1}`, label: newLabel };
    setLabels([...labels, newLabelObj]);
    setNewLabel('');
    setIsCreateModalVisible(false);
  };

  const handleEditLabel = () => {
    setLabels(labels.map(label => (label.id === selectedLabel.id ? selectedLabel : label)));
    setSelectedLabel(null);
    setIsModalVisible(false);
  };

  const handleDeleteLabel = () => {
    // Remove the label from the notes
    const updatedNotes = notes.map(note => ({
      ...note,
      labelIds: note.labelIds.filter(id => id !== selectedLabel.id)
    }));
    setNotes(updatedNotes);

    // Remove the label from the labels list
    setLabels(labels.filter(label => label.id !== selectedLabel.id));
    setSelectedLabel(null);
    setIsModalVisible(false);
  };

  const openEditModal = (label) => {
    setSelectedLabel(label);
    setIsModalVisible(true);
  };

  const openCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const renderLabelItem = ({ item }) => (
    <TouchableOpacity style={styles.labelItem} onPress={() => openEditModal(item)}>
      <Text style={styles.labelText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search or create label..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Button title="Create Label" onPress={openCreateModal} />
      {searchQuery && !labels.some(label => label.label.toLowerCase() === searchQuery.toLowerCase()) && (
        <TouchableOpacity style={styles.createLabelButton} onPress={handleAddLabel}>
          <Text style={styles.createLabelText}>{`+ Create label "${searchQuery}"`}</Text>
        </TouchableOpacity>
      )}
      
      <FlatList
        data={labels.filter(label => label.label.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderLabelItem}
        keyExtractor={(item) => item.id}
        style={styles.labelsList}
        numColumns={2} // Display labels in two columns
        columnWrapperStyle={styles.columnWrapper} // Style for the row
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Label</Text>
            <TextInput
              style={styles.modalInput}
              value={selectedLabel ? selectedLabel.label : ''}
              onChangeText={(text) => setSelectedLabel({ ...selectedLabel, label: text })}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleEditLabel}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={handleDeleteLabel}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create New Label</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Label name"
              value={newLabel}
              onChangeText={setNewLabel}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddLabel}>
                <Text style={styles.modalButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    padding: 8,
  },
  labelsList: {
    marginTop: 20,
  },
  labelItem: {
    flex: 1,
    padding: 12,
    margin: 4,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Distribute labels evenly across the row
  },
  createLabelButton: {
    padding: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  createLabelText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    padding: 8,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LabelScreen;
