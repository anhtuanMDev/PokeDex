import {View, Text} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import Search from './lib/components/Search';
import RoundButton from './lib/components/RoundButton';
import PokeCard from './lib/components/PokeCard';
import Home from './lib/pages/Home';
import RootNavigation from './lib/components/RootNavigation';
import {Provider} from 'react-redux';
import store from './lib/redux/store.ts';
const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <RootNavigation />
      </View>
    </Provider>
  );
};

export default App;
