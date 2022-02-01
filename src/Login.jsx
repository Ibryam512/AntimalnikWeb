import React, { Component } from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import axios from 'axios'; 

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            data: {userName: '', password: ''}
          };
          this.Login = this.Login.bind(this);
          this.onChange = this.onChange.bind(this);
    }

    Login(e) {
        e.preventDefault();
        const { data } = this.state;
        axios.post(process.env.REACT_APP_API + 'users/login', data)
            .then((result) => {
                if (result.data.status == '200') {
                    sessionStorage.setItem('userData', JSON.stringify(result.data.userDetails));
                    sessionStorage.setItem('userPosts', JSON.stringify(result.data.userDetails.posts));
                    alert(sessionStorage.getItem('userData'));
                }
                else {
                    alert(result.data.message);
                }
            });
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

    render() {
        const { validated } = this.state;
        const { data } = this.state;
        const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.setState({validated: true});
        };

        return (

            <Form noValidate validated={validated} onSubmit={this.Login}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Потребителско име</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Потребителско име"
                                name="userName"
                                value={data.userName}
                                onChange={this.onChange}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Моля, напишете потребителско име
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
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
                </Row>
                <Button type="submit">Влез</Button>
            </Form>
        );
    }
}
