import PropTypes from 'prop-types';

export const Button = ({
	id,
	className,
	type,
	handleClick,
	isLoading,
	children,
}) => {
	return (
		<button
			id={id}
			className={className}
			type={type || 'button'}
			onClick={handleClick}
			disabled={isLoading}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
};
