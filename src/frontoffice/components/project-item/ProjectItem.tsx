import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import type { Project } from '../../../models/Project';

interface Props {
  project: Project;
}

const getEtatColor = (etat: string) => {
  switch (etat?.toLowerCase()) {
    case 'en cours':
      return 'info';
    case 'terminé':
      return 'success';
    case 'annulé':
      return 'error';
    default:
      return 'default';
  }
};

export default function ProjectItem({ project }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: '#fafafa',
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.015)',
          boxShadow: 6,
        },
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
            Équipe ID: {project.equipeId || 'N/A'}
          </Typography>
          <Chip
            size="small"
            label={project.etat || 'En attente'}
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
