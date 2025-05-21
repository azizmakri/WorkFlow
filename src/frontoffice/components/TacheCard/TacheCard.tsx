import './TacheCard.css';
import {
  Card,
  Typography,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Tache } from '../../../models/Tache';
import { commencerTache, terminerTache, deleteTache } from '../../../services/TacheService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


interface Props {
  tache: Tache;
  onUpdate: () => void; // Callback to refresh tasks
}

export default function TacheCard({ tache, onUpdate }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const getColor = () => {
    switch (tache.etat) {
      case 'AFAIRE': return '#f44336';
      case 'ENCOURS': return '#ff9800';
      case 'TERMINE': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.userName || '';

  const handleActionClick = async () => {
    if (tache.etat === 'AFAIRE') {
      await commencerTache(tache.id!, userId);
    } else if (tache.etat === 'ENCOURS' && tache.userId === userId) {
      await terminerTache(tache.id!);
    }
    onUpdate(); // Refresh the board
  };

  const handleDelete = async () => {
    await deleteTache(tache.id!);
    setOpenDialog(false);
    onUpdate(); // Refresh the board
  };

  const renderActionLabel = () => {
    if (tache.etat === 'AFAIRE') return 'Commencer';
    if (tache.etat === 'ENCOURS' && tache.userId === userId) return 'Terminer';
    return null;
  };

  return (
    <>
      <Card
        className="tache-card"
        sx={{
          position: 'relative',
          borderLeft: `5px solid ${getColor()}`,
          padding: 1.5,
          mb: 1.5,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {/* Delete Button (opens dialog) */}
        <IconButton
          size="small"
          onClick={() => setOpenDialog(true)}
          sx={{ position: 'absolute', top: 5, right: 5 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={600} 
            onClick={() => navigate(`/front-office/tache/${tache.id}`)} // ✅ Navigate
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {tache.titre}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {truncate(tache.description, 60)}
        </Typography>

        <Typography variant="caption">Limite: {tache.dateLimite}</Typography>

        {renderActionLabel() && (
          <Button
            size="small"
            variant="outlined"
            onClick={handleActionClick}
            style={{ marginLeft: '30px', marginTop: '8px' }}
          >
            {renderActionLabel()}
          </Button>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer cette tâche ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
