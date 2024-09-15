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
import {convertColor, convertDecimal, convertId} from '../utils/convert';
import HealthCard from '../components/HealthCard';
type DetailScreenRouteProp = RouteProp<ParamList, 'Detail'>;
const Detail = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigate = useNavigation<NavigationProp<ParamList, 'Detail'>>();
  const {item} = route.params;

  const backgroundColor = useMemo(() => {
    const colorType: string = item.types[0].type;
    console.log('colorType', colorType);
    return convertColor(colorType);
  }, [item.types]);

  useEffect(() => {
    console.log(item.types);
    console.log(backgroundColor);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={[styles.headerBar, styles.header]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigate.goBack();
            }}>
            <Back width={40} height={40} fill={'#ffffff'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{item.name.toUpperCase()}</Text>
        </View>
        <Text style={styles.headerNumb}>{convertId(item.id)}</Text>
      </View>

      <PokemonBall
        style={{alignSelf: 'flex-end'}}
        width={205}
        height={208}
        fill={'#FFFFFF1A'}
      />

      <View style={styles.scaffold}>
        <Image
          source={{uri: item.sprites.front_default}}
          width={300}
          height={300}
          resizeMode="stretch"
          style={styles.image}
        />

        <View style={styles.typeContainer}>
          {item.types.map(type => {
            return (
              <View
                style={[
                  styles.typeTag,
                  {
                    backgroundColor: convertColor(type.type),
                  },
                ]}
                key={type.slot}>
                <Text style={styles.typeText}>{type.type}</Text>
              </View>
            );
          })}
        </View>

        <Text style={[styles.h1Text, {color: backgroundColor}]}>About</Text>

        <View style={styles.header}>
          <HealthCard
            icon="Weight"
            stats={convertDecimal(item.weight) + ' kg'}
            title="Weight"
            statORAbl={true}
          />
          <HealthCard
            icon="Straighten"
            style={{borderLeftWidth: 1, borderRightWidth: 1}}
            stats={convertDecimal(item.height) + ' m'}
            title="Height"
            statORAbl={true}
          />
          <HealthCard
            icon="Straighten"
            title="Moves"
            statORAbl={false}
            ability={item.abilities}
          />
        </View>

        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis
          eros vitae tellus condimentum maximus sit amet in eros.
        </Text>
        <Text style={[styles.h1Text, {color: backgroundColor}]}>
          Base Stats
        </Text>
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
    left: 0,
    right: 0,
  },
  headerTitle: {
    fontSize: 25,
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
    alignSelf: 'center',
  },
  scaffold: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 80,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 10,
  },
  typeTag: {
    borderRadius: 50,
    minWidth: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    flexShrink: 1,
  },
  h1Text: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 15,
  },
});
