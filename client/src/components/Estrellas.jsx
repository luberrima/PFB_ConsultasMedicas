import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export const Estrellas = ({ rating }) => {
    const maxStars = 5;

    return (
        <div className="rating-stars-2">
            {[...Array(maxStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span key={index}>
                        {rating >= starValue ? (
                            <FaStar />
                        ) : rating >= starValue - 0.5 ? (
                            <FaStarHalfAlt />
                        ) : (
                            <FaRegStar />
                        )}
                    </span>
                );
            })}
        </div>
    );
};
