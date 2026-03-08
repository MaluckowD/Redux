import { useEffect, useState } from 'react';
import { register, selectAuthUser, setError } from '../features/auth';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

export const useRegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectAuthUser);

  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user]);

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
        setUsername('');
        setPassword('');
      }
    } catch {}
  };

  return {
    handleRegister,
    username,
    password,
    setUsername,
    setPassword,
  };
};
