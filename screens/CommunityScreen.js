import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Community extends React.Component {
  
  render() {
    return (
      <View>
        <Text style={styles.textStyle}>All Communities</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 45
  },
})