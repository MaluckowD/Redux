import { useAppSelector } from '../app/hooks';
import { selectMessages } from '../features/chat/chatSelectors';
import { Message } from './Message';
import { VirtualList } from './VirtualList/VirtualList';

export const ChatList = () => {
  const messages = useAppSelector(selectMessages);

  return (
    <VirtualList
      items={messages}
      itemHeight={70}
      height={500}
      renderItem={(message) => <Message key={message.id} message={message} />}
    />
  );
};
