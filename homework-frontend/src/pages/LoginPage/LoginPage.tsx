import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from '../AuthPage.module.css';
import { useLogin } from '../../hooks/use-login';
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
    useLogin();

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
