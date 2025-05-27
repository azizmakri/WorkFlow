import {
  Box,
  IconButton,
  Paper,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Equipe } from '../../../models/Equipe';
import { deleteEquipe } from '../../../services/EquipeService';

interface Props {
  equipe: Equipe;
  onDelete?: () => void;
}

const colors = [
  '#f44336', '#e91e63', '#9c27b0', '#3f51b5',
  '#03a9f4', '#009688', '#4caf50', '#ff9800',
  '#795548', '#607d8b',
];

export default function EquipeCard({ equipe, onDelete }: Props) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const randomColor = useMemo(() => {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }, []);

  const handleCardClick = () => {
    navigate(`/dashboard/equipe/${equipe.id}`);
  };

  const handleDeleteEquipe = async () => {
    try {
      await deleteEquipe(equipe.id||"null");
      onDelete?.(); // Refresh parent list
    } catch (error) {
      console.error("Erreur lors de la suppression de l'équipe :", error);
      alert("Erreur lors de la suppression de l'équipe.");
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <>
      <Paper
        onClick={handleCardClick}
        elevation={3}
        sx={{
          width: 200,
          p: 2,
          position: 'relative',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f9fafb',
          cursor: 'pointer',
        }}
      >
        <IconButton
          size="small"
          sx={{ position: 'absolute', top: 4, right: 4 }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation
            setOpenDialog(true);  // Open dialog
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Avatar sx={{ bgcolor: randomColor, width: 56, height: 56, mb: 1 }}>
          {equipe.nom[0]?.toUpperCase()}
        </Avatar>
        <Typography variant="subtitle1" fontWeight={600} textAlign="center">
          {equipe.nom}
        </Typography>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer l'équipe "{equipe.nom}" ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Annuler
          </Button>
          <Button onClick={handleDeleteEquipe} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
