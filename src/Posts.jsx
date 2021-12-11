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

    refreshPosts() {
        fetch(process.env.REACT_APP_API + 'posts')
        .then(response => response.json())
        .then(data => {
            this.setState({posts: data});
        });
    }

    componentDidMount() {
        this.refreshPosts();
    }

    componentDidUpdate() {
        this.refreshPosts();
    }
	
	renderPost(title, description, date) {
        
		return (<Post
				title={title}
				description={description}
                date={date} />);
	}

	render () {
        const { posts } = this.state;
	    return (
            <div>
                <CardGroup>
                    {posts.map(post => this.renderPost(post.title, post.description, post.addDate))}
                </CardGroup>
            </div>
		);
	}

	
}