import React, { useState } from 'react';
import { CardDoctor } from './CardDoctor.jsx';
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';
import { Link } from 'react-router-dom';

export const CarruselDoctor = ({ doctors }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const photos = doctors?.doctors || [];

    const handleClickNext = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const handleClickPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    const Visibledoctors = [
        photos[currentIndex] || {},
        photos[(currentIndex + 1) % photos.length] || {},
        photos[(currentIndex + 2) % photos.length] || {},
    ];

    return (

        <div className="seccion seccion-carrusel">
            <h2>Algunos de nuestros médicos</h2>
            <div className="carrusel">
                <Button className="btn-carrusel" handleClick={handleClickPrev}>
                    <Icon name="arrow_back" />
                </Button>
                <ul className="doctorsList">
                    {Visibledoctors.map(
                        (doctor /*index*/) =>
                            doctor.id && (
                                <CardDoctor key={doctor.id} doctor={doctor} />
                            )
                    )}
                </ul>
                <Button className="btn-carrusel" handleClick={handleClickNext}>
                    <Icon name="arrow_forward" />
                </Button>
            </div>
            <Link to="/signup" className="btn btn-naranja">
                Regístrate
            </Link>
        </div>

    );
};
