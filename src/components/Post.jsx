import React, { Component } from 'react';
import { Card, ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EditPost } from './../EditPost';
import './../App.css';

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
          <Button variant="outline-primary" onClick={() => this.setState({ editPostShow: true })}>Редактирай</Button>
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
    let description = this.props.description;
    if (description.length > 30) {
      description = description.slice(0,30) + '...';
    }
    let uploadDate = new Date(this.props.date);
    let dateToShow = `${uploadDate.getDate()}/${uploadDate.getMonth()}/${uploadDate.getFullYear()}`;
		return (
      <Card style={{ margin: "1% 1% 1% 1%"}}>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Link to={path} className="link">Детайли</Link>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Качен на: {dateToShow}</small>
          {this.renderEditAndDeleteButtons()}
        </Card.Footer>
      </Card>
		);
	}
}