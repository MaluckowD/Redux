import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { getChats, addMessage } from '../features/chat/chatSlice';
import { ChatList } from '../components/ChatList';
import styles from './ChatPage.module.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

export const ChatPage = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const navigate = useNavigate();

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

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatHeaderRow}>
        <h2 className={styles.chatHeader}>Global Chat</h2>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Выйти
        </button>
      </div>

      <ChatList />

      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.inputBox}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className={styles.sendButton} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};
