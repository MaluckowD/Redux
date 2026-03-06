export interface Message {
  id: string;
  body: string;
  username: string;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
}
