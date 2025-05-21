import axios from 'axios';
import type { Project } from '../models/Project';

const API_URL = 'http://localhost:9091/projet';


export const getProjectById = async (id:string): Promise<Project> => {
  const response = await axios.get<Project>(`${API_URL}/getProjetById/${id}`);
  return response.data;
};

export const getProjectsByUser = async (userId:string): Promise<Project[]> => {
  const response = await axios.get<Project[]>(`${API_URL}/getProjectsByUserId/${userId}`);
  return response.data;
};

export const getProjectsByEquipe = async (equipeId:string): Promise<Project[]> => {
  const response = await axios.get<Project[]>(`${API_URL}/equipe/${equipeId}`);
  return response.data;
};

export const createProject = async (project: Project,equipeId:string): Promise<void> => {
  await axios.post(`${API_URL}/addProjectAndAssignEquipe/${equipeId}`, project);
};

export const deleteProjet = async (idProjet: string) => {
  const response = await axios.delete(`${API_URL}/deleteProject/${idProjet}`);
  return response.data;
};
