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
import {
  getHomePokeList,
  searchDischarge,
  searchFilter,
  SORT_POKEMON,
} from '../redux/actions/action';
import {RootState} from '../redux/store';
import {data} from '../data/data';
import state from 'sweetalert/typings/modules/state';
import {set} from 'mongoose';
import {Dialog} from 'react-native-simple-dialogs';
import {RadioGroup} from 'react-native-radio-buttons-group';
const width = Dimensions.get('screen').width;

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ParamList, 'Home'>>();
  const [text, setText] = useState('');
  const [sortDialogVisible, setSortDialogVisible] = useState(false); // State to manage dialog visibility
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'Sort by ID',
      value: 'id',
      selected: true,
    },
    {
      id: '2',
      label: 'Sort by Name',
      value: 'name',
      selected: false,
    },
  ]);
  // Define selectors inline
  const selectPokeList = (state: RootState) => state.pokeList;
  const selectLoading = (state: RootState) => state.loading;
  const selectError = (state: RootState) => state.error;
  const selectFilterList = (state: RootState) => state.filteredList;

  // Use selectors with useSelector
  const pokeList = useSelector(selectPokeList);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filterList = useSelector(selectFilterList);

  const [display, setDisplay] = useState(pokeList);

  useEffect(() => {
    dispatch(getHomePokeList());
  }, [dispatch]);

  useEffect(() => {
    console.log('filter length', filterList.length);
    console.log('poke length', pokeList.length);
    if (filterList.length > 0) setDisplay(filterList);
    else setDisplay(pokeList);
  }, [filterList, pokeList]);

  const searchPokemon = (search: string) => {
    if (search.trim().length == 0) return;
    const searchTerm = search.toLowerCase();
    dispatch(searchFilter(searchTerm, pokeList));
    if (filterList.length > 0) setDisplay(filterList);
  };

  const dischargeSearch = () => {
    console.log('first');
    setText('');
    dispatch(searchDischarge());
  };

  const handleSort = () => {
    // Get the selected sorting value
    const selectedSort = radioButtons.find(r => r.selected)?.value;
    dispatch({type: SORT_POKEMON, payload: {pokeList, sortBy: selectedSort}});
    setSortDialogVisible(false); // Close dialog after sorting
  };

  {
    /* Sort Dialog */
  }
  <Dialog
    visible={sortDialogVisible}
    onTouchOutside={() => setSortDialogVisible(false)}
    title="Sort Options"
    animationType="fade"
    onRequestClose={function (): void {
      throw new Error('Function not implemented.');
    }}
    contentInsetAdjustmentBehavior={undefined}>
    <RadioGroup
      radioButtons={radioButtons}
      onPress={selectedId => {
        const updatedButtons = radioButtons.map(button => ({
          ...button,
          selected: button.id === selectedId,
        }));
        setRadioButtons(updatedButtons);
      }}
    />

    <View style={{marginTop: 20}}>
      <Text style={styles.sortButton} onPress={handleSort}>
        Apply Sort
      </Text>
    </View>
  </Dialog>;

  // If data is loading or there's an error, handle accordingly
  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <View style={styles.container}>
      <View style={[styles.headerBar, {marginVertical: 15}]}>
        <PokemonBall width={30} height={30} fill={'#FFF'} />
        <Text style={[styles.headerTitle, {marginLeft: 10}]}>Pokédex</Text>
      </View>

      <View style={[styles.headerBar]}>
        <Search
          onDischarge={() => dischargeSearch()}
          onSearch={() => searchPokemon(text)}
          changeText={setText}
          value={text}
        />
        <View style={{width: 15}} />
        <RoundButton
          onPress={() => {
            console.log("show dialog")
            setSortDialogVisible(true);
          }}
        />
      </View>

      <View style={styles.scaffold}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            // data={data}
            data={display}
            extraData={display}
            keyExtractor={item => item.name}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            columnWrapperStyle={{gap: width * 0.035}}
            contentContainerStyle={{gap: 10, flexGrow: 1}}
            renderItem={({item}) => (
              <PokeCard
                name={item.name}
                id={item.id.toString()} // Use the detailed ID here
                image={item.sprites.front_default} // Use the sprite from PokeAPIInfor
                key={item.id}
                onPress={() => navigation.navigate('Detail', {item: item})}
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
  sortButton: {
    backgroundColor: '#DC0A2D',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
});
