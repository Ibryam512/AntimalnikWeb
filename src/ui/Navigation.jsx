import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { roleType } from './../enums/roleType';

export class Navigation extends Component {
    
    showUserPage() {
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData !== null) {
            return (
                <Nav.Link as={Link} to="/profile">Здравей, {userData.userName}</Nav.Link>
            );
        }
        else {
            return (
                [
                    <Nav.Link as={Link} to="/login">Вход</Nav.Link>,
                    <Nav.Link as={Link} to="/registration">Регистрация</Nav.Link>
                ]
            );
        }
    }

    showPageWithUsers() {
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData !== null && userData.role === roleType.user) {
            return (
                <Nav.Link as={Link} to="/admin/users">Потребители</Nav.Link>
            );
        }
    }

    render() {
        return(
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Антималник</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Обяви</Nav.Link>
                        <Nav.Link as={Link} to="/lost-things">Изгубени вещи</Nav.Link>
                        <Nav.Link as={Link} to="/messages">Съобщения</Nav.Link>
                        <Nav.Link as={Link} to="/questions">Въпроси</Nav.Link>
                        {this.showPageWithUsers()}
                    </Nav>
                    <Nav>
                        {this.showUserPage()}
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}