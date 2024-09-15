import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import { PokeAPIInfor } from '../data/dataType';

const Stack = createNativeStackNavigator();

export type ParamList = {
    Home: undefined,
    Detail: {item: PokeAPIInfor}
}

const RootNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' children={Home}/>
            <Stack.Screen name='Detail' children={Detail}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation