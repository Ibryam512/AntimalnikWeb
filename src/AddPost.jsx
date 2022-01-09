import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { postType } from './enums/postType';
import axios from 'axios'; 

export class AddPost extends Component {
    constructor(props) {
        super(props);
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        this.state = {
            validated: false,
            data: {title: '', description: '', postType: this.props.postType, price: 0, user: userData.userName}
          };
        this.аddPost = this.аddPost.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    аddPost(e) {
        e.preventDefault();
        const { data } = this.state;
        alert(data.user);
        axios.post(process.env.REACT_APP_API + 'posts', data)
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

    renderPriceField() {
        const { data } = this.state;
        if (this.props.postType === postType.ad) {
            return (
                <Form.Group controlId="PostPrice">
                    <Form.Label>Цена</Form.Label>
                    <Form.Control
                        type="text"
                        name="price"
                        placeholder="Цена"
                        value={data.price}
                        onChange={this.onChange}
                        required
                    />
                </Form.Group>
            );
        }
    }

    render() {
        const { data } = this.state;
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-tabelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header clooseButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Добави обява
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.аddPost}>
                                <Form.Group controlId="PostTitle">
                                    <Form.Label>Заглавие</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="title" 
                                    placeholder="Заглавие"
                                    value={data.title}
                                    onChange={this.onChange}
                                    required
                                    />
                                </Form.Group>
                                 <Form.Group controlId="PostDescription">
                                    <Form.Label>Описание</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="description"
                                    placeholder="Описание"
                                    value={data.description}
                                    onChange={this.onChange}
                                    required
                                    />
                                </Form.Group>
                                {this.renderPriceField()}
                                <Button type="submit">Качи обява</Button>
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