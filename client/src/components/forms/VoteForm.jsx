import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { voteConsultationService } from '../../services/fetchBackEnd.js';

export const VoteForm = ({ consultationId, token }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const navigate = useNavigate();

    const handleClick = (value) => {
        setRating(value);
    };

    const handleMouseEnter = (value) => {
        setHover(value);
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!rating) return;
        try {
            await voteConsultationService(consultationId, token, rating);

            toast.success(`Has votado con ${rating} estrellas.`);
            setTimeout(() => {
                navigate(0);
            }, 3000);
        } catch (error) {
            toast.error('Error al enviar la votación:', error);
        }
    };

    return (
        <form className="vote-form" onSubmit={handleSubmit}>
            <div className="rating-stars">
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <label className="stars" key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={starValue}
                                onClick={() => handleClick(starValue)}
                                style={{ display: 'none' }} // Ocultamos el radio
                            />
                            <FaStar
                                size={60}
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
