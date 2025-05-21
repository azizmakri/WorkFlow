// components/CommentSection.tsx
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Avatar
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Commentaire } from '../../../models/Commentaire';
import { addComment, getCommentsByTache } from '../../../services/CommentaireService';

export default function CommentSection() {
  const [comment, setComment] = useState('');
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const { id: tacheId } = useParams<{ id: string }>();

  // Correct user retrieval
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.userName || '';

  useEffect(() => {
    const fetchCommentaires = async () => {
      if (!tacheId) return;
      const data = await getCommentsByTache(tacheId);
      setCommentaires(data);
    };
    fetchCommentaires();
  }, [tacheId]);

  const handleAddComment = async () => {
    if (!comment.trim() || !tacheId || !userId) return;

    const newComment = await addComment(tacheId, userId, comment);
    setCommentaires((prev) => [...prev, newComment]);
    setComment('');
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2e2e38' }}>
        Commentaires
      </Typography>
      <Paper
        elevation={0}
        sx={{
          maxHeight: '300px',
          overflowY: 'auto',
          p: 2,
          backgroundColor: '#fff',
          borderRadius: 2,
          mb: 2,
        }}
      >
        {commentaires.map((comment, index) => (
          <Paper
            key={comment.id ?? index}
            elevation={1}
            sx={{ p: 2, mb: 2, backgroundColor: '#f3f4f6', borderRadius: 2 }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Avatar sx={{ width: 24, height: 24, bgcolor: '#5c6ac4', fontSize: '0.75rem' }}>
                {comment.userId[0]?.toUpperCase()}
              </Avatar>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {comment.userId}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#4e4e5c' }}>
              {comment.contenu}
            </Typography>
          </Paper>
        ))}
      </Paper>

      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          multiline
          placeholder="Ajouter un commentaire..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" onClick={handleAddComment} sx={{ bgcolor: '#5c6ac4' }}>
          Envoyer
        </Button>
      </Box>
    </Box>
  );
}
