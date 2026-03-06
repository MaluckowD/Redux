import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, setError } from '../features/auth/authSlice';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthUser,
} from '../features/auth/authSelectors';
import styles from './AuthPage.module.css';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authHeader}>Login</h2>

      <input
        className={styles.inputField}
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          dispatch(setError(null));
        }}
      />

      <input
        type="password"
        className={styles.inputField}
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          dispatch(setError(null));
        }}
      />

      <button
        className={`${styles.authButton} ${styles.loginButton}`}
        onClick={handleLogin}
        disabled={loading}
      >
        Login
      </button>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <p>
        Нет аккаунта? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};
