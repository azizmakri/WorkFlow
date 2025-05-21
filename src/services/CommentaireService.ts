import axios from 'axios';
import type { Commentaire } from '../models/Commentaire';

const API_URL = 'http://localhost:9091/api/commentaires'; // Adjust base URL as needed



export const getCommentsByTache = async (tacheId: string): Promise<Commentaire[]> => {
  const response = await axios.get(`${API_URL}/tache/${tacheId}`);
  return response.data;
};

export const addComment = async (tacheId: string,userId: string,contenu: string): Promise<Commentaire> => {
  const response = await axios.post(`${API_URL}/addComment/${tacheId}/${userId}`, contenu, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
