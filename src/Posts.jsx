import React, { Component } from 'react';
import { CardGroup } from 'react-bootstrap'
import Post from './components/Post';

export class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  posts: []
		};
	  }
	
	renderPost(title, description, date) {
		return (<Post
				title={title}
				description={description}
                date={date} />);
	}

	render () {
	    return (
            <div>
            <CardGroup>
                {this.renderPost("Обява", "Описание", "22-10-2021")}
                {this.renderPost("Обява", "Описание", "22-10-2021")}
                {this.renderPost("Обява", "Описание", "22-10-2021")}
            </CardGroup>
            <CardGroup>
                {this.renderPost("Обява", "Описание", "22-10-2021")}
                {this.renderPost("Обява", "Описание", "22-10-2021")}
                {this.renderPost("Обява", "Описание", "22-10-2021")}
            </CardGroup>
            <CardGroup>
                {this.renderPost("Обява", "Описание", "22-10-2021")}
                {this.renderPost("Обява", "Описание", "22-10-2021")}
                {this.renderPost("Обява", "Описание", "22-10-2021")}
            </CardGroup>
            <CardGroup>
                {this.renderPost("Обява", "Описание", "22-10-2021")}
            </CardGroup>
            </div>
		);
	}

	
}