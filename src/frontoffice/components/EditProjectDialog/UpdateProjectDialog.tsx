
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { Project } from '../../../models/Project';
import { updateProject } from '../../../services/ProjectService';
import Swal from 'sweetalert2';

interface Props {
  open: boolean;
  onClose: () => void;
  initialProject: Project;
  projectId: string;
}

export default function UpdateProjectDialog({
  open,
  onClose,
  initialProject,
  projectId,
}: Props) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateLimite, setDateLimite] = useState('');

  useEffect(() => {
    if (initialProject) {
      setTitre(initialProject.titre || '');
      setDescription(initialProject.description || '');
      setDateLimite(initialProject.dateLimite || '');
    }
  }, [initialProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProject: Project = {
      ...initialProject,
      titre,
      description,
      dateLimite,
    };

    try {
      await updateProject(updatedProject, projectId);
      Swal.fire({
        icon: 'success',
        title: 'Projet mis à jour',
        confirmButtonColor: '#3085d6',
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors de la mise à jour',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier le projet</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, width: '400px' }}
        >
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
              Enregistrer
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
