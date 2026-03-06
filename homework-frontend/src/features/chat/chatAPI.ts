import { Logger } from '../../utils/logger';

const API_URL = 'http://localhost:3001';

export async function fetchChats(token: string) {
  const url = '/chats';
  const options = { headers: { Authorization: `Bearer ${token}` } };

  Logger.logRequest(url, options);

  const response = await fetch(`${API_URL}/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  Logger.logResponse(url, response);

  if (!response.ok) throw new Error('Failed to fetch chats');

  return response.json();
}

export async function sendMessage(token: string, body: string) {
  const url = '/chats';
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const response = await fetch(`${API_URL}/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body }),
  });
  Logger.logRequest(url, options);
  Logger.logResponse(url, response);

  if (!response.ok) throw new Error('Failed to send message');

  return response.json();
}
