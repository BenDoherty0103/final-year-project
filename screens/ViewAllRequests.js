import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import * as firebase from 'firebase'
import { db } from './../configs/firebaseConfig'
import RequestItem from './../components/RequestItem'


export default class ViewAll extends React.Component {
  state = {
    items: [],
    itemIDs: []
  }
  
  componentDidMount() {
    db.ref().child('RequestsList/').on('value', (snapshot) => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({items});
        console.log(this.state.items)
      }
    )
  }
  
  renderRequests = (request) => {
    let rows = [];
    Object.keys(request).forEach(key => {
      rows.push(<RequestItem items={this.state.items} />)
  });
  return rows;
} 
  
  render() {
    return (
      <View>
        <Text style={styles.textStyle}>View Requests</Text>
        <View style={styles.tableStyle}>
          {this.renderRequests(this.state)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 45
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#B6A6BB',
  }
})
