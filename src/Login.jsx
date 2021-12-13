import React, { Component } from 'react';
import {Form, Row, Col, InputGroup, Button } from 'react-bootstrap'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false
          };
    }

    render() {
        const { validated } = this.state;
        const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.setState({validated: true});
        };

        return (

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Потребителско име</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Потребителско име"
                                aria-describedby="inputGroupPrepend"
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
                        <Form.Control type="password" placeholder="Парола" required />
                        <Form.Control.Feedback type="invalid">
                            Моля, напишете парола.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit form</Button>
            </Form>
        );
    }
}
