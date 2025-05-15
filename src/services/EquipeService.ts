import axios from 'axios';
import type { Equipe } from '../models/Equipe';

const API_URL = 'http://localhost:9091/auth';

export const createEquipe = async (equipe: Equipe): Promise<void> => {
  await axios.post(`${API_URL}/addEquipe`, equipe);
};