import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import LabelScreen from './screens/LabelScreen';
import FolderScreen from './screens/FolderScreen';
import TrashScreen from './screens/TrashScreen';
import NewNoteScreen from './screens/NewNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import ManageLabelsScreen from './screens/ManageLabelsScreen';
import { NotesProvider } from './context/NotesContext';
import { LabelsProvider } from './context/LabelsContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Note = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Notes" component={HomeScreen} />
      <Drawer.Screen name="Labels" component={LabelScreen} />
      <Drawer.Screen name="Folders" component={FolderScreen} />
      <Drawer.Screen name="Trash" component={TrashScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NotesProvider>
        <LabelsProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Note">
              <Stack.Screen name="Note" component={Note} options={{ headerShown: false }} />
              <Stack.Screen name="NewNote" component={NewNoteScreen} />
              <Stack.Screen name="EditNote" component={EditNoteScreen} />
              <Stack.Screen name="ManageLabels" component={ManageLabelsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </LabelsProvider>
      </NotesProvider>
    </>
  );
}
