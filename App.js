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

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Note() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Labels" component={LabelScreen} />
      <Drawer.Screen name="Folders" component={FolderScreen} />
      <Drawer.Screen name="Trash" component={TrashScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Note">
          <Stack.Screen name="Note" component={Note} options={{ headerShown: false }} />
          <Stack.Screen name="NewNote" component={NewNoteScreen} options={{ title: 'New Note' }} />
          <Stack.Screen name="EditNote" component={EditNoteScreen} options={{ title: 'Edit Note' }} />
          <Stack.Screen name="ManageLabels" component={ManageLabelsScreen} options={{ title: 'Manage Labels' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
