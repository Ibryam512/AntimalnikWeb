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
            showError: false,
            showSuccess: false,
            termsShow: false,
            message: ''
        };
        this.Registration = this.Registration.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    Registration(e) {
        if (this.checkIfFieldsAreEmpty() && this.checkIfPasswordsAreEqual() && this.checkPasswordMinLength()) {
            e.preventDefault();
            const { data } = this.state;
            axios.post(url + 'users', data)
                .then((result) => {
                    if (result.status === 200) {
                        this.setState({showSuccess: true});
                    } else {
                        this.setState({showError: true});
                        this.setState({message: result.message});
                    }
                });
        }
        else { 
            this.validate(e);
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
        return false;
    }

    checkIfPasswordsAreEqual() {
        if (this.state.data.password === this.state.data.passwordConfirm) {
            return true;
        }
        this.setState({showError: true});
        this.setState({message: "???????????????? ???? ????????????????!"});
        return false;
    }

    checkPasswordMinLength() {
        if (this.state.data.password.length >= 6) {
            return true;
        }
        this.setState({showError: true});
        this.setState({message: "???????????????? ???????????? ???? ?? ?????????????? 6 ??????????????!"});
        return false;
    }

    showError(message) {
        if (this.state.showError) {
            window.scrollTo({top: 0, behavior: 'smooth'});
            return (
                <Alert className="alert" show={this.state.showError} variant="danger" onClose={() => this.setState({ showError: false })} dismissible>
                    <Alert.Heading>????????????!</Alert.Heading>
                    <p>
                        {message}
                    </p>
                </Alert>
            );
        }
    }

    showSuccess() {
        if (this.state.showSuccess) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return (
                <Alert className="alert" show={this.state.showSuccess} variant="success" onClose={() => this.setState({ showSuccess: false })} dismissible>
                    <Alert.Heading>?????????????? ??????????????????????!</Alert.Heading>
                    <p>
                        ????????????????????????! ???????? ?????? ???????????? ???? ???? ?????????????? ?????? ?????????? ????????????.
                    </p>
                </Alert>
            );
        }
    }

    render() {
        const { validated } = this.state;
        const { data } = this.state;
        let termsClose = () => this.setState({termsShow: false});

        if (JSON.parse(sessionStorage.getItem("userData")) !== null) {
            return <Navigate to="/profile" />
        }

        return (
            <div>
                {this.showError(this.state.message)}
                {this.showSuccess()}
                <Form noValidate validated={validated} onSubmit={this.Registration} className="form">
                    <h1 className="item">??????????????????????</h1>
                    <Row className="mb-3 item">
                        <Form.Group as={Col} md="7" controlId="validationCustom01">
                            <Form.Label>??????</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="??????"
                                name="firstName"
                                value={data.firstName}
                                onChange={this.onChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????, ???????????????? ??????.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustom02">
                            <Form.Label>??????????????</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="??????????????"
                                name="lastName"
                                value={data.lastName}
                                onChange={this.onChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????, ???????????????? ??????????????.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustomUsername">
                            <Form.Label>?????????????????????????? ??????</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="?????????????????????????? ??????"
                                    aria-describedby="inputGroupPrepend"
                                    name="userName"
                                    value={data.userName}
                                    onChange={this.onChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    ????????, ???????????????? ?????????????????????????? ??????.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustom03">
                            <Form.Label>??????????</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="??????????"
                                name="email"
                                value={data.email}
                                onChange={this.onChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????, ???????????????? ??????????.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustom04">
                            <Form.Label>????????????</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="????????????"
                                name="password"
                                value={data.password}
                                onChange={this.onChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????, ???????????????? ????????????.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="7" controlId="validationCustom05">
                            <Form.Label>?????????????? ????????????????</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="?????????????? ????????????????"
                                name="passwordConfirm"
                                value={data.passwordConfirm}
                                onChange={this.onChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????, ?????????????????? ????????????????.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-4 item">
                        <Form.Check
                            required
                            label="???????????????????? ???? ?? ?????????????????? ???? ????????????????"
                            feedback="???????????? ???? ???? ?????????????????? ?? ?????????????????? ???? ???????????????? ?????????? ???? ???? ????????????????????????."
                            feedbackType="invalid"
                            onClick={() => this.setState({ termsShow: true })}
                        />
                        <Terms show={this.state.termsShow}
                            onHide={termsClose} />
                    </Form.Group>
                    <Button type="submit" className="item-button">?????????????????????? ????</Button>
                </Form>
            </div>
        );
    }
}
