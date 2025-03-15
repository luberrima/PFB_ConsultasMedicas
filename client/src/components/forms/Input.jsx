import { useState } from 'react';
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';

export const Input = ({
    handleChange,
    type,
    name,
    label,
    value,
    // errors,
    placeholder,
    className,
    rows,
    cols,
}) => {
    const [inputType, setInputType] = useState(type);
    const [showPass, setShowPass] = useState(false);

    const handleClick = () => {
        setShowPass(!showPass);
        setInputType(showPass ? 'password' : 'text');
    };

    return (
        <label className="input-wrapper">
            {label && <p>{label}</p>}

            <div className="input-container">
                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        rows={rows}
                        cols={cols}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={className}
                    />
                ) : (
                    <div className="input-field">
                        <input
                            type={inputType}
                            name={name}
                            value={value}
                            onChange={handleChange}
                            autoComplete={`new-${name}`}
                            placeholder={placeholder}
                            className={`input ${className}`}
                        />
                        {type === 'password' && (
                            <button
                                type="button"
                                className="visibility-btn"
                                onClick={handleClick}
                            >
                                <Button
                                    handleClick={handleClick}
                                    className="visibility-btn"
                                >
                                    <Icon
                                        name={
                                            showPass
                                                ? 'visibility_off'
                                                : 'visibility'
                                        }
                                    />
                                </Button>
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* <span className="inputError" id={`error-${name}`}>
                {errors?.map((error) => {
                    if (error.context && error.context.key === name) {
                        return error.message;
                    }
                    return null;
                })}
            </span> */}
        </label>
    );
};
