import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { db } from './../configs/firebaseConfig'


export default class ViewAll extends React.Component {

  state = {
    items: []
  }




  componentDidMount() {
    db.collection("RequestsList").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        const items = querySnapshot.docs.map(doc => doc.data());
        this.setState({ items })
      });
    });
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.mainHeading}>View Requests</Text>
        <Text style={styles.subHeading}>Below is a list of all requests, sorted by their title. Rideshare requests will simply have the title 'Rideshare'</Text>
        <View style={styles.itemsList}>
          {this.state.items.map((item) => {
            if (item.isOpen == true) {
              return (
                <View style={styles.listItem}>
                  {item.category == 'Rideshare' &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestDetails', item.id)}>
                      <Text style={styles.itemtext}>Rideshare</Text>
                    </TouchableOpacity>
                  }
                  {item.category == 'Commodity' &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestDetails', item.id)}>
                      <Text style={styles.itemtext}>{item.itemName}</Text>
                    </TouchableOpacity>
                  }
                  {item.category ==  'Experience' &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestDetails', item.id)}>
                      <Text style={styles.itemtext}>{item.itemName}</Text>
                    </TouchableOpacity>
                  }
                </View>
              )
            }
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 30,
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
  },
  subHeading: {
    fontSize: 17,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    padding: 10
  },
  MainContainer: {
    paddingVertical: 30,
    flex: 1,
    alignItems: 'center'
  },
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
})
