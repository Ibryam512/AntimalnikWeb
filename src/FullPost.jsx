import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { CardGroup } from 'react-bootstrap';

export default function GetId() {
    const { id } = useParams();

    return (
        <div>
            <FullPost id={id} />
        </div>
    );
}

export class FullPost extends Component {
	constructor(props) {
		super(props);
        this.state = {
            post: {title: "", description: ""}
          };
    }

    getPost() {
        fetch(process.env.REACT_APP_API + 'posts/' + this.props.id)
        .then(response => response.json())
        .then(data => {
            this.setState({post: data});
        });
    }

    componentDidMount() {
        this.getPost();
    }

    componentDidUpdate() {
        this.getPost();
    }

	render () {
        const { post } = this.state;

	    return (
            <div>
                <CardGroup>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                </CardGroup>
            </div>
		);
	}

	
}