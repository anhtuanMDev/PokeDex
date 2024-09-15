import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import PokemonBall from './../assets/pokeball.svg';
import Back from './../assets/arrow_back.svg';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ParamList} from '../components/RootNavigation';
import {pokemonType} from '../data/dataEnum';
type DetailScreenRouteProp = RouteProp<ParamList, 'Detail'>;
const Detail = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigate = useNavigation<NavigationProp<ParamList, 'Detail'>>();
  const {item} = route.params;
  const backgroundColor = useMemo(() => {
    const colorType: string = item.types[0].type.name;
    return pokemonType[colorType as keyof typeof pokemonType] || 'red'; // Fallback color
  }, [item.types]);
  useEffect(() => {
    console.log(item.types);
  }, []);
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={[styles.headerBar, styles.header]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigate.goBack();
            }}>
            <Back width={30} height={30} fill={'#ffffffff'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{item.name.toUpperCase()}</Text>
        </View>
        <Text style={styles.headerNumb}>{item.id}</Text>
      </View>

      <PokemonBall
        style={{alignSelf: 'flex-end'}}
        width={205}
        height={208}
        fill={'#FFFFFF80'}
      />

      <View style={styles.scaffold}>
        <Image
          source={{uri: item.sprites.front_default}}
          width={300}
          height={300}
          resizeMode='stretch'
          style={styles.image}
        />
        <Text style={styles.h1Text}>About</Text>
        <View></View>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis
          eros vitae tellus condimentum maximus sit amet in eros.
        </Text>
        <Text style={styles.h1Text}>Base Stats</Text>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  headerBar: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    position: 'absolute',
    top: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  headerNumb: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: 'white',
  },
  image: {
    position: 'absolute',
    top: -180,
    left: '18%',
    right: 0,
  },
  scaffold: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  h1Text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
