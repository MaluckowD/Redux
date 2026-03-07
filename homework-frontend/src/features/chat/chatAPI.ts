import { apiFetch } from '../../api/apiClient';

const API_URL = 'http://localhost:3001';

export const fetchChats = ({ signal }: { signal?: AbortSignal } = {}) => {
  return apiFetch(`${API_URL}/chats`, { signal });
};

export const sendMessage = (body: string) => {
  return apiFetch(`${API_URL}/chats`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  });
};
