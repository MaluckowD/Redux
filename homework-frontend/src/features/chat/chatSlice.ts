import { createSlice } from '@reduxjs/toolkit';
import { fetchChats, sendMessage } from './chatAPI';
import { v4 as uuidv4 } from 'uuid';
import { ChatState } from '../../types';
import { createAppAsyncThunk } from '../../app/createAppAsyncThunk';

const initialState: ChatState = {
  messages: [],
  loading: false,
};

export const getChats = createAppAsyncThunk(
  'chat/getChats',
  async (_, { signal }) => {
    return fetchChats({ signal });
  },
);

export const addMessage = createAppAsyncThunk(
  'chat/addMessage',
  async (body: string, { getState, rejectWithValue }) => {
    const state = getState();
    const user = state.auth.user;
    console.log(user);

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
