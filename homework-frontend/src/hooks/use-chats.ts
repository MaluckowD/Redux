import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMessage, getChats } from '../features/chat';
import { logout } from '../features/auth';
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

    dispatch(getChats());
  }, [dispatch, navigate]);

  const handleSend = () => {
    if (text.trim()) {
      dispatch(addMessage(text));
      setText('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return {
    text,
    setText,
    handleLogout,
    handleSend,
  };
};
