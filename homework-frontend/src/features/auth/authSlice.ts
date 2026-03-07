import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authAPI';
import { AuthState } from '../../types';

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async (
    { username, password }: { username: string; password: string },
    { dispatch },
  ) => {
    await registerUser(username, password);

    await dispatch(login({ username, password }));

    return { username };
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await loginUser(username, password);

    return {
      username,
      token: response.token,
    };
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
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { logout, setError } = authSlice.actions;
export default authSlice.reducer;
