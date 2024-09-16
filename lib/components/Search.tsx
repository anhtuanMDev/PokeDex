import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageVector from './ImageVector';
import Searches from './../assets/search.svg';
import Close from './../assets/close.svg';

type Props = {
  onSearch: ()=> void;
  changeText: (text: string) =>void
  onDischarge: ()=> void
  value: string
}

const Search = (prop: Props) => {
  const [focus, setFocus] = useState(false);
  const {onSearch, changeText, value, onDischarge} = prop;
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };


  useEffect(() => {
    if (focus) console.log('Is focus');
  }, [focus]);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sideButton} onPress={()=> onSearch()}>
        <ImageVector
          image={<Searches width={30} height={30} fill={'#DC0A2D'} />}
        />
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={(text) => {
          changeText(text)
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.inputSearch}
        placeholder="Search"
        placeholderTextColor={'#666666'}
      />
      <TouchableOpacity
        onPress={() => onDischarge()}
        style={[styles.sideButton, {display: value ? 'flex' : 'none'}]}>
        <ImageVector
          image={<Close width={25} height={25} fill={'#DC0A2D'} />}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    borderRadius: 20,
    elevation: 1,
    backgroundColor: 'white',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.8,
    flexDirection: 'row',
    alignContent: 'center',
  },
  sideButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSearch: {
    flex: 1,
    fontSize: 18,
  },
});
