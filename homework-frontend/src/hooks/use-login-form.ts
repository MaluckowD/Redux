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
    if (user) {
      navigate('/chat');
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, [dispatch]);


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
