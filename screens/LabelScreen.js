import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { LABELS } from '../data/dummy-data';

const LabelScreen = () => {
  const [labels, setLabels] = useState(LABELS);
  const [searchQuery, setSearchQuery] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = () => {
    if (searchQuery === '') {
      setLabels(LABELS);
    } else {
      setLabels(LABELS.filter(label => label.label.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  };

  const handleAddLabel = () => {
    if (newLabel.trim() === '') return;

    const newLabelObj = { id: `l${labels.length + 1}`, label: newLabel };
    setLabels([...labels, newLabelObj]);
    setNewLabel('');
  };

  const handleEditLabel = () => {
    setLabels(labels.map(label => (label.id === selectedLabel.id ? selectedLabel : label)));
    setSelectedLabel(null);
    setIsModalVisible(false);
  };

  const handleDeleteLabel = () => {
    setLabels(labels.filter(label => label.id !== selectedLabel.id));
    setSelectedLabel(null);
    setIsModalVisible(false);
  };

  const openEditModal = (label) => {
    setSelectedLabel(label);
    setIsModalVisible(true);
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
        placeholder="Search labels"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      
      <TextInput
        style={styles.input}
        placeholder="New label"
        value={newLabel}
        onChangeText={setNewLabel}
      />
      <Button title="Add Label" onPress={handleAddLabel} />

      <FlatList
        data={labels}
        renderItem={renderLabelItem}
        keyExtractor={(item) => item.id}
        style={styles.labelsList}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Edit Label</Text>
          <TextInput
            style={styles.input}
            value={selectedLabel ? selectedLabel.label : ''}
            onChangeText={(text) => setSelectedLabel({ ...selectedLabel, label: text })}
          />
          <Button title="Save" onPress={handleEditLabel} />
          <Button title="Delete" onPress={handleDeleteLabel} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
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
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  labelText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default LabelScreen;
