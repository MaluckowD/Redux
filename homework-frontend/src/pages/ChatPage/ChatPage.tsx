import { ChatList } from '../../components/ChatList/ChatList';
import styles from './ChatPage.module.css';
import { useChats } from '../../hooks/use-chats';

export const ChatPage = () => {
  const { text, setText, handleLogout, handleSend } = useChats();

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
