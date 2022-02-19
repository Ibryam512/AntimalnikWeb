import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import './../App.css';

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            data: {userName: '', firstName: '', lastName: '', email: '', password: '', passwordConfirm: ''}
        };
        this.Registration = this.Registration.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    Registration(e) {
        this.validate(e);
        if (this.state.validated === true && this.checkIfFieldsAreEmpty() && this.checkIfPasswordsAreEqual()) {
            e.preventDefault();
            const { data } = this.state;
            axios.post(process.env.REACT_APP_API + 'users', data)
                .then((result) => {
                    console.log(result);
                })
        }
        
    }  

    onChange(e) {  
        e.persist();
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
    }

    validate(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ validated: true });
    };

    checkIfFieldsAreEmpty() {
        if (this.state.data.userName !== '' && this.state.data.firstName !== '' 
        && this.state.data.lastName !== '' && this.state.data.email !== '' 
        && this.state.data.password !== '' && this.state.data.passwordConfirm !== '') {
            return true;
        }
        return false;
    }

    checkIfPasswordsAreEqual() {
        if (this.state.data.password === this.state.data.passwordConfirm) {
            return true;
        }
        return false;
    }

    render() {
        const { validated } = this.state;
        const { data } = this.state;

        if (JSON.parse(sessionStorage.getItem("userData")) !== null) {
            return <Navigate to="/profile" />
        }

        return (
            <Form noValidate validated={validated} onSubmit={this.Registration} className="form">
                <h1 className="item">Регистрация</h1>
                <Row className="mb-3 item">
                    <Form.Group as={Col} md="7" controlId="validationCustom01">
                        <Form.Label>Име</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Име"
                            name="firstName"
                            value={data.firstName}
                            onChange={this.onChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля, напишете име.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="7" controlId="validationCustom02">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Фамилия"
                            name="lastName"
                            value={data.lastName}
                            onChange={this.onChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля, напишете фамилия.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="7" controlId="validationCustomUsername">
                        <Form.Label>Потребителско име</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Потребителско име"
                                aria-describedby="inputGroupPrepend"
                                name="userName"
                                value={data.userName}
                                onChange={this.onChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Моля, напишете потребителско име.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="7" controlId="validationCustom03">
                        <Form.Label>Имейл</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Имейл"
                        name="email"
                        value={data.email}
                        onChange={this.onChange}
                        required 
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля, напишете имейл.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="7" controlId="validationCustom04">
                        <Form.Label>Парола</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Парола"
							name="password"
                            value={data.password}
                            onChange={this.onChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля, напишете парола.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="7" controlId="validationCustom05">
                        <Form.Label>Повтори паролата</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Повтори паролата"
                            name="passwordConfirm"
                            value={data.passwordConfirm}
                            onChange={this.onChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {(this.checkIfPasswordsAreEqual() 
                            ? "Моля, повторете паролата." 
                            : "Паролите не съвпадат.")}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-4 item">
                    <Form.Check
                        required
                        label="Съгласявам се с условията за ползване"
                        feedback="Трябва да се съгласите с условията за ползване преди да се регистрирате."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit" className="item-button">Регистрирай се</Button>
            </Form>
        );
    }
}
