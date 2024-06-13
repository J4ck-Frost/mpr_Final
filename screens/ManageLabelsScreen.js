import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { LABELS } from '../data/dummy-data';
import { useNavigation, useRoute } from '@react-navigation/native';

const ManageLabelsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { noteId, selectedLabels } = route.params;
  const [labels, setLabels] = useState(selectedLabels || []);

  useEffect(() => {
    setLabels(selectedLabels || []);
  }, [selectedLabels]);

  const toggleLabel = (labelId) => {
    setLabels((prevLabels) => {
      if (prevLabels.includes(labelId)) {
        return prevLabels.filter((id) => id !== labelId);
      } else {
        return [...prevLabels, labelId];
      }
    });
  };

  const saveLabelsHandler = () => {
    navigation.navigate('EditNote', { noteId, updatedLabels: labels });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={LABELS}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.labelItem,
              labels.includes(item.id) ? styles.selectedLabel : styles.unselectedLabel,
            ]}
            onPress={() => toggleLabel(item.id)}
          >
            <Text style={[
              styles.labelText,
              labels.includes(item.id) ? styles.selectedLabelText : styles.unselectedLabelText,
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
  },
  selectedLabel: {
    backgroundColor: '#007BFF',
  },
  unselectedLabel: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
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
