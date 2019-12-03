import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class YourRequests extends React.Component {
  
  render() {
    return (
      <View>
        <Text style={styles.textStyle}>Your requests</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45
    },
    subheaderStyle: {
        fontSize: 20
    }
})

