import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

export default function LoginComponent() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f8f9fa"
    >
      <Card
        sx={{
          width: 380,
          padding: 3,
          borderRadius: '16px', // Rounded corners
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)', // Soft shadow
          background: 'white',
        }}
      >
        <CardContent>
          <Typography 
            variant="h5" 
            textAlign="center" 
            gutterBottom 
            fontWeight="bold"
            color="primary"
          >
             Bienvenue !
          </Typography>

          <Typography 
            textAlign="center" 
            color="textSecondary" 
            fontSize="14px" 
            marginBottom={2}
          >
            Connectez-vous pour continuer
          </Typography>

          <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField 
              label="📧 Email" 
              type="email" 
              fullWidth 
              required 
              variant="outlined"
              sx={{ borderRadius: '8px' }}
            />
            <TextField 
              label="👤 Nom" 
              fullWidth 
              required 
              variant="outlined"
            />
            <TextField 
              label="🔑 Mot de passe" 
              type="password" 
              fullWidth 
              required 
              variant="outlined"
            />

            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              sx={{
                borderRadius: '25px', // Rounded button
                textTransform: 'none', // Normal text style
                fontWeight: 'bold',
                padding: '10px',
              }}
            >
              💫 Se connecter
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
