import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'


const MenuItem = (props) => {
    return (
      <View style={styles.menuContainer}>
          <Image 
            style={styles.image}
            resizeMode={"contain"}
            source={props.image} />
          <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  image: {
    width: 150 ,
    height: 125,
    backgroundColor:'#fff'
  }
})

export default MenuItem