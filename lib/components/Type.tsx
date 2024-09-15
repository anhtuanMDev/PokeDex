import { ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type PokeType = {
    name: string,
    color: ColorValue
}

const Type = (props: PokeType) => {
  return (
    <View style={[styles.container, {backgroundColor: props.color}]}>
      <Text>{props.name}</Text>
    </View>
  )
}

export default Type

const styles = StyleSheet.create({
    container: {
        minWidth: 50,
        paddingVertical: 5,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})