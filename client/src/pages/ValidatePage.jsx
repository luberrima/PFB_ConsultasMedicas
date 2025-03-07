import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '../components/Loading.jsx';


export const ValidatePage = () => {
	const { registrationCode } = useParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const apiPath = import.meta.env.VITE_BACKEND_HOST;

	useEffect(() => {
		toast.info('Estamos validando tu cuenta');
		const activeUser = async () => {
			try {
				const response = await fetch(
					`${apiPath}/users/active/${registrationCode}`,
					{ method: 'PUT' }
				);
				if (response.ok) {
					const result = await response.json();
					const params = new URLSearchParams({
						type: 'success',
						message: result.message,
					});
					navigate(`/login?${params.toString()}`);
					return;
				} else {
					const result = await response.json();
					const params = new URLSearchParams({
						type: 'error',
						message: result.message,
					});
					navigate(`/login?${params.toString()}`);
					return;
				}
			} catch (error) {
				toast;
			}
		};

		const timer = setTimeout(() => {
			activeUser();
			setIsLoading(false);
		}, 6000);

		return () => clearTimeout(timer);
	}, [registrationCode]);
	return (
		<section>
			<h2>Validate Page</h2>
			{isLoading && <p>Validando tu cuenta...</p>}
			{!isLoading && <Loading />}
		</section>
	);
};
