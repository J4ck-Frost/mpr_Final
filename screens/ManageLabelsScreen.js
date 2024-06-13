import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LabelsContext } from '../context/LabelsContext';

const ManageLabelsScreen = () => {
  const { labels } = useContext(LabelsContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { noteId, selectedLabels } = route.params;
  const [labelIds, setLabelIds] = useState(selectedLabels || []);

  useEffect(() => {
    setLabelIds(selectedLabels || []);
  }, [selectedLabels]);

  const toggleLabel = (labelId) => {
    setLabelIds((prevLabels) => {
      if (prevLabels.includes(labelId)) {
        return prevLabels.filter((id) => id !== labelId);
      } else {
        return [...prevLabels, labelId];
      }
    });
  };

  const saveLabelsHandler = () => {
    navigation.navigate('EditNote', { noteId, updatedLabels: labelIds });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={labels}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.labelItem,
              labelIds.includes(item.id) ? styles.selectedLabel : styles.unselectedLabel,
            ]}
            onPress={() => toggleLabel(item.id)}
          >
            <Text style={[
              styles.labelText,
              labelIds.includes(item.id) ? styles.selectedLabelText : styles.unselectedLabelText,
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display labels in two columns
        columnWrapperStyle={styles.columnWrapper} // Style for the row
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveLabelsHandler}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  labelItem: {
    flex: 1,
    padding: 12,
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  selectedLabel: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  unselectedLabel: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
  },
  labelText: {
    fontSize: 16,
  },
  selectedLabelText: {
    color: 'white',
  },
  unselectedLabelText: {
    color: 'black',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Distribute labels evenly across the row
  },
  saveButton: {
    padding: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ManageLabelsScreen;
