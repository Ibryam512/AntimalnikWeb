import React, { Component } from 'react';
import  { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';
import { url } from './../utils/auth';
import Message from './Message';

export class Messages extends Component {
	constructor(props) {
		super(props);
		this.state = {
            messages: [],
            logged: false
		};
        if (sessionStorage.getItem("userData") !== null) {
            this.state.logged = true;
        }
	}

    refreshMessages() {
		let userName = JSON.parse(sessionStorage.getItem("userData")).userName;
        fetch(url + 'messages/' + userName + '/recieved')
        .then(response => response.json())
        .then(data => {
            this.setState({messages: data});
        });
    }

    componentDidMount() {
        if (this.state.logged) {
            this.refreshMessages();
        }
    }

    componentDidUpdate() {
        if (this.state.logged) {
            this.refreshMessages();
        }
    }

	renderMessage(id, sender, reciever, text, date) {
		return (<Message
                id={id}
				sender={sender}
				reciever={reciever}
                text={text}
                date={date} 
                />);
	}

	render () {
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData === null) {
            return <Navigate to='/login'/>
        }

        const { messages } = this.state;
        if (messages.length === 0) return (<p style={{textAlign: "center"}}>Нямаш нови съобщения.</p>);
        messages.sort((a, b) => {
            return new Date(b.sentDate) - new Date(a.sentDate)
        });
	    return (
            <div>
                <ToastContainer>
                    {messages.map(message => this.renderMessage(message.id, message.sender.userName, message.reciever.userName, message.text, message.sentDate))}
                </ToastContainer>
            </div>
		);
	}

	
}
