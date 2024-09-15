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
const Search = () => {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState('');
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  const deleteSeatch = () => {
    setText('');
  };

  useEffect(() => {
    if (focus) console.log('Is focus');
  }, [focus]);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sideButton}>
        <ImageVector
          image={<Searches width={30} height={30} fill={'#DC0A2D'} />}
        />
      </TouchableOpacity>
      <TextInput
        value={text}
        onChangeText={setText}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.inputSearch}
        placeholder="Search"
        placeholderTextColor={'#666666'}
      />
      <TouchableOpacity
        onPress={deleteSeatch}
        style={[styles.sideButton, {display: text ? 'flex' : 'none'}]}>
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
