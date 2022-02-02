import React, { Component } from 'react';
import { Card, ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EditPost } from './../EditPost';

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editPostShow: false
		};
  }

  renderEditAndDeleteButtons() {
    if (this.props.edit === true) {
      let editPostClose = () => this.setState({editPostShow: false});
      return (
        <ButtonToolbar>
          <Button variant="outline-primary" onClick={() => this.setState({ editPostShow: true })}>Edit</Button>
          <EditPost show={this.state.editPostShow}
            onHide={editPostClose}
            postType={this.props.post.postType}
            post={this.props.post} />
        </ButtonToolbar>
      );
    }
  }

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
              {this.renderEditAndDeleteButtons()}
            </Card.Footer>
          </Card>
		);
	}
}