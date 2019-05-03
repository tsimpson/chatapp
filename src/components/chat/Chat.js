import React from 'react';
import Users from './Users';
import Messages from './Messages';
import EnterChat from './EnterChat';
import socketIOClient from 'socket.io-client';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.socket = null;
        this.state = {
            username : localStorage.getItem('username') ? localStorage.getItem('username') : '',
            uid : localStorage.getItem('uid') ? localStorage.getItem('uid') : this.generateUID(),
            chat_ready : false,
            users : [],
            messages : [],
            message : ''
        }
    }



generateUID(){
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    localStorage.setItem('uid', text);
    return text;
}

    render() {
        return (
            <div className="chat">
                {this.state.chat_ready ? (
                    <React.Fragment>
                        <Users users={this.state.users}/>
                        <Messages
                            sendMessage={this.sendMessage.bind(this)}
                            messages={this.state.messages}
                        />
                    </React.Fragment>
                ) : (
                    <EnterChat
                        setUsername={this.setUsername.bind(this)}
                    />
                )}
            </div>
        )
    }
}

export default Chat;