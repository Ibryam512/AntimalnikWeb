import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { postType } from './enums/postType';
import axios from 'axios'; 

export class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            data: this.props.post
          };
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    editPost(e) {
        e.preventDefault();
        const { data } = this.state;
        axios.put(process.env.REACT_APP_API + 'posts', data)
            .then((result) => {
                this.props.onHide();
                alert(result);
            });            
        
    }

    deletePost(e) {
        e.preventDefault();
        axios.delete(process.env.REACT_APP_API + 'posts/' + this.state.data.id)
            .then((result) => {
                this.props.onHide();
                alert(result);
            });
        window.location.reload();
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
                <Form.Group controlId="PostPrice" className="add-edit-post">
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
            aria-tabelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header clooseButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{margin: "0 auto"}}>
                    {(this.props.postType === postType.ad ? "Редактирай обява" : "Редактирай изгубена вещ")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={this.editPost}>
                                <Form.Group controlId="PostTitle" className="add-edit-post">
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
                                 <Form.Group controlId="PostDescription" className="add-edit-post">
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
                                <Button type="submit" className="add-edit-post">
                                {this.props.postType === postType.ad ? "Качи обява" : "Качи изгубена вещ"}
                                </Button>
                                <Modal.Footer>
                                    <Button variant="outline-danger" onClick={this.deletePost}>Изтрий</Button>
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