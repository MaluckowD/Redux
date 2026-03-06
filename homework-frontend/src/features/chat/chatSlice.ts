import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChats, sendMessage } from './chatAPI';
import { RootState } from '../../app/store';
import { v4 as uuidv4 } from 'uuid';
import { logout } from '../auth/authSlice';

export interface Message {
  id: string;
  body: string;
  username: string;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
};

export const getChats = createAsyncThunk(
  'chat/getChats',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;

    try {
      return await fetchChats(state.auth.user!.token);
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      }

      return rejectWithValue(error);
    }
  },
);

export const addMessage = createAsyncThunk(
  'chat/addMessage',
  async (body: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const user = state.auth.user;

    if (!user) {
      dispatch(logout());
      return rejectWithValue('User not logged in');
    }

    const username = user.username;

    const message = {
      id: uuidv4(),
      body,
      username,
    };

    try {
      await sendMessage(user.token, body);
      return message;
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      }

      return rejectWithValue(error);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChats.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default chatSlice.reducer;
