import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect } from 'react';
import { init } from './util/database';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    init()
    .then(() => SplashScreen.hideAsync())
    .catch(err => console.log(err))
  }, [])

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}>
        <Stack.Screen 
            name="AllPlaces" 
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'Your favorite places',
              headerRight: ({tintColor}) => (
              <IconButton 
                icon="add" 
                size={24} 
                color={tintColor}
                onPress={() => console.log(navigation.navigate('AddPlace'))}
              />
            )})} 
        />
        <Stack.Screen 
          name="AddPlace" 
          component={AddPlace}
          options={{
            title: 'Add a new place'
          }} 
        />
        <Stack.Screen 
            name="Map" 
            component={Map} 
        />
      </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}