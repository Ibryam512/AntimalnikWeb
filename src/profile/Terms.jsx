import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class Terms extends Component {

    render() {
        return (
            <Modal
            {...this.props}
            aria-tabelledby="contained-modal-title-vcenter"
            centered
            
            >
                <Modal.Header clooseButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{margin: "0 auto"}}>
                        Общи условия за ползване на сайт „Антималник”
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        При публикуването на обяви или регистрация  Потребителя се съгласява със следните условия
                    </p>
                    <p>•	Всеки потребител е отговорен за личните данни, които предоставя и разменя в лични съобщения до други потребители;</p>

                    <p>•	Всеки потребител носи отговорност за истинността, точността и достоверността на данните в обявите и в личните съобщения. В случай, че потребител посочи лични данни на друго лице той трябва да е получил неговото изрично съгласие за това;</p>
                    <p>•	Потребителят получава права за използване на функциите на уеб сайта „Антималник” единствено за лични цели;</p>
                    <p>•	Администраторът си запазва правото да откаже достъп до Услугите, в случай, че посочената от Потребителя информация е невярна, неточна или непълна и има обидно или нецензурно съдържание.</p>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={this.props.onHide}>Затвори</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}