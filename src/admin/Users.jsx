import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { CardGroup } from 'react-bootstrap';
import { roleType } from './../enums/roleType';

export class Users extends Component {
	constructor(props) {
		super(props);
        
		this.state = {
		  users: [],
          logged: false,
          role: 0
		};
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData !== null) {
            this.state.logged = true;
            this.state.role = userData.role;
        }
	  }

    refreshPosts() {
        fetch(process.env.REACT_APP_API + 'users')
        .then(response => response.json())
        .then(data => {
            this.setState({users: data});
        });
    }

    componentDidMount() {
       this.refreshPosts();
    }

    componentDidUpdate() {
       this.refreshPosts();
    }

	renderUser(user) {
        let link = `users/${user.userName}`;
		return (
            <div className="user">
                <p>{user.userName}</p>
                <span>{user.firstName} {user.lastName}</span>
                <p>{user.email}</p>
                <p>{(user.role === roleType.user ? "Потребител" : (user.role === roleType.moderator ? "Модератор" : "Админ"))}</p>
                <a href={link}>Детайли</a>
            </div>
        );
	}

	render () {
        const { users, logged, role } = this.state;
        if (logged && role === roleType.user) {
            return (
                <div>
                    <CardGroup>
                        {users.length > 0
                            ? users.map(user => this.renderUser(user))
                            : <p style={{ margin: "0 auto" }}>Няма регистрирани потребители</p>
                        }
                    </CardGroup>
                </div>
            );
        }
        else if (logged && role !== roleType.user) {
            return (
                <p>Трябва да си модератор или админ, за да имаш достъп до тази страница.</p>
            );
        }
        else {
            return <Navigate to='/login'/>
        }
	}

	
}