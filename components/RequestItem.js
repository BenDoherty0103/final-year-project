import React, { Component } from 'react';
import {  View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';


export default class RequestItem extends Component {

  static propTypes = {
      items: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
            return (
                <View key={index}>
                    <Text style={styles.itemtext}>Item Name: {item.itemName}</Text>
                    <Text style={styles.itemtext}>Item Description: {item.itemDescription}</Text>
                    <Text style={styles.itemtext}>Item Location: {item.itemLocation}</Text>
                    <Text style={styles.itemtext}>Requested At: {item.requestedAt}</Text>
                </View>
            )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    itemsList: {
      paddingVertical: 20,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    itemtext: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    }
});