import { useState } from 'react';
import { sendRecoveryCodeService, changePasswordService } from '../../services/passwordService';

export const ChangePasswordForm = ({ email }) => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    try {
      const result = await sendRecoveryCodeService(email);
      setMessage(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    try {
      const result = await changePasswordService(code, newPassword);
      setMessage(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="change-password-form">
      <h3>Cambiar Contraseña</h3>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSendCode}>Enviar código de recuperación</button>
      <form onSubmit={handleChangePassword}>
        <label>
          Código de recuperación:
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Introduce el código recibido"
          />
        </label>
        <label>
          Nueva Contraseña:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva contraseña"
          />
        </label>
        <label>
          Confirmar Nueva Contraseña:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirma la nueva contraseña"
          />
        </label>
        <button type="submit">Actualizar Contraseña</button>
      </form>
    </div>
  );
};