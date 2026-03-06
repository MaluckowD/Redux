const API_URL = 'http://localhost:3001';

export async function fetchChats(token: string) {
  const response = await fetch(`${API_URL}/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch chats');

  return response.json();
}

export async function sendMessage(token: string, body: string) {
  const response = await fetch(`${API_URL}/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body }),
  });

  if (!response.ok) throw new Error('Failed to send message');

  return response.json();
}
