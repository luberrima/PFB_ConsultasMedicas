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
}) => {
    const [inputType, setInputType] = useState(type);
    const [showPass, setShowPass] = useState(false);

    const handleClick = () => {
        setShowPass(!showPass);
        setInputType(showPass ? 'password' : 'text');
    };

    return (
        <label>
            <p>{label}</p>
            <div>
                <input
                    onChange={handleChange}
                    type={inputType}
                    name={name}
                    value={value}
                    autoComplete={`new-${name}`}
                    placeholder={placeholder}
                    className={className}
                />
                {type === 'password' && (
                    <Button
                        handleClick={handleClick}
                        className="visibility-btn"
                    >
                        <Icon
                            name={showPass ? 'visibility_off' : 'visibility'}
                        />
                    </Button>
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
