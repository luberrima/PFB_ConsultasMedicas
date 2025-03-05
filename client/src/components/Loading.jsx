import loader from '../assets/loading.svg';

export const Loading = ({ className }) => {
	return (
		<div className='loading'>
			<img
				className={className ? className : ''}
				src={loader}
				alt='Loading...'
			/>
		</div>
	);
};