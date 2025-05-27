// components/create-equipe-card/CreateEquipe.tsx
import {
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
  Checkbox,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { User } from '../../../models/User';
import { getAllUsers } from '../../../services/authService';
import { createEquipe } from '../../../services/EquipeService';

interface Props {
  onEquipeCreated?: () => void;
}

export default function CreateEquipe({ onEquipeCreated }: Props) {
  const [nom, setNom] = useState('');
  const [userIds, setUserIds] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEquipe({ nom, userIds });
    setNom('');
    setUserIds([]);
    onEquipeCreated?.(); // reload list
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        margin: 'auto',
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" mb={2}>
        Créer une Équipe
      </Typography>

      <TextField
        fullWidth
        label="Nom de l'équipe"
        variant="outlined"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        margin="normal"
        required
      />

      <Autocomplete
        multiple
        disableCloseOnSelect
        options={users}
        getOptionLabel={(user) => `${user.userFirstName} ${user.userLastName} (${user.userName})`}
        value={users.filter((user) => userIds.includes(user.userName))}
        onChange={(_, selectedUsers) => {
          setUserIds(selectedUsers.map((user) => user.userName));
        }}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <li key={key} {...rest}>
              <Checkbox
                style={{ marginRight: 8 }}
                checked={userIds.includes(option.userName)}
              />
              {option.userFirstName} {option.userLastName}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Utilisateurs" placeholder="Rechercher par nom d'utilisateur" />
        )}
        sx={{ mt: 2 }}
      />

      <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
        Créer l'équipe
      </Button>
    </Box>
  );
}
