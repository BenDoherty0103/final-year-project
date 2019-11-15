import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

const MenuItem = (props) => {
    return (
      <View>
          <Image 
            style={styles.image}
            resizeMode={"contain"}
            source={{uri:'https://unsplash.it/600/400/?random'}} />
          <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
image: {
    width:  150 ,
    height:  125
  }
})

export default MenuItem