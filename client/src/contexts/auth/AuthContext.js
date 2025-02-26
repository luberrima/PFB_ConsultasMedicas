import { createContext } from 'react';

export const AuthContext = createContext({
    token: null,
    currentUser: null,
    onLogin: () => undefined,
    //se podría hacer onLogOut - onLogOut: () => undefined,
});
