import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, selectAuthUser } from '../features/auth';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectAuthUser);

  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      setError(null);

      await dispatch(login({ username, password })).unwrap();
    } catch (err) {
      setError(err as string);
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    error,
    setError,
  };
};
