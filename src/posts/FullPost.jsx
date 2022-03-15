import React, { Component } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { SendMessage } from './../messages/SendMessage';
import { postType } from './../enums/postType';
import { roleType } from './../enums/roleType';
import { url } from './../utils/auth';
import PageNotFound from './../404-page';

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
            post: {title: "", description: "", user: {userName: ""}, postType, price: 1.00},
            sendMessageShow: false,
            logged: false
        };
        if (sessionStorage.getItem("userData") !== null) {
            this.state.logged = true;
        }

        this.deletePost = this.deletePost.bind(this);
    }

    getPost() {
        fetch(url + 'posts/' + this.props.id)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return <PageNotFound/>
        })
        .then(data => {
            this.setState({post: data});
        });
    }

    deletePost(e) {
        e.preventDefault();
        axios.delete(url + 'posts/' + this.props.id)
            .then(() => {
                window.location.reload();
                return <PageNotFound/>
            });
    }

    componentDidMount() {
        if (this.state.post === null) {
            return <PageNotFound/>
        }
        this.getPost();
    }

    componentDidUpdate() {
        if (this.state.post === null) {
            return <PageNotFound/>
        }
        this.getPost();
    }

    renderSendMessageButton() {
        const { logged } = this.state;
        let sendMessageClose = () => this.setState({sendMessageShow: false});
        if (logged) {
            let userName = JSON.parse(sessionStorage.getItem("userData")).userName;
            return (
                <ButtonToolbar>
                    <Button variant='outline-primary' className="post-message-button" onClick={() => this.setState({sendMessageShow: true})}>
                        Прати съобщение
                    </Button>
                    <SendMessage show={this.state.sendMessageShow}
                    onHide={sendMessageClose}
                    sender={userName}
                    reciever={this.state.post.user.userName}/>
                </ButtonToolbar>
            );
        }
    }

    renderDeletePostButton() {
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData !== null && (userData.role !== roleType.user)) {
            return (
                <Button variant='outline-danger' style={{marginTop: "2%"}} className="post-message-button" onClick={this.deletePost}>
                    Изтрий пост
                </Button>
            )
        }
    }

	render () {
        const { post } = this.state;
        if (post === null) return <Navigate to='/'/>

	    return (
            <div className="post">
                <h1 className="post-item">{post.title}</h1>
                <p className="post-item">{post.description}</p>
                <p className="post-item"><b>{post.user.userName}</b></p>
                {(post.postType === postType.ad)
                ? <p className="post-item">Цена: {post.price} лева</p>
                : <p className="post-item">Изгубена вещ</p>}
                {this.renderSendMessageButton()}
                {this.renderDeletePostButton()}
            </div>
		);
	}
}