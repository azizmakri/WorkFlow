import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { registerUser } from '../../services/authService';
import type { User } from '../../models/User';

export default function RegisterComponent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    userName: '',
    userLastName: '',
    userFirstName: '',
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie!',
        text: response.message || 'Bienvenue chez nous 😊',
        confirmButtonText: 'Se connecter',
      }).then(() => {
        navigate('/login');
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.response?.data || 'Erreur lors de l’inscription.',
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
            créer un compte
          </Typography>

          <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit}>
            <TextField label="👤 Nom d'utilisateur" name="userName" value={formData.userName} onChange={handleChange} required fullWidth />
            <TextField label="👤 Nom" name="userLastName" value={formData.userLastName} onChange={handleChange} required fullWidth />
            <TextField label="👤 Prenom" name="userFirstName" value={formData.userFirstName} onChange={handleChange} required fullWidth />
            <TextField label="📧 Email" name="userEmail" type="email" value={formData.userEmail} onChange={handleChange} required fullWidth />
            <TextField label="🔑 Mot de passe" name="userPassword" type="password" value={formData.userPassword} onChange={handleChange} required fullWidth />

            <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ borderRadius: '25px', textTransform: 'none', fontWeight: 'bold', padding: '10px' }}>
              💫 Enregistrer
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
