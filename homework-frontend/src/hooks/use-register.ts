import { useEffect, useState } from 'react';
import { register, setError } from '../features/auth';
import { useAppDispatch } from '../app/hooks';

export const useRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, [dispatch]);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      dispatch(setError('Введите username и password'));
      return;
    }

    try {
      const resultAction = await dispatch(register({ username, password }));
      if (register.fulfilled.match(resultAction)) {
        setSuccessMessage('Пользователь успешно зарегистрирован!');
        setUsername('');
        setPassword('');
      }
    } catch {}
  };

  return {
    handleRegister,
    successMessage,
    username,
    password,
    setUsername,
    setPassword,
  };
};
