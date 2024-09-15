import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import Straighten from '../assets/straighten.svg';
import Weight from '../assets/weight.svg';
import {AbilitiesEntity} from '../data/dataType';

type Prop = {
  title: string;
  stats?: string;
  style?: ViewStyle[] | ViewStyle;
  ability?: AbilitiesEntity[];
  statORAbl: boolean;
  icon: 'Weight' | 'Straighten' | 'None';
};

const HealthCard = (props: Prop) => {
  const {title, stats, style, icon, statORAbl, ability} = props;

  const renderIcon = () => {
    switch (icon) {
      case 'Weight':
        return <Weight width={20} height={20} fill={'#000'} />;
      case 'Straighten':
        return <Straighten width={20} height={20} fill={'#000'} />;
      case 'None':
      default:
        return null;
    }
  };

  const renderContext = () => {
    if (statORAbl) {
      return (
        <View style={styles.top}>
          {renderIcon()}
          <Text style={styles.topTitle}>{stats}</Text>
        </View>
      );
    } else {
      console.log(ability);
      return (
        <View style={[styles.ablTop, {alignItems: 'center'}]}>
          {ability && ability.length > 0 ? (
            ability.map(abl => (
              <Text
                style={[styles.topTitle, {flexShrink: 1, textAlign: 'center'}]}
                key={abl.ability}>
                {abl.ability}
              </Text>
            ))
          ) : (
            <Text style={styles.topTitle}>No moves available</Text>
          )}
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, style]}>
      {renderContext()}
      <Text>{title}</Text>
    </View>
  );
};

export default HealthCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 20
  },
  top: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 20,
    paddingBottom: 5,
    paddingTop: 10,
  },
  ablTop: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 5,
    paddingTop: 10,
  },
  topTitle: {
    fontSize: 16,
    color: '#000',
  },
});
