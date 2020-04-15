import React from 'react'
import { Button, Text, StyleSheet, View, Alert } from 'react-native'
import * as firebase from 'firebase'
import { db } from '../configs/firebaseConfig'
import { TextInput } from 'react-native-gesture-handler'


export default class EditRequest extends React.Component {

    state = {
        items: [],
        itemName: '',
        itemLocation: '',
        itemDescription: ''
    }

    componentDidMount() {
        db.collection("RequestsList").get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                const items = querySnapshot.docs.map(doc => doc.data());
                this.setState({ items })
            })
        });
    }

    handleOnPress = (props) => {
        items = []
        ids = []
        match = []
        const ItemName = this.state.itemName
        const ItemLocation = this.state.itemLocation
        const ItemDescription = this.state.itemDescription
        db.collection("RequestsList").get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                items.push(doc.data())
                ids.push(doc.id)
            })
            this.setState({ items })
            this.state.items.map((item, i) => {
                if (item.id == this.props.navigation.state.params[0]) {
                    match.push(item, i)
                }
            })
            var i = 0;
            for (var id in ids) {
                i++
                if(i == match[1]) {
                    const matchID = ids[i]
                    this.setState({matchID})
                }
            }
            if(ItemName != '' && ItemLocation != '' && ItemDescription != ''){
                db.collection("RequestsList").doc(String(this.state.matchID)).update({
                  itemName: ItemName,
                  itemLocation: ItemLocation,
                  itemDescription: ItemDescription
                }) 
            }
            else{
              Alert.alert('Error', 'Please enter a value!')
            }
        })
    }

    render() {
        return (
            <View>
                <Text style={styles.textStyle}>Your Request</Text>
                <View style={styles.itemsList}>
                    {this.state.items.map((item) => {
                        if (item.id == this.props.navigation.state.params[0]) {
                            return (
                                <View style={styles.listItem}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={item.itemName}
                                        onChangeText={itemName => this.setState({ itemName })}
                                        value={this.state.itemName} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={item.itemLocation}
                                        onChangeText={itemLocation => this.setState({ itemLocation })}
                                        value={this.state.itemLocation} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={item.itemDescription}
                                        onChangeText={itemDescription => this.setState({ itemDescription })}
                                        value={this.state.itemDescription} />
                                    <Button title='Submit Changes' onPress={this.handleOnPress}></Button>
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
    textStyle: {
        paddingVertical: 15,
        textAlign: 'center',
        fontSize: 45
    },
    textInput: {
        paddingVertical: 15,
        textAlign: 'center',
        fontSize: 25
    },
    itemsList: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    listItem: {
        paddingVertical: 5
    }
})