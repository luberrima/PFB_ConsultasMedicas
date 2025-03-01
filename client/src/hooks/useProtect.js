import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.js';
import { useEffect } from 'react';

export const useProtect = (redirect) => {
	const { token } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			const route = `/login${redirect ? `?redirect=${redirect}` : ''}`;
			navigate(route);
		}
	}, [token, redirect]);
};
