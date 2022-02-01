import React, { Component } from 'react';
import  { Navigate } from 'react-router-dom'
import Post from './components/Post';

export class Profile extends Component {
    constructor(props) {
        super(props);
    }

    renderPost(title, description, date) {
		return (<Post
				title={title}
				description={description}
                date={date} />);
	}
    
    render() {
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData === null) {
            return <Navigate to='/login'/>
        }

        return (
            [
            <h1>{userData.userName}</h1>,
            <div>
                {userData.posts.map(post => this.renderPost(post.title, post.description, post.addDate))}
            </div>
            ]
        );
    }

}