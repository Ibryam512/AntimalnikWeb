import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { roleType } from './../enums/roleType';
import { url } from './../utils/auth';
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
        axios.put(url + 'users', this.props.user);
    }

    deleteUser(e) {
        e.preventDefault();
        axios.delete(url + 'users/' + this.props.user.userName);
    }

    printButtons() {
        if (this.props.user.role !== roleType.admin) {
            return(
                <ButtonToolbar>
                    <Button variant="outline-primary" className="button" onClick={this.upgradeUser}>{(this.props.user.role === roleType.user ? "Направи модератор" : "Направи потребител")}</Button>
                    <Button variant="outline-danger" className="button" onClick={this.deleteUser}>Изтрий потребител</Button>
                </ButtonToolbar>
            );
        }
    }

	render () {
        let link = `users/${this.props.user.userName}`;
        let user = this.props.user;
        return (
            <div className="user">
                <p className="userName"><b>{user.userName}</b></p>
                <p className="names">{user.firstName} {user.lastName}</p>
                <p className="email">Имейл: {user.email}</p>
                <p className="role">Роля -
                    <b>{(user.role === roleType.user
                        ? "Потребител"
                        : (user.role === roleType.moderator
                            ? "Модератор"
                            : "Админ"))}</b>
                </p>
                <a href={link} className="link-user">Детайли</a>
                {this.printButtons()}
            </div>
        );
	}
}