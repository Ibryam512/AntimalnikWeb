import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { postType } from './../enums/postType';
import { url } from './../utils/auth';
import axios from 'axios'; 

export class AddPost extends Component {
    constructor(props) {
        super(props);
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        this.state = {
            validated: false,
            data: {title: '', description: '', postType: this.props.postType, price: 0, userName: userData.userName}
          };
        this.аddPost = this.аddPost.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    аddPost(e) {
        e.preventDefault();
        const { data } = this.state;
        data.postType = this.props.postType;
        axios.post(url + 'posts', data)
            .then(() => {
                this.props.onHide();
            });
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        userData.posts.push(data);
        sessionStorage.setItem("userData", JSON.stringify(userData));
            
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
                    <Form.Label>Цена (в лева)</Form.Label>
                    <Form.Control
                        type="number"
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
            centered
            
            >
                <Modal.Header clooseButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{margin: "0 auto"}}>
                    {(this.props.postType === postType.ad ? "Добави обява" : "Добави изгубена вещ")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={this.аddPost}>
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