import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAllUsersNotInEquipe, getEquipeById, removeUserFromEquipe } from '../../../services/EquipeService';
import { getUserById} from '../../../services/authService';
import { getProjectById } from '../../../services/ProjectService';
import { addUserToEquipe } from '../../../services/EquipeService';
import type { Equipe } from '../../../models/Equipe';
import type { User } from '../../../models/User';
import type { Project } from '../../../models/Project';

export default function EquipeDetailles() {
  const { id } = useParams();
  const [equipe, setEquipe] = useState<Equipe | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [usersNotInEquipe, setUsersNotInEquipe] = useState<User[]>([]);

  const fetchData = async () => {
    if (!id) return;
    const data = await getEquipeById(id);
    setEquipe(data);

    const userData = await Promise.all(data.userIds.map((uid) => getUserById(uid)));
    setUsers(userData);

    if (data.projetIds) {
      const projectData = await Promise.all(data.projetIds.map((pid) => getProjectById(pid)));
      setProjects(projectData);
    }

    const otherUsers = await getAllUsersNotInEquipe(id);
    setUsersNotInEquipe(otherUsers);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleRemoveUser = async (userName: string) => {
    if (!id) return;
    await removeUserFromEquipe(id, userName);
    fetchData();
  };

  const handleAddUser = async (userName: string) => {
    if (!id) return;
    await addUserToEquipe(id, userName);
    fetchData();
  };

  if (!equipe) return null;

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3} fontWeight={600}>
        Équipe: {equipe.nom}
      </Typography>

      {/* Utilisateurs Section */}
      <Typography variant="h6" gutterBottom>
        Utilisateurs
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
        {users.map((user) => (
          <Paper
            key={user.userName}
            sx={{
              p: 2,
              minWidth: 160,
              position: 'relative',
              textAlign: 'center',
              borderRadius: 2,
              flexShrink: 0,
            }}
            elevation={2}
          >
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 4, right: 4 }}
              onClick={() => handleRemoveUser(user.userName)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48, margin: 'auto' }}>
              {user.userName[0]?.toUpperCase()}
            </Avatar>
            <Typography mt={1} fontWeight={500}>
              {user.userName}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Projets Section */}
      <Typography variant="h6" gutterBottom>
        Projets
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
        {projects.map((project) => (
          <Paper
            key={project.id}
            sx={{
              p: 2,
              minWidth: 160,
              textAlign: 'center',
              borderRadius: 2,
              flexShrink: 0,
            }}
            elevation={2}
          >
            <Avatar sx={{ bgcolor: '#4caf50', width: 48, height: 48, margin: 'auto' }}>
              {project.titre[0]?.toUpperCase()}
            </Avatar>
            <Typography mt={1} fontWeight={500}>
              {project.titre}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Users not in equipe */}
      <Typography variant="h6" gutterBottom>
        Ajouter un utilisateur
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
        {usersNotInEquipe.map((user) => (
          <Paper
            key={user.userName}
            sx={{
              p: 2,
              minWidth: 160,
              position: 'relative',
              textAlign: 'center',
              borderRadius: 2,
              flexShrink: 0,
            }}
            elevation={2}
          >
            <IconButton
              size="small"
              color="success"
              sx={{ position: 'absolute', top: 4, right: 4 }}
              onClick={() => handleAddUser(user.userName)}
            >
              <AddCircleIcon fontSize="small" />
            </IconButton>
            <Avatar sx={{ bgcolor: '#9ccc65', width: 48, height: 48, margin: 'auto' }}>
              {user.userName[0]?.toUpperCase()}
            </Avatar>
            <Typography mt={1} fontWeight={500}>
              {user.userName}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
