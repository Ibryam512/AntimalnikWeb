import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { Terms } from './Terms';
import { url } from './../utils/auth';
import axios from 'axios';
import './../App.css';

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            data: {userName: '', firstName: '', lastName: '', email: '', password: '', passwordConfirm: ''},
            errorMessage: "Моля, повторете паролата.",
            showError: false,
            showSuccess: false,
            termsShow: false
        };
        this.Registration = this.Registration.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    Registration(e) {
        this.validate(e);
        if (this.state.validated && this.checkIfFieldsAreEmpty() && this.checkIfPasswordsAreEqual() && this.checkPasswordMinLength()) {
            e.preventDefault();
            const { data } = this.state;
            axios.post(url + 'users', data)
                .then((result) => {
                    if (JSON.stringify(result) === `The user with username ${data.userName} was added successfully.`) {
                        this.showSuccess();
                    } else {
                        this.showError(JSON.stringify(result));
                    }
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
        this.setState({validated: true});
    }

    checkIfFieldsAreEmpty() {
        if (this.state.data.userName !== '' && this.state.data.firstName !== '' 
        && this.state.data.lastName !== '' && this.state.data.email !== '' 
        && this.state.data.password !== '' && this.state.data.passwordConfirm !== '') {
            return true;
        }
        this.setState({errorMessage: "Моля, повторете паролата."});
        return false;
    }

    checkIfPasswordsAreEqual() {
        if (this.state.data.password === this.state.data.passwordConfirm) {
            return true;
        }
        this.setState({errorMessage: "Паролите не съвпадат."});
        return false;
    }

    checkPasswordMinLength() {
        if (this.state.data.password.length >= 6) {
            return true;
        }
        this.setState({errorMessage: "Паролата трябва да е минимум 6 символа."});
        return false;
    }

    showError(message) {
        this.setState({showError: false})
        return (
            <Alert variant="danger" onClose={() => this.setState({showError: false})} dismissible>
                <Alert.Heading>Грешка!</Alert.Heading>
                <p>
                    {message}
                </p>
            </Alert>
        );
    }

    showSuccess() {
        this.setState({showSuccess: false})
        return (
            <Alert variant="success" onClose={() => this.setState({showSuccess: false})} dismissible>
                <Alert.Heading>Успешна регистрация!</Alert.Heading>
                <p>
                    Поздравления! Сега вие можете да си влезете във вашия акаунт.
                </p>
            </Alert>
        );
    }

    render() {
        const { validated } = this.state;
        const { data } = this.state;
        let termsClose = () => this.setState({termsShow: false});

        if (JSON.parse(sessionStorage.getItem("userData")) !== null) {
            return <Navigate to="/profile" />
        }

        return (
            <Form noValidate validated={validated} onSubmit={this.validate} className="form">
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
                            {this.state.errorMessage}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-4 item">
                    <Form.Check
                        required
                        label="Съгласявам се с условията за ползване"
                        feedback="Трябва да се съгласите с условията за ползване преди да се регистрирате."
                        feedbackType="invalid"
                        onClick={() => this.setState({termsShow: true})}
                    />
                    <Terms show={this.state.termsShow}
                    onHide={termsClose}/>
                </Form.Group>
                <Button type="submit" className="item-button">Регистрирай се</Button>
            </Form>
        );
    }
}
