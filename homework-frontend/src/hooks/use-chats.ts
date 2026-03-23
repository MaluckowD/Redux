import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addMessage, getChats } from '../features/chat';

export const useChats = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const loadChats = () => {
    dispatch(getChats());
  };

  useEffect(() => {
    loadChats();
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      dispatch(addMessage(text));
      setText('');
    }
  };

  return {
    text,
    setText,
    handleSend,
  };
};
