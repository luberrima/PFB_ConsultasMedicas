import { useState } from 'react';
import { Input } from './Input.jsx';

export const VoteForm = ({ label, value, handleChange, name, errors }) => {
    const [rating, setRating] = useState(value || 0);

    const handleClick = (value) => {
        setRating(value);
        handleChange(value);
    };
    return (
        <form>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                }}
            >
                {[1, 2, 3, 4, 5].map((value) => (
                    <span
                        key={value}
                        className="material-icons"
                        onClick={() => handleClick(value)}
                        style={{
                            fontSize: '40px',
                            color: rating >= value ? 'gold' : 'gray',
                            transition: 'color 0.3s',
                        }}
                    >
                        star
                    </span>
                ))}
            </div>
            <Input
                label={label}
                value={rating}
                handleChange={() => {}}
                type="text"
                name={name}
                errors={errors}
                placeholder="Selecciona una calificación"
                className="star-rating-input hidden"
            />
        </form>
    );
};
