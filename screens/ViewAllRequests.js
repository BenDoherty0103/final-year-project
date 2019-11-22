import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const ViewAllRequestScreen = () => {
  return (
    <View>
      <Text style={styles.textStyle}>All requests</Text>
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

export default ViewAllRequestScreen