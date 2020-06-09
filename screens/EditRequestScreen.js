import React from 'react'
import { Button, Text, StyleSheet, View, Alert } from 'react-native'
import Styles from '../assets/Styles'
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
                if (i == match[1]) {
                    const matchID = ids[i]
                    this.setState({ matchID })
                }
            }
            if (ItemName != '' && ItemLocation != '' && ItemDescription != '') {
                db.collection("RequestsList").doc(String(this.state.matchID)).update({
                    itemName: ItemName,
                    itemDescription: ItemDescription
                })
            }
            else {
                Alert.alert('Error', 'Please enter a value!')
            }
        })
    }

    render() {
        return (
            <View style={Styles.requestMainContainer}>
                <Text style={Styles.requestMainHeading}>Your Request</Text>
                <View style={Styles.itemsList}>
                    {this.state.items.map((item) => {
                        if (item.id == this.props.navigation.state.params[0]) {
                            return (
                                <View style={Styles.listItem}>
                                    <TextInput
                                        style={Styles.requestText}
                                        placeholder='Item name'
                                        onChangeText={itemName => this.setState({ itemName })}
                                        value={this.state.itemName} />
                                    <TextInput
                                        style={Styles.requestText}
                                        placeholder='Item Description'
                                        onChangeText={itemDescription => this.setState({ itemDescription })}
                                        value={this.state.itemDescription} />
                                    <View style={Styles.requestSubmit}>
                                        <Button title='Submit Changes' color="#e93766" onPress={this.handleOnPress}></Button>
                                    </View>
                                </View>
                            )
                        }
                    })}
                </View>
            </View>
        )
    }
}