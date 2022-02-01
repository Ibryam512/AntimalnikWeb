import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Post extends Component {

	render () {
    const path = `/posts/${this.props.id}`;
		return (
            <Card style={{margin: "1% 1% 1% 1%"}}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{this.props.title}</Card.Title>
              <Card.Text>
                <Link to={path}>Детайли</Link>
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