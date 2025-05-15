import { Box, Typography } from '@mui/material';
import CreateEquipe from '../../components/create-equipe-card/CreateEquipe';

export default function Equipes() {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Gérer les Équipes
      </Typography>
      <CreateEquipe />
    </Box>
  );
}