import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const width = Dimensions.get('screen').width;
type Prop = {
  name: string,
  id: string,
  image: string,
  onPress: ()=>void;
}
const PokeCard = (prop: Prop) => {
  const {name, id, image, onPress} = prop;
  const dispatch = useDispatch();
  // const data: dataInfor = useSelector((state: RootState) => state.getPokeCardReducer)
  
  useEffect(()=>{
    // dispatch({ type: GET_POKAEMON_CARD, payload: {name: prop.name}})
  },[])

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={{
          backgroundColor: '#EFEFEF',
          position: 'absolute',
          left: 0,
          right: 0,
          height: '50%',
          bottom: 0,
          borderRadius: 10
        }}
      />
      <Text style={styles.pokeNumb}>{id}</Text>
      <Image source={{uri: image}}  style={styles.baseImg} resizeMode='contain' resizeMethod='resize'/>
      <Text style={styles.pokeName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default PokeCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.28,
    minHeight: 108,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 8,
      height: 1,
    },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 10,
  },
  baseImg: {
    minHeight: 60,
    marginTop: 10,
    marginBottom: 15,
  },
  pokeNumb: {
    alignSelf: 'flex-end',
    fontSize: 10,
  },
  pokeName: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
});
