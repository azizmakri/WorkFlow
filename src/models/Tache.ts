export interface Tache {
    id?: string;
    titre: string;
    description: string;
    dateLimite: string;
    dateDebut?: string;
    dateFin?: string;
    etat?: string; 
    userId?: string;
    projetId: string;
    commentaireIds?: string[];
}
