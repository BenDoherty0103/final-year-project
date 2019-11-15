import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native'
import MenuItem from '../components/MenuItem'

const HomeScreen = ({navigation}) => {
  return <ScrollView style={styles.scroll}>
      <Text style={styles.MainHeading}>Welcome to Commune! Please select an option from the menu below.</Text>
    <View style={containerStyle.mainContainer}>
      <View style={containerStyle.rowContainer}>
        <TouchableOpacity 
          style={containerStyle.innerContainer}
          onPress={() => navigation.navigate('Request')} >
          <MenuItem
            title='Requests'/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={containerStyle.innerContainer}
          onPress={() => navigation.navigate('Community')} >
          <MenuItem
            title='Communities' />
        </TouchableOpacity>
        </View>
      </View>
    <View style={containerStyle.mainContainer}>
      <View style={containerStyle.rowContainer}>
         <TouchableOpacity 
           style={containerStyle.innerContainer}
           onPress={() => navigation.navigate('Help')} >
           <MenuItem
             title='Help'/>
         </TouchableOpacity>
         <TouchableOpacity 
           style={containerStyle.innerContainer}
           onPress={() => {}} >
           <MenuItem
             title='Menu Item 4' />
         </TouchableOpacity>
         </View>
      </View>
    <View style={containerStyle.mainContainer}>
      <View style={containerStyle.rowContainer}>
         <TouchableOpacity 
           style={containerStyle.innerContainer}
           onPress={() => {}} >
           <MenuItem
             title='Menu Item 5'/>
         </TouchableOpacity>
         </View>
      </View>
    </ScrollView>
};

const styles = StyleSheet.create({
  MainHeading: {
    fontSize:20,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  scroll: {
    paddingVertical: 30
  }
});

const containerStyle = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row'
  },
  innerContainer: {
    padding: 8,
    backgroundColor: "#ffffff"
  },
  
}); 

export default HomeScreen;
