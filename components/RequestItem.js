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
                <View style={styles.listItem} key={index}>
                    <Text style={styles.itemtext}>Item Name: {item.itemName}</Text>
                    <Text style={styles.itemtext}>Item Location: {item.itemLocation}</Text>
                </View>
            )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    itemsList: {
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    listItem: {
      paddingVertical: 5
    },
    itemtext: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    }
});