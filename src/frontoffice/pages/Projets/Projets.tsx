import { useEffect, useState } from 'react';
import { Button, Dialog, Typography } from '@mui/material';
import CreateProject from '../../components/createProject/createProject';
import type { Project } from '../../../models/Project';
import { getProjectsByUser } from '../../../services/ProjectService';
import ProjectItem from '../../components/project-item/ProjectItem';
export default function Projets() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.userName || '';

  const fetchProjects = async () => {
    const data = await getProjectsByUser(userId);
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCloseDialog = () => {
    setOpen(false);
    fetchProjects(); // Refresh the list after project creation
  };

  return (
    <div style={{ padding: 20 }}>
      <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
        Créer Projet
      </Button>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <CreateProject onClose={handleCloseDialog} />
      </Dialog>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Mes Projets
      </Typography>

      {projects.length === 0 ? (
        <Typography color="text.secondary">Aucun projet trouvé.</Typography>
      ) : (
        projects.map((project) => <ProjectItem key={project.id} project={project} />)
      )}
    </div>
  );
}
