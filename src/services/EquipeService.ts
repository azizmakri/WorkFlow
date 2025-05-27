import axios from 'axios';
import type { Equipe } from '../models/Equipe';
import type { User } from '../models/User';
import type { EquipesStats } from '../models/EquipesStats';

const API_URL = 'http://localhost:9091/equipe';

export const createEquipe = async (equipe: Equipe): Promise<void> => {
  await axios.post(`${API_URL}/addEquipe`, equipe);
};

export const getEquipesByUser = async (userId:string): Promise<Equipe[]> => {
  const response = await axios.get<Equipe[]>(`${API_URL}/equipeByuser/${userId}`);
  return response.data;
};

export const getEquipeById = async (id:string): Promise<Equipe> => {
  const response = await axios.get<Equipe>(`${API_URL}/equipeById/${id}`);
  return response.data;
};

export const getAllEquipes = async (): Promise<Equipe[]> => {
  const response = await axios.get<Equipe[]>(`${API_URL}/getAllEquipes`);
  return response.data;
};

export const removeUserFromEquipe = async (equipeId: string,userName:string) => {
  const response = await axios.delete(`${API_URL}/removeUserFromEquipe/${equipeId}/${userName}`);
  return response.data;
};

export const addUserToEquipe = async (equipeId: string,userName:string) => {
  const response = await axios.post(`${API_URL}/addUserToEquipe/${userName}/${equipeId}`);
  return response.data;
};

export const getAllUsersNotInEquipe = async (equipeId:string): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_URL}/getAllUsersNotInEquipe/${equipeId}`);
  return response.data;
};

export const deleteEquipe = async (idEquipe: string) => {
  const response = await axios.delete(`${API_URL}/deleteEquipe/${idEquipe}`);
  return response.data;
};

export const top5EquipesTermineProjects = async (): Promise<EquipesStats[]> => {
  const response = await axios.get<EquipesStats[]>(`${API_URL}/top5EquipesTermineProjects`);
  return response.data;
};

export const getTotalNumberOfEquipes = async (): Promise<number> => {
  const response = await axios.get<number>(`${API_URL}/totalNumberOfEquipes`);
  return response.data;
};