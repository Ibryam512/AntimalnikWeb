import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { roleType } from './../enums/roleType';
import axios from 'axios'; 

export class UserDesign extends Component {
	constructor(props) {
		super(props);

        this.upgradeUser = this.upgradeUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
	  }

    upgradeUser(e) {
        e.preventDefault();
        if (this.props.user.role === roleType.user) {
            this.props.user.role = roleType.moderator;
        }
        else {
            this.props.user.role = roleType.user;
        }
        axios.put(process.env.REACT_APP_API + 'users', this.props.user);
    }

    deleteUser(e) {
        e.preventDefault();
        axios.delete(process.env.REACT_APP_API + 'users/' + this.props.user.userName);
    }

	render () {
        let link = `users/${this.props.user.userName}`;
        let user = this.props.user;
        return (
            <div className="user">
                <p className="userName"><b>{user.userName}</b></p>
                <div className="left">
                    <p className="names">{user.firstName} {user.lastName}</p>
                    <p className="email">Имейл: {user.email}</p>
                </div>
                <div className="right">
                    <p className="role">Роля -
                        <b>{(user.role === roleType.user
                            ? "Потребител"
                            : (user.role === roleType.moderator
                                ? "Модератор"
                                : "Админ"))}</b>
                    </p>
                    <a href={link} className="link-user">Детайли</a>
                </div>
                <Button variant="outline-primary" className="button" onClick={this.upgradeUser}>{(user.role === roleType.user ? "Направи модератор" : "Направи потребител")}</Button>
                <Button variant="outline-danger" className="button" onClick={this.deleteUser}>Изтрий потребител</Button>
            </div>
        );
	}
}