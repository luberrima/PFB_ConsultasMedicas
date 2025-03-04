import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('session');
    const initialUser = storedUser
        ? JSON.parse(storedUser)
        : {
              email: '',
              username: '',
              nombre: '',
              avatar: '',
              role: '',
              token: '',
              id: '',
              bio: '', 
          };

    const [user, setUser] = useState(initialUser);

    const enhancedSetUser = (betterUser) => {
        console.log('Actualizando usuario:', betterUser);
        setUser(betterUser);
        localStorage.setItem('session', JSON.stringify(betterUser));
    };

    const handleLogout = () => {
        setUser({
            email: '',
            username: '',
            nombre: '',
            avatar: '',
            id: '',
            role: '',
            active: '',
            token: '',
            bio: '', 
        });
        localStorage.removeItem('session');
        navigate('/');
    };

    return (
        <UserContext.Provider value={[user, enhancedSetUser, handleLogout]}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
