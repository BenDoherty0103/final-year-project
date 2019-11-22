import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const MakeNewRequestScreen = () => {
  return (
    <View>
      <Text style={styles.textStyle}>Make a new request</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45
    },
    subheaderStyle: {
        fontSize: 20
    }
})

export default MakeNewRequestScreen