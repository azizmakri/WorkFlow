import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NotFoundComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleReturn = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user?.role;

    if (role === 'Membre') {
      navigate('/front-office/projets');
    } else if (role === 'Admin') {
      navigate('/dashboard');
    } else {
      // Default fallback if role is unknown
      const from = location.state?.from || '/home';
      navigate(from);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f8f9fa"
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: '20px',
          maxWidth: 400,
          textAlign: 'center',
          background: 'white',
        }}
      >
        <Typography variant="h2" color="secondary" fontWeight="bold" gutterBottom>
          404 ⛓️‍💥​
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          Oups ! Cette page n'existe pas.
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Il semble que vous soyez perdu.
        </Typography>

        <Button variant="contained" color="secondary" onClick={handleReturn}>
          Revenir à l'accueil
        </Button>
      </Paper>
    </Box>
  );
}
