import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class Message extends Component {

	render () {
        let date = new Date(this.props.date);
        let showDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		return (
            <Toast className="message">
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">{this.props.sender}</strong>
                    <small className="text-muted">{showDate}</small>
                </Toast.Header>
                <Toast.Body>{(this.props.text.length < 100 ? this.props.text : this.props.text.slice(0,100) + "...")}</Toast.Body>
            </Toast >
		);
	}
}