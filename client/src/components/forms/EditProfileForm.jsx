import { useState, useEffect } from 'react';
import { Form } from './Form.jsx';
import { Input } from './Input.jsx';
import { Button } from '../Button.jsx';
import { toast } from 'react-toastify';
import { useUserProfile } from '../../hooks/useUser.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

export const EditProfileForm = () => {
    const { usersOwn, loadingOwn, errorOwn } = useUserProfile();
    const { token } = useAuth();
    const navigate = useNavigate();
    const apiPath = import.meta.env.VITE_BACKEND_HOST;

    const [formData, setFormData] = useState({
        username: '',
        nombre: '',
        bio: '',
        email: '',
        active: true,
        collegeNumber: '',
        dateOfCollege: '',
        avatar: '',
    });
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        if (
            usersOwn &&
            usersOwn.data &&
            usersOwn.data.user &&
            usersOwn.data.user.user &&
            usersOwn.data.user.user.length > 0
        ) {
            const user = usersOwn.data.user.user[0];
            setFormData({
                username: user.username || '',
                nombre: user.nombre || '',
                bio: user.bio || '',
                email: user.email || '',
                active: Boolean(user.active),
                collegeNumber: user.collegeNumber || '',
                dateOfCollege: user.dateOfCollege
                    ? user.dateOfCollege.split('T')[0]
                    : '',
                avatar: user.avatar || '',
            });
        }
    }, [usersOwn]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const dataToUpload = new FormData();
            dataToUpload.append('avatar', file);
            try {
                const response = await fetch(`${apiPath}/users/updateavatar`, {
                    method: 'PUT',
                    headers: {
                        Authorization: token,
                    },
                    body: dataToUpload,
                });
                if (response.ok) {
                    const result = await response.json();

                    setFormData((prev) => ({
                        ...prev,
                        avatar: result.filePath,
                    }));
                    toast.success('Avatar subido correctamente');
                } else {
                    const errorResult = await response.json();
                    toast.error(
                        errorResult.error || 'Error al subir el avatar'
                    );
                }
            } catch (error) {
                console.error('Error al subir avatar:', error);
                toast.error('Error en la conexión al subir el avatar');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiPath}/users/updateprofile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                toast.success(result.message || 'Perfil actualizado con éxito');
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            } else {
                const errorResult = await response.json();
                toast.error(
                    errorResult.message || 'Error al actualizar el perfil'
                );
            }
        } catch (error) {
            console.error('Error en la actualización:', error);
            toast.error('Error en la conexión con el servidor');
        }
    };

    if (loadingOwn) return <p>Cargando perfil...</p>;
    if (errorOwn) return <p>Error: {errorOwn}</p>;

    return (
        <Form handleSubmit={handleSubmit} className="form">
            <Input
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                handleChange={handleChange}
                placeholder="Escribe tu username"
            />
            <Input
                label="Nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                handleChange={handleChange}
                placeholder="Escribe tu nombre"
            />
            <Input
                label="Bio"
                type="text"
                name="bio"
                value={formData.bio}
                handleChange={handleChange}
                placeholder="Escribe una breve bio"
            />

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                handleChange={handleChange}
                placeholder="Correo electrónico"
            />
            <label>
                Avatar:
                <input
                    type="file"
                    name="avatar"
                    onChange={handleAvatarChange}
                />
            </label>
            {usersOwn.data.user.user[0].role === 'doctor' && (
                <>
                    <Input
                        label="Número de colegiado"
                        type="text"
                        name="collegeNumber"
                        value={formData.collegeNumber}
                        handleChange={handleChange}
                        placeholder="Número de colegiado"
                    />
                    <Input
                        label="Fecha de colegiado"
                        type="date"
                        name="dateOfCollege"
                        value={formData.dateOfCollege}
                        handleChange={handleChange}
                    />
                </>
            )}
            <Button type="submit" className="btn btn-azul">
                Actualizar Perfil
            </Button>
        </Form>
    );
};
