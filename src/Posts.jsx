import React, { Component } from 'react';
import { CardGroup, Button, ButtonToolbar } from 'react-bootstrap';
import { AddPost } from './AddPost';
import Post from './components/Post';

export class Posts extends Component {
	constructor(props) {
		super(props);
        let ifLogged = false;
        if (sessionStorage.getItem("userData") !== null) {
            ifLogged = true;
        }
		this.state = {
		  posts: [],
          type: this.props.type,
          addPostShow: false,
          logged: ifLogged
		};
	  }

    refreshPosts() {
        fetch(process.env.REACT_APP_API + 'posts')
        .then(response => response.json())
        .then(data => {
            this.setState({posts: this.filterPosts(data)});
        });
    }

    componentDidMount() {
       this.refreshPosts();
    }

    componentDidUpdate() {
       this.refreshPosts();
    }
	
    filterPosts(posts) {
        let filtered = posts.filter(x => x.postType === this.props.type);
        return filtered;
    }

	renderPost(id, title, description, date) {
		return (<Post
                id={id}
				title={title}
				description={description}
                date={date} 
                />);
	}

    renderButton() {
        const { logged } = this.state;
        let addPostClose = () => this.setState({addPostShow: false});
        if (logged) {
            return (
                <ButtonToolbar>
                    <Button variant='primary' onClick={() => this.setState({addPostShow: true})}>
                        Добави пост
                    </Button>
                    <AddPost show={this.state.addPostShow}
                    onHide={addPostClose}
                    postType={this.props.type}/>
                </ButtonToolbar>
            );
        }
    }

	render () {
        const { posts } = this.state;

	    return (
            <div>
                <CardGroup>
                    {   posts.length > 0
                        ? posts.map(post => this.renderPost(post.id, post.title, post.description, post.addDate))
                        : <p style={{margin: "0 auto"}}>Няма качени постове.</p>
                    }
                </CardGroup>
                {this.renderButton()}
            </div>
		);
	}

	
}