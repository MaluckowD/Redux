import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, selectAuthUser, setError } from '../features/auth';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const user = useAppSelector(selectAuthUser);

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user]);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      dispatch(setError('Введите username и password'));
      return;
    }

    dispatch(login({ username, password }));
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  };
};
