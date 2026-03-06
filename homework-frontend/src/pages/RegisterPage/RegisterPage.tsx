import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from '../AuthPage.module.css';
import { useRegister } from '../../hooks/use-register';
import {
  selectAuthError,
  selectAuthLoading,
  setError,
} from '../../features/auth';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const {
    handleRegister,
    successMessage,
    username,
    password,
    setUsername,
    setPassword,
  } = useRegister();

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
