import { StyleSheet, TouchableHighlight, View } from 'react-native';
import React from 'react';
import ImageVector from './ImageVector';
import Sort from './../assets/sort.svg';

type Props = {
  onPress: () => void
}

const RoundButton = ( prop: Props) => {
  return (
    <TouchableHighlight style={styles.container} underlayColor="#f0f0f0" onPress={() => prop.onPress()}>
      <ImageVector image={<Sort width={30} height={30} fill={"#DC0A2D"} />} />
    </TouchableHighlight>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3, 
    shadowRadius: 6, 
    elevation: 10, 
  }
});
