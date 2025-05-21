import axios from 'axios';
import type { Tache } from '../models/Tache';


const API_URL = 'http://localhost:9091/taches';


export const getTachesByProject = async (tacheId:string): Promise<Tache[]> => {
  const response = await axios.get<Tache[]>(`${API_URL}/getTachesByProject/${tacheId}`);
  return response.data;
};

export const createTache = async (tache: Tache,projectId:string): Promise<void> => {
  await axios.post(`${API_URL}/addTacheToProject/${projectId}`, tache);
};

export const commencerTache = async (tacheId: string,userId:string): Promise<void> => {
  await axios.post(`${API_URL}/commencerTache/${tacheId}/${userId}`);
};

export const terminerTache = async (tacheId: string): Promise<void> => {
  await axios.post(`${API_URL}/terminerTache/${tacheId}`);
};

export const deleteTache = async (idTache: string) => {
  const response = await axios.delete(`${API_URL}/supprimerTache/${idTache}`);
  return response.data;
};

export const getTacheById = async (id:string): Promise<Tache> => {
  const response = await axios.get<Tache>(`${API_URL}/getTacheById/${id}`);
  return response.data;
};