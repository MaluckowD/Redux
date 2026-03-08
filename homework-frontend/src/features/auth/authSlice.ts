import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authAPI';
import { AuthState } from '../../types';
import { createAppAsyncThunk } from '../../app/createAppAsyncThunk';

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
};

export const login = createAppAsyncThunk(
  'auth/login',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await loginUser(username, password);
      return {
        username,
        token: response.token,
      };
    } catch {
      return rejectWithValue('Неверный логин или пароль');
    }
  },
);

export const register = createAppAsyncThunk(
  'auth/register',
  async (
    { username, password }: { username: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await registerUser(username, password);
      await dispatch(login({ username, password })).unwrap();

      return { username };
    } catch {
      return rejectWithValue('Ошибка регистрации');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
