import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { CardGroup, Button, ButtonToolbar } from 'react-bootstrap'
import { SendMessage } from './SendMessage'

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
        let ifLogged = false;
        if (sessionStorage.getItem("userData") !== null) {
            ifLogged = true;
        }
        this.state = {
            post: {title: "", description: "", user: {userName: ""}},
            sendMessageShow: false,
            logged: ifLogged
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

    renderSendMessageButton() {
        const { logged } = this.state;
        let sendMessageClose = () => this.setState({sendMessageShow: false});
        if (logged) {
            let userName = JSON.parse(sessionStorage.getItem("userData")).userName;
            return (
                <ButtonToolbar>
                    <Button variant='primary' onClick={() => this.setState({sendMessageShow: true})}>
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

	render () {
        const { post } = this.state;

	    return (
            <div>
                <CardGroup>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <p>{post.user.userName}</p><br/>
                    {this.renderSendMessageButton()}
                </CardGroup>
            </div>
		);
	}

	
}