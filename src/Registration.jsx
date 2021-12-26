import React, { Component } from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios'; 
import { User } from './models/User';

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            data: new User("", "", "", "")
        };
        this.Registration = this.Registration.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    Registration() {
       
        const { data } = this.state;
        axios.post(process.env.REACT_APP_API + 'users', data)
            .then((result) => {
                console.log(result)
                this.props.history.push('/')
            })
        
    }  

    onChange(e) {  
        e.persist();
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.data);
    }

    render() {
        const { validated } = this.state;
        const { data } = this.state;
        const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.setState({ validated: true });
        };

        return (
            <Form noValidate validated={validated} onSubmit={handleSubmit, this.Registration}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Име</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Име"
                            name="firstName"
                            value={data.firstName}
                            onChange={this.onChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Фамилия"
                            name="lastName"
                            value={data.lastName}
                            onChange={this.onChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
                                Моля, напишете потребителско име
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
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
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Парола</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Парола" 
                        required
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля, напишете парола.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Повтори паролата</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Повтори паролата" 
                        required
                        />
                        <Form.Control.Feedback type="invalid">
                            Моля, повторете паролата.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Съгласявам се с условията за ползване"
                        feedback="Трябва да се съгласите с условията за ползване преди да се регистрирате"
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit">Регистрирай се</Button>
            </Form>
        );
    }
}
