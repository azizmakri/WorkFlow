export interface Project {
    id?: string;
    description: string;
    titre: string;
    dateDebut?: string;
    dateFin?: string;
    dateLimite: string;
    etat?: string;
    equipeId?: string;
    tacheIds?: string[];
}
