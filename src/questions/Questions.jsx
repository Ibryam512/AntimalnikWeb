import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

export class Questions extends Component {
    constructor(props) {
		super(props);
        this.state = {
            data: {name: '', email: '', question: ''} 
        }
    }

    render() {
        return (
            <div className="questions">
                <Carousel variant="dark" className="carousel-element">
                    <Carousel.Item className="carousel">
                        <h1 className="question">Какво представлява секцията "Обяви"?</h1>
                        <h5 className="answer">"Обяви" представлява място, в което всеки един от нашите потребители може да публикува собствена обява, за да може например да продаде старата си униформа или учебник.</h5>
                    </Carousel.Item>
                    <Carousel.Item className="carousel">
                        <h1 className="question">Какво е "Изгубени вещи"?</h1>
                        <h5 className="answer">"Изгубени вещи" е място, където всеки регистриран потребител може да публикува обява за намерена вещ.</h5>
                    </Carousel.Item>
                    <Carousel.Item className="carousel">
                        <h1 className="question">Защо да използваме сайта?</h1>
                        <h5 className="answer">Тук може да продадете на по-малките от вас ученици вашите учебници, които вече не използвате. Също така да продадете униформата, която вече не носите, понеже ви е станала малка.</h5>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}