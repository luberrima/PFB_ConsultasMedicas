import React /*, { useState }*/ from 'react';
import { CardUserForAdmin } from './CardUserForAdmin.jsx';



export const AllUserList = ({ users }) => {
    
 console.log('Que tenfo en AllUserList',users?.data?.users);
 console.log('Que tenfo en AllUserList',users?.data?.users.length);

 
    if (!users.status) {
        return <div> No pudemos aceder a los usiarios</div>;
    }

    return (
        <>
            <ul className="lista-consultas">
                {users?.data?.users.length > 0 ? (
                    users?.data?.users?.map(
                        (user) => (
                                <CardUserForAdmin
                                    key={user.id}
                                    user={user}
                                />
                            )
                    )
                ) : (
                    <p>No tienes Usuarios</p>
                )}
            </ul>
        </>
    );
};