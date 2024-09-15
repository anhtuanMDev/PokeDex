import {FlatList, StyleSheet, Text, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PokemonBall from './../assets/pokeball.svg';
import Search from '../components/Search';
import RoundButton from '../components/RoundButton';
import PokeCard from '../components/PokeCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../components/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {PokeAPIInfor} from '../data/dataType';
import {getHomePokeList} from '../redux/actions/action';
import {RootState} from '../redux/store';
import {data} from '../data/data';
const width = Dimensions.get('screen').width;

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ParamList, 'Home'>>();
  // selectors.ts
  // Define selectors inline
  const selectPokeList = (state: RootState) => state.pokeList;
  const selectLoading = (state: RootState) => state.loading;
  const selectError = (state: RootState) => state.error;

  // Use selectors with useSelector
  const pokeList = useSelector(selectPokeList);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getHomePokeList());
  }, [dispatch]);
  useEffect(() => {
    console.log('pokeList item:', pokeList[0]); // Check the format of the first item

  }, [pokeList]);

  // If data is loading or there's an error, handle accordingly
  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <View style={styles.container}>
      <View style={[styles.headerBar, {marginVertical: 15}]}>
        <PokemonBall width={30} height={30} fill={'#FFF'} />
        <Text style={[styles.headerTitle, {marginLeft: 10}]}>Pokédex</Text>
      </View>

      <View style={[styles.headerBar]}>
        <Search />
        <View style={{width: 15}} />
        <RoundButton />
      </View>

      <View style={styles.scaffold}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            // data={data}
            data={pokeList || []} 
            extraData={pokeList}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            ListEmptyComponent={() => {
              console.log("empty component",pokeList)
              return <Text>No Data Available</Text>;
            }}
            columnWrapperStyle={{gap: width * 0.035}}
            contentContainerStyle={{gap: 10, flexGrow: 1}}
            renderItem={({ item }) => (
              <PokeCard
                name={item.name}
                id={item.id.toString()}
                image={item.sprites.front_default}
                onPress={() => navigation.navigate('Detail', { item })}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DC0A2D',
    padding: 4,
  },
  headerBar: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  headerTitle: {
    fontSize: 28,
    color: 'white',
    lineHeight: 34,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  scaffold: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
    marginBottom: 2,
    borderRadius: 15,
    paddingTop: 24,
    paddingHorizontal: 12,
  },
});
