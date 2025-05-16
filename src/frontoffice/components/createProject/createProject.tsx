import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { Equipe } from '../../../models/Equipe';
import { getEquipesByUser } from '../../../services/EquipeService';
import type { Project } from '../../../models/Project';
import { createProject } from '../../../services/ProjectService';
import Swal from 'sweetalert2';
interface Props {
  onClose: () => void;
}

export default function CreateProject({ onClose }: Props) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateLimite, setDateLimite] = useState('');
  const [equipeId, setEquipeId] = useState('');
  const [equipes, setEquipes] = useState<Equipe[]>([]);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.userName || '';

  useEffect(() => {
    const fetchEquipes = async () => {
      const data = await getEquipesByUser(userId);
      setEquipes(data);
    };
    fetchEquipes();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const project: Project = {
    titre,
    description,
    dateLimite,
  };

  try {
    await createProject(project, equipeId);
    Swal.fire({
      icon: 'success',
      title: 'Projet créé',
      text: 'Le projet a été créé avec succès.',
      confirmButtonColor: '#3085d6',
    });
    onClose();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Une erreur est survenue lors de la création du projet.',
      confirmButtonColor: '#d33',
    });
  }
};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 4, backgroundColor: 'white' }}
    >
      <Typography variant="h6" gutterBottom>
        Créer un projet
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
      <FormControl fullWidth margin="normal">
        <InputLabel id="equipe-select-label">Equipe</InputLabel>
        <Select
          labelId="equipe-select-label"
          value={equipeId}
          onChange={(e) => setEquipeId(e.target.value)}
          label="Equipe"
          required
        >
          {equipes.map((equipe, index) => (
            <MenuItem key={index} value={equipe.id}>
              {equipe.nom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
