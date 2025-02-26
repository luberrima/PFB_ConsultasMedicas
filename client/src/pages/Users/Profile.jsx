import { Navigate } from 'react-router-dom';
import ProfileCard from '../../../Components/UserProfile/ProfileCard.jsx';
import MeetupsAsistsCard from '../../../Components/UserProfile/MeetupsAsistsCard.jsx';
import { useUser } from '../../../UserContext.jsx';
import UserCard from '../../../Components/UserCard/UserCard.jsx';
import MeetupsOwnerCard from '../../../Components/UserProfile/MeetupsOwnerCard.jsx';

import './Profile.css';

function Profile() {
    const [user] = useUser();

    if (!user?.token) {
        return <Navigate to="/" />;
    }

    return (
        <div id="profileContainer">
            <div id="panelesUsuario">
                <ProfileCard
                    email={user.email}
                    avatar={user.avatar}
                    nombre={user.nombre}
                    username={user.username}
                    bio={user.bio}
                />

                <UserCard
                    avatar={user.avatar}
                    username={user.username}
                    activatedButton={true}
                />
            </div>

            <div id="listaConsultasUsuario">
                <MeetupsOwnerCard
                    titulo="Consultas creadas por usted:"
                    url="consultas"
                />
            </div>
        </div>
    );
}

export default Profile;
