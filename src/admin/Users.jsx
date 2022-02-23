import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { CardGroup } from 'react-bootstrap';
import { UserDesign } from './UserDesign';
import { roleType } from './../enums/roleType';
import { url } from './../utils/auth';

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

    refreshUsers() {
        fetch(url + 'users')
        .then(response => response.json())
        .then(data => {
            this.setState({users: data});
        });
    }

    componentDidMount() {
       this.refreshUsers();
    }

    componentDidUpdate() {
       this.refreshUsers();
    }

	renderUser(user) {
		return (
            <UserDesign user={user} />
        );
	}

	render () {
        const { users, logged, role } = this.state;
        if (logged && role !== roleType.user) {
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
        else if (logged && role === roleType.user) {
            return (
                <p>Трябва да си модератор или админ, за да имаш достъп до тази страница.</p>
            );
        }
        else {
            return <Navigate to='/login'/>
        }
	}

	
}