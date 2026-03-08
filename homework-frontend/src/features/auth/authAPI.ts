import { apiFetch } from "../../api/apiClient";

const API_URL = 'http://localhost:3001';

export async function registerUser(username: string, password: string) {
  await apiFetch(`${API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function loginUser(username: string, password: string) {
  return apiFetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}
