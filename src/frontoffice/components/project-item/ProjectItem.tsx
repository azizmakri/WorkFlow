import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import type { Project } from '../../../models/Project';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEquipeById } from '../../../services/EquipeService';

interface Props {
  project: Project;
}

const getEtatColor = (etat: string) => {
  switch (etat.toUpperCase()) {
    case 'ENCOURS':
      return 'info';
    case 'TERMINE':
      return 'success';
    case 'ENATTENTE':
      return 'warning';
    default:
      return 'default';
  }
};

const getEtatLabel = (etat: string) => {
  switch (etat.toUpperCase()) {
    case 'ENCOURS':
      return 'En cours';
    case 'TERMINE':
      return 'Terminé';
    case 'ENATTENTE':
      return 'En attente';
    default:
      return 'Inconnu';
  }
};

export default function ProjectItem({ project }: Props) {
  
  const [equipeName, setEquipeName] = useState<string>('');
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/front-office/projets/${project.id}`);
  };
  useEffect(() => {
      const fetchEquipe = async () => {
        if (project.equipeId) {
            const equipe = await getEquipeById(project.equipeId);
            setEquipeName(equipe.nom);
        }
      };
      fetchEquipe();
    }, [project.equipeId]);
  return (
    <Card
    onClick={handleClick}
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: '#fafafa',
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.015)',
          boxShadow: 6,
        },
        cursor:'pointer',
        height: '100%',
        marginBottom: '2%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Équipe: {equipeName || 'N/A'}
          </Typography>
          <Chip
            size="small"
            label={getEtatLabel(project.etat || '')}
            color={getEtatColor(project.etat || '')}
          />
        </Box>

        <Typography variant="h6" fontWeight={600} gutterBottom>
          {project.titre}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Date limite : {project.dateLimite}
        </Typography>
      </CardContent>
    </Card>
  );
}
