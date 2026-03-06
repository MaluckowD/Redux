import { Message as MessageType } from '../features/chat/chatSlice';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/auth/authSelectors';
import styles from './Message.module.css';

export const Message = ({ message }: { message: MessageType }) => {
  const user = useAppSelector(selectUser);

  const isMyMessage = user?.username === message.username;

  return (
    <div
      className={`${styles.messageRow} ${
        isMyMessage ? styles.myMessage : styles.otherMessage
      }`}
    >
      <div className={styles.bubble}>
        <div className={styles.username}>{message.username}</div>
        <div>{message.body}</div>
      </div>
    </div>
  );
};
