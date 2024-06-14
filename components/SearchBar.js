// components/SearchBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ isVisible, searchQuery, setSearchQuery, toggleSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={toggleSearch}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      {isVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default SearchBar;
