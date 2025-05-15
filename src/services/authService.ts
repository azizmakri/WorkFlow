import axios from 'axios';
import type { User } from '../models/User';

interface JwtRequest {
  userName: string;
  userPassword: string;
}

const API_URL = 'http://localhost:9091/auth';

export const registerUser = async (user: User) => {
  const response = await axios.post(`${API_URL}/signup`, user);
  return response.data;
};


export const loginUser = async (credentials: JwtRequest) => {
  const response = await axios.post(`${API_URL}/authenticate`, credentials);
  return response.data; // Should return JwtResponse containing token and user info
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_URL}/getallusers`);
  return response.data;
};
