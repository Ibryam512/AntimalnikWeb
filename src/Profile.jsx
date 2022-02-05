import React, { Component } from 'react';
import  { Navigate } from 'react-router-dom';
import Post from './components/Post';

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(sessionStorage.getItem("userData")),
            posts: []
        }
    }

    refreshPosts() {
        const { user } = this.state;
        fetch(process.env.REACT_APP_API + `users/${user.userName}/posts`)
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
	

    renderPost(post) {
		return (<Post
                id={post.id}
				title={post.title}
				description={post.description}
                date={post.addDate}
                post={post}
                edit={true}/>);
	}
    
    render() {
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData === null) {
            return <Navigate to='/login'/>
        }
        const { posts } = this.state;

        return (
            [
            <h1>{userData.userName}</h1>,
            <div>
                {posts.map(post => this.renderPost(post))}
            </div>
            ]
        );
    }

}