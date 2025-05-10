import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUser } from '../../services/authService';

export default function LoginComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userName: '',
    userPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);

      const { jwtToken, user } = response;
      const role = user.role;

      // Store token and user data in localStorage
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (role === 'Membre') {
        navigate('/home');
      } else if (role === 'Admin') {
        navigate('/dashboard');
      } else {
        Swal.fire('Rôle inconnu', 'Contactez un administrateur.', 'warning');
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: error.response?.data || 'Email ou mot de passe incorrect.',
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f8f9fa">
      <Card sx={{ width: 380, padding: 3, borderRadius: '16px', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)', background: 'white' }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom fontWeight="bold" color="primary">
            Bienvenue !
          </Typography>
          <Typography textAlign="center" color="textSecondary" fontSize="14px" marginBottom={2}>
            Connectez-vous pour continuer
          </Typography>

          <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleLogin}>
            <TextField
              label="📧 Nom d'utilisateur"
              name="userName"
              value={credentials.userName}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="🔑 Mot de passe"
              name="userPassword"
              type="password"
              value={credentials.userPassword}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ borderRadius: '25px', textTransform: 'none', fontWeight: 'bold', padding: '10px' }}>
              💫 Se connecter
            </Button>
          </Box>

          <Typography textAlign="center" mt={3} fontSize="14px" color="text.secondary">
            Vous n'avez pas de compte ?{' '}
            <Link component="button" variant="body2" onClick={() => navigate('/register')} sx={{ fontWeight: 'bold' }}>
              Créez-en un
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
