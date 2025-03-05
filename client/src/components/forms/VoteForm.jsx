import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export const VoteForm = ({ onRatingSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (value) => {
        setRating(value);
    };

    const handleMouseEnter = (value) => {
        setHover(value);
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onRatingSubmit) {
            onRatingSubmit(rating);
        }
        alert(`Has votado con ${rating} estrellas.`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rating-stars">
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={starValue}
                                onClick={() => handleClick(starValue)}
                                style={{ display: 'none' }} // Ocultamos el radio
                            />
                            <FaStar
                                size={30}
                                color={
                                    starValue <= (hover || rating)
                                        ? 'var(--secondary-color)'
                                        : '#e4e5e9'
                                }
                                onMouseEnter={() => handleMouseEnter(starValue)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(starValue)}
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                    );
                })}
            </div>
            <button
                className="btn btn-azul"
                type="submit"
                disabled={rating === 0}
            >
                Enviar Valoración
            </button>
        </form>
    );
};
