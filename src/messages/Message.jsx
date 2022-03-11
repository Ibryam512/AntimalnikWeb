import React, { Component } from 'react';
import axios from 'axios';
import { Toast, Button } from 'react-bootstrap';
import { SendMessage } from './SendMessage';
import { url } from './../utils/auth';

export default class Message extends Component {

    constructor(props) {
		super(props);
        this.state = {
            sendMessageShow: false
        };

        this.deleteMessage = this.deleteMessage.bind(this);
    }

    deleteMessage(e) {
        e.preventDefault();
        axios.delete(url + 'messages/delete/' + this.props.id);
    }


	render () {
        let date = new Date(this.props.date);
        let showDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        let userName = JSON.parse(sessionStorage.getItem("userData")).userName;
        let sendMessageClose = () => this.setState({sendMessageShow: false});
		return (
            <div className="message-position">
            <Toast  className="message" onClose={this.deleteMessage}>
                <Toast.Header>
                    <strong className="me-auto">{this.props.sender}</strong>
                    <small className="text-muted">{showDate}</small>
                </Toast.Header>
                <Toast.Body>{(this.props.text.length < 100 ? this.props.text : this.props.text.slice(0,100) + "...")}</Toast.Body>
                <Button variant="outline-primary" style={{float: "right", marginRight: "2%"}} onClick={() => this.setState({sendMessageShow: true})}>Отговори</Button>
                <SendMessage show={this.state.sendMessageShow}
                    onHide={sendMessageClose}
                    sender={userName}
                    reciever={this.props.sender}/>
            </Toast>
            </div>
		);
	}
}