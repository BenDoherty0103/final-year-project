import React from 'react'
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const HelpScreen = () => {
    const helpTopics = [
        { name: 'Help Topic #1' },
        { name: 'Help Topic #2' },
        { name: 'Help Topic #3' },
        { name: 'Help Topic #4' },
        { name: 'Help Topic #5' },
    ]

    return (
      <View style={styles.mainContainer}>
      <Text style={styles.textStyle}>Your requests</Text>
      <FlatList
        keyExtractor={(helpTopic) => helpTopic.name}
        data={helpTopics}
        renderItem={({ item }) => {
          return <Button title={item.name}/>
        }} />
      </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        marginVertical: 40
    },
    mainContainer: {
      paddingVertical: 30,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    }
})

export default HelpScreen