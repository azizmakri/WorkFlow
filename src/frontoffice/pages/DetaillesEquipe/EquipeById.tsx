import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Project } from '../../../models/Project';
import { getProjectsByEquipe } from '../../../services/ProjectService';
import ProjectItem from '../../components/project-item/ProjectItem';
import { Typography } from '@mui/material';

export default function EquipeById() {
  const { id } = useParams<{ id: string }>();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (id) {
        const data = await getProjectsByEquipe(id);
        setProjects(data);
      }
    };

    fetchProjects();
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Projets de l'équipe
      </Typography>

      {projects.length === 0 ? (
        <Typography color="text.secondary">Aucun projet trouvé pour cette équipe.</Typography>
      ) : (
        projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))
      )}
    </div>
  );
}
