import './BoardSection.css';
import { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { useParams } from 'react-router-dom';
import CreateTache from '../CreateTachePopup/CreateTache';
import { getTachesByProject } from '../../../services/TacheService';
import type { Tache } from '../../../models/Tache';
import TacheCard from '../TacheCard/TacheCard';

export default function BoardSection() {
  const [openDialog, setOpenDialog] = useState(false);
  const [taches, setTaches] = useState<Tache[]>([]);
  const { id: projectId } = useParams<{ id: string }>();

  const fetchTaches = async () => {
    if (projectId) {
      const result = await getTachesByProject(projectId);
      setTaches(result);
    }
  };

  useEffect(() => {
    fetchTaches();
  }, [projectId]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    fetchTaches(); // Refresh tasks
  };

  return (
    <div className="board-container">
      <div className="board-column">
        <h4>À faire</h4>
        <div className="add-tache-container" onClick={() => setOpenDialog(true)}>
          <div className="add-icon">+</div>
          <span className="add-text">Ajouter tâche</span>
        </div>
        {taches.filter(t => t.etat === 'AFAIRE').map(t => (
          <TacheCard key={t.id} tache={t} onUpdate={fetchTaches} />
        ))}
      </div>

      <div className="board-column">
        <h4>En cours</h4>
        {taches.filter(t => t.etat === 'ENCOURS').map(t => (
          <TacheCard key={t.id} tache={t} onUpdate={fetchTaches} />
        ))}
      </div>

      <div className="board-column">
        <h4>Terminée</h4>
        {taches.filter(t => t.etat === 'TERMINE').map(t => (
          <TacheCard key={t.id} tache={t} onUpdate={fetchTaches} />
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <CreateTache onClose={handleCloseDialog} projectId={projectId!} />
      </Dialog>
    </div>
  );
}
