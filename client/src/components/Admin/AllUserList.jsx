import React /*, { useState }*/ from 'react';
import { CardUserForAdmin } from './CardUserForAdmin.jsx';

export const AllUserList = ({ users }) => {
    if (!users.status) {
        return (
            <div>
                {' '}
                <p className="admin-users-error">
                    No hemos podido acceder a los usuarios. Vuelve a intentarlo
                    en unos minutos
                </p>
            </div>
        );
    }

    return (
        <>
            <ul className="lista-consultas">
                {users?.data?.users.length > 0 ? (
                    users?.data?.users?.map((user) => (
                        <CardUserForAdmin key={user.userId} user={user} />
                    ))
                ) : (
                    <p>No tienes Usuarios</p>
                )}
            </ul>
        </>
    );
};
