import axios from 'axios';
import type { Equipe } from '../models/Equipe';

const API_URL = 'http://localhost:9091/equipe';

export const createEquipe = async (equipe: Equipe): Promise<void> => {
  await axios.post(`${API_URL}/addEquipe`, equipe);
};

export const getEquipesByUser = async (userId:string): Promise<Equipe[]> => {
  const response = await axios.get<Equipe[]>(`${API_URL}/equipeByuser/${userId}`);
  return response.data;
};