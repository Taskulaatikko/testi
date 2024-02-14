import { useState } from 'react';
import { DistanceContext } from './components/Contexts';
import { Icon, PaperProvider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import UserView from './components/UserView';
import AddMessageView from './components/Settings';
import MessagesView from './components/MessagesView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Style, { MyTheme } from './styles/Style';
import { useFonts } from 'expo-font';

export default function App() {

  const [messages, setMessages] = useState([]);
  const [loaded] = useFonts({
    play: require('./assets/fonts/PlayfairDisplaySC-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <DistanceContext.Provider value={{ messages, setMessages }}>
      <PaperProvider theme={MyTheme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PaperProvider>
    </DistanceContext.Provider>

  );
}

const Tab = createMaterialTopTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>

      <Tab.Navigator
        tabBarPosition='bottom'
        screenOptions={{
          tabBarActiveTintColor: '#c0d9c4',
          tabBarInactiveTintColor: '#83a087',
          tabBarLabelStyle: {fontSize: 12}
        }}
      >
        <Tab.Screen
          name='user'
          options={{ title: 'Add Workout', tabBarIcon: ({ color }) => <Icon color={color} source='account-circle' size={24} /> }}
          component={UserView}
        />
        <Tab.Screen
          name='messages'
          options={{ title: 'Workouts', tabBarIcon: ({ color }) => <Icon color={color} source='clipboard-list' size={24} /> }}
          component={MessagesView} />
        <Tab.Screen
          name='Settings'
          options={{ title: 'Settings', tabBarIcon: ({ color }) => <Icon color={color} source='message-processing' size={24} /> }}
          component={AddMessageView}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}