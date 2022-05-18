import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {View} from 'react-native';
import IndexTeamContainer from './src/Teams/Index';
import IndexPlayerContainer from './src/Players/Index';
import IndexPlayerDetailContainer from './src/PlayersDetails/Index';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TeamScreen"
          component={IndexTeamContainer}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="PlayerScreen"
          component={IndexPlayerContainer}
          options={{
            header: () => null,
          }}
        />

        <Stack.Screen
          name="PlayerDetails"
          component={IndexPlayerDetailContainer}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
