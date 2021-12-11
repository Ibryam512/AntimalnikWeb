import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class Square extends Component {

	render () {
		return (
            <Card style={{margin: "1% 1% 1% 1%"}}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{this.props.title}</Card.Title>
              <Card.Text>
                {this.props.description}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Качен на: {this.props.date}</small>
            </Card.Footer>
          </Card>
		);
	}
}