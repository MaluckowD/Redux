import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChats, sendMessage } from './chatAPI';
import { RootState } from '../../app/store';
import { v4 as uuidv4 } from 'uuid';
import { ChatState } from '../../types';

const initialState: ChatState = {
  messages: [],
  loading: false,
};

export const getChats = createAsyncThunk(
  'chat/getChats',
  async (_, { signal }) => {
    return fetchChats({ signal });
  }
);

export const addMessage = createAsyncThunk(
  'chat/addMessage',
  async (body: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const user = state.auth.user;

    if (!user) {
      return rejectWithValue('User not logged in');
    }

    const username = user.username;

    const message = {
      id: uuidv4(),
      body,
      username,
    };

    await sendMessage(body);
    return message;
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
