// pages/equipe/Equipes.tsx
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateEquipe from '../../components/create-equipe-card/CreateEquipe';
import type { Equipe } from '../../../models/Equipe';
import { getAllEquipes } from '../../../services/EquipeService';
import EquipeCard from '../../components/equipeCard/EquipeCard';

export default function Equipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);

  const loadEquipes = async () => {
    const data = await getAllEquipes();
    setEquipes(data);
  };

  useEffect(() => {
    loadEquipes();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Gérer les Équipes
      </Typography>

      <CreateEquipe onEquipeCreated={loadEquipes} />

      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        mt={4}
        justifyContent="flex-start"
      >
        {equipes.map((equipe) => (
          <EquipeCard key={equipe.id} equipe={equipe} onDelete={loadEquipes} />
        ))}
      </Box>
    </Box>
  );
}
