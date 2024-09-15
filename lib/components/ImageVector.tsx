import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import React from 'react'

const ImageVector = ({image}: {image: React.ReactNode}) => {
  return (
    <View style={styles.container}>
      {image}
    </View>
  )
}

export default ImageVector

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems:'center',
    }
})