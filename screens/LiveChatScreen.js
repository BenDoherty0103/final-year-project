import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from './../configs/firebaseConfig'



export default class Chat extends React.Component {

  state = {
    messages: [],
    requestingUser: [],
    respondingUser: [],
    itemID: []
  }

  componentDidMount(props) {
    const itemName = this.props.navigation.state.params[1]
    this.setState({
      messages: [
        {
          _id: 1,
          text: ['Hello! you are talking about ' + itemName],
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}