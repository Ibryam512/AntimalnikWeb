import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class Message extends Component {

	render () {
		return (
            <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">{this.props.sender}</strong>
                    <small className="text-muted">{this.props.date}</small>
                </Toast.Header>
                <Toast.Body>{this.props.text}</Toast.Body>
            </Toast >
		);
	}
}