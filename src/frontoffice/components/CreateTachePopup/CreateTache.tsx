import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { createTache } from '../../../services/TacheService';
import type { Tache } from '../../../models/Tache';

interface Props {
  onClose: () => void;
  projectId: string;
}

export default function CreateTache({ onClose, projectId }: Props) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateLimite, setDateLimite] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tache: Tache = {
      titre,
      description,
      dateLimite,
      projetId: projectId,
    };

    try {
      await createTache(tache, projectId);
      Swal.fire({
        icon: 'success',
        title: 'Tâche créée',
        text: 'La tâche a été créée avec succès.',
        confirmButtonColor: '#3085d6',
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la création de la tâche.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 4, backgroundColor: 'white', minWidth: 400 }}
    >
      <Typography variant="h6" gutterBottom>
        Créer une tâche
      </Typography>

      <TextField
        fullWidth
        label="Titre"
        variant="outlined"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={3}
        required
      />

      <TextField
        fullWidth
        type="date"
        label="Date limite"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        value={dateLimite}
        onChange={(e) => setDateLimite(e.target.value)}
        margin="normal"
        required
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button onClick={onClose} sx={{ mr: 2 }} color="secondary">
          Annuler
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          Créer
        </Button>
      </Box>
    </Box>
  );
}
