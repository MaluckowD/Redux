import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMessage, getChats } from '../features/chat';
import { useAppDispatch } from '../app/hooks';

export const useChats = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const controller = new AbortController();

    dispatch(getChats({ signal: controller.signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch, navigate]);

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
