import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTacheById } from '../../../services/TacheService';
import { getUserById } from '../../../services/authService';
import type { Tache } from '../../../models/Tache';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Chip,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CommentSection from '../../components/CommentSection/CommentSection';

export default function DetaillesTache() {
  const { id } = useParams<{ id: string }>();
  const [tache, setTache] = useState<Tache | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTache = async () => {
      try {
        if (!id) return;
        const fetchedTache = await getTacheById(id);
        setTache(fetchedTache);

        if (fetchedTache.userId) {
          const user = await getUserById(fetchedTache.userId);
          setUserName(user.userName);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la tâche :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTache();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!tache) {
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h6" color="error">Tâche non trouvée</Typography>
      </Box>
    );
  }

  const etatColor = {
    AFAIRE: 'error',
    ENCOURS: 'warning',
    TERMINE: 'success',
  }[tache.etat || ''] || 'default';

  return (
    <Box px={4} pt={5}  mx="0px">
      <Paper elevation={0} sx={{ backgroundColor: '#f9f9fc', p: 3, borderRadius: 2 }}>
        <Card sx={{ borderLeft: `6px solid`, borderColor: etatColor, boxShadow: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              display="flex"
              alignItems="center"
              sx={{ fontWeight: 600, color: '#2e2e38' }}
            >
              <AssignmentIcon sx={{ mr: 1, color: '#5c6ac4' }} />
              {tache.titre}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ mb: 2, color: '#4e4e5c' }}>
              <strong>Description :</strong> {tache.description}
            </Typography>

            <Box display="flex" flexDirection="column" gap={1} sx={{ color: '#616161' }}>
              <Box display="flex" alignItems="center" gap={1}>
                <EventIcon fontSize="small" sx={{ color: '#7e57c2' }} />
                <Typography variant="body2">
                  <strong>Date limite :</strong> {tache.dateLimite}
                </Typography>
              </Box>

              {tache.dateDebut && (
                <Typography variant="body2">
                  <strong>Date de début :</strong> {tache.dateDebut}
                </Typography>
              )}

              {tache.dateFin && (
                <Typography variant="body2">
                  <strong>Date de fin :</strong> {tache.dateFin}
                </Typography>
              )}

              {userName && (
                <Typography variant="body2" display="flex" alignItems="center" gap={1}>
                  <PersonIcon fontSize="small" sx={{ color: '#42a5f5' }} />
                  <strong>Responsable :</strong> {userName}
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Chip
              label={`État : ${tache.etat}`}
              color={etatColor as any}
              variant="outlined"
              sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}
            />
          </CardContent>
        </Card>
      </Paper>
      <CommentSection />
    </Box>
  );
}
