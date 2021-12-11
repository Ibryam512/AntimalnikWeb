import React, { Component } from 'react';
import { CardGroup } from 'react-bootstrap'
import Post from './components/Post';

export class LostThings extends Component {
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
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
            </CardGroup>
            <CardGroup>
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
            </CardGroup>
            <CardGroup>
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
            </CardGroup>
            <CardGroup>
                {this.renderPost("Изгубена вещ", "Описание", "22-10-2021")}
            </CardGroup>
            </div>
		);
	}

	
}