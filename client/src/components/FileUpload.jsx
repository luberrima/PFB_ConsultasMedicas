import { useState } from 'react';
import { uploadFileService } from '../services/fetchBackEnd'; // Asumiendo que tienes un servicio para manejar la carga de archivos

export const FileUpload = ({ consultationId }) => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Manejar el cambio en el input de archivo
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Manejar el envío del formulario
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Por favor selecciona un archivo para cargar');
            return;
        }

        setIsUploading(true);
        setError(null);
        setSuccessMessage('');

        try {
            // Llamada al servicio que maneja la subida de archivos
            const response = await uploadFileService(consultationId, file);

            if (response.status === 'ok') {
                setSuccessMessage('Archivo subido exitosamente');
                setFile(null); // Limpiar el archivo seleccionado
            } else {
                setError('Hubo un problema al subir el archivo');
            }
        } catch (err) {
            setError('Hubo un error inesperado:', err);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="file-upload">
            <form onSubmit={handleUpload}>
                <div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button
                    type="submit"
                    className="btn btn-azul"
                    disabled={isUploading || !file}
                >
                    {isUploading ? 'Subiendo...' : 'Subir Archivo'}
                </button>
            </form>
        </div>
    );
};
