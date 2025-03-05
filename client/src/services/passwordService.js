// src/services/passwordService.js
const backEndPath = import.meta.env.VITE_BACKEND_HOST;

export const sendRecoveryCodeService = async (email) => {
  const response = await fetch(`${backEndPath}/users/password/recovery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const { message } = await response.json();
  if (!response.ok) throw new Error(message);
  return message;
};

export const changePasswordService = async (recoveryPassCode, newPass) => {
  const response = await fetch(`${backEndPath}/users/password/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recoveryPassCode, newPass }),
  });
  const { message } = await response.json();
  if (!response.ok) throw new Error(message);
  return message;
};
