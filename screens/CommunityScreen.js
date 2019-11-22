import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ImageDetail from '../components/ImageDetail'

const CommunityScreen = () => {
    return (
        <View>
          <Text style={styles.textStyle}>All Communities</Text>
        </View>
    )
}

const styles = StyleSheet.create({
      textStyle: {
        fontSize: 45
    },
})

export default CommunityScreen