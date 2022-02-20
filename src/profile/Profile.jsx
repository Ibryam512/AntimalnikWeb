import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Post from './../posts/Post';
import './../App.css';


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
        if (this.state.user !== null) {
            this.refreshPosts();
        }
    }

    componentDidUpdate() {
        if (this.state.user !== null) {
            this.refreshPosts();
        }
    }
	
    logOut() {
        sessionStorage.removeItem("userData");
        window.location.reload();
        <Navigate to="/login" />
    }

    renderPost(post) {
		return (
            <Post
                id={post.id}
                title={post.title}
                description={post.description}
                date={post.addDate}
                post={post}
                edit={true} 
                className="post"/>
        );
	}
    
    render() {
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData === null) {
            return <Navigate to='/login'/>
        }
        const { posts } = this.state;

        return (
            <div class="row py-5 px-4">
                <div class="col-md-8 mx-auto">
                    <div class="bg-white shadow rounded overflow-hidden">
                        <div class="bg-light p-4 text-center">
                            <h4 class="mt-0 mb-0">{userData.firstName} {userData.lastName}</h4>
                            <p class="small mb-4">{userData.userName}</p>
                        </div>
                        <div class="bg-light p-4 d-flex  justify-content-center text-center">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item">
                                    <h5 class="font-weight-bold mb-0 d-block">{posts.length}</h5>
                                    <small class="text-muted"> 
                                        <i class="fas fa-image mr-1"></i>
                                        {(posts.length === 1) 
                                        ? "публикуван пост" 
                                        : "публикувани поста"}
                                    </small>
                                </li>
                            </ul>
                        </div>
                        <div class="py-4 px-4">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h5 class="mb-0">Постове</h5>
                            </div>
                            <div class="row">
                                {
                                    posts.length > 0
                                    ? posts.map(post => this.renderPost(post))
                                    : <p style={{margin: "0 auto"}}>Няма качени постове.</p>
                                }
                            </div>
                            <Button variant="outline-secondary" onClick={this.logOut}>Изход</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}