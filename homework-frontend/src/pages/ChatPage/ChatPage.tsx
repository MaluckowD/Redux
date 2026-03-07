import { ChatList } from '../../components/ChatList/ChatList';
import { useChats, useLogout } from '../../hooks';
import styles from './ChatPage.module.css';

export const ChatPage = () => {
  const { text, setText, handleSend } = useChats();
  const { handleLogout } = useLogout();

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
        <textarea
          className={styles.inputBox}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button className={styles.sendButton} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};
