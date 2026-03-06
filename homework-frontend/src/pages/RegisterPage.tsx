import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { register, setError } from '../features/auth/authSlice';
import {
  selectAuthError,
  selectAuthLoading,
} from '../features/auth/authSelectors';
import styles from './AuthPage.module.css';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authHeader}>Register</h2>

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
        className={`${styles.authButton} ${styles.registerButton}`}
        onClick={handleRegister}
        disabled={loading}
      >
        Register
      </button>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}

      <p>
        Уже есть аккаунт? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
