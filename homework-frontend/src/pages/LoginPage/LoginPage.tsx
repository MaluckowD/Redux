import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from '../AuthPage.module.css';
import { useLoginForm } from '../../hooks';
import {
  selectAuthError,
  selectAuthLoading,
  setError,
} from '../../features/auth';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const { username, password, setUsername, setPassword, handleLogin } =
    useLoginForm();

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authHeader}>Login</h2>

      <input
        className={styles.inputField}
        placeholder="Username"
        autoComplete="username"
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
        autoComplete="current-password"
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
