import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export class Navigation extends Component {
    
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Антималник</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Обяви</Nav.Link>
                        <Nav.Link href="/lost-things">Изгубени вещи</Nav.Link>
                        <Nav.Link href="/messages">Съобщения</Nav.Link>
                        <Nav.Link href="/questions">Въпроси</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}