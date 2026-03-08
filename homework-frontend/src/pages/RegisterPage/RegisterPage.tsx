import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import styles from '../AuthPage.module.css';
import { useRegisterForm } from '../../hooks';
import {
  selectAuthLoading,
} from '../../features/auth';

export const RegisterPage = () => {
  const loading = useAppSelector(selectAuthLoading);

  const { handleRegister, username, password, setUsername, setPassword, error, setError } =
    useRegisterForm();

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authHeader}>Register</h2>

      <input
        className={styles.inputField}
        placeholder="Username"
        autoComplete="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError(null);
        }}
      />

      <input
        type="password"
        className={styles.inputField}
        placeholder="Password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(null);
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

      <p>
        Уже есть аккаунт? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
