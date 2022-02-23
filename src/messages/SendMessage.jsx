import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { url } from './../utils/auth';
import axios from 'axios'; 

export class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            data: {sender: this.props.sender, reciever: this.props.reciever, text: ''}
          };
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    sendMessage(e) {
        e.preventDefault();
        const { data } = this.state;
        //поради неясна причина в обекта data property-то reciever е празно
        data.reciever = this.props.reciever;
        axios.post(url + 'messages/send', data)
            .then((result) => {
                this.props.onHide();
                alert(result);
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
        const { data } = this.state;
        return (
            <Modal
            {...this.props}
            aria-tabelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header clooseButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{margin: "0 auto"}}>
                    Прати съобщение
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={this.sendMessage}>
                                <Form.Group controlId="MessageReciever" className="add-edit-post">
                                    <Form.Label>До: {this.props.reciever}</Form.Label>
                                </Form.Group>
                                 <Form.Group controlId="Message" className="add-edit-post">
                                    <Form.Label>Съобщение</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="text"
                                    placeholder="Съобщение"
                                    value={data.text}
                                    onChange={this.onChange}
                                    required
                                    />
                                </Form.Group>
                                <Button type="submit" className="add-edit-post">Прати съобщение</Button>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={this.props.onHide}>Затвори</Button>
                                </Modal.Footer>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}