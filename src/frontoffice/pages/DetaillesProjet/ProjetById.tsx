import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  ListItemIcon,
  Dialog,
} from '@mui/material';
import { Delete, Edit, Settings } from '@mui/icons-material';
import './ProjetById.css';
import type { Project } from '../../../models/Project';
import { getProjectById, deleteProjet } from '../../../services/ProjectService';
import { getEquipeById } from '../../../services/EquipeService';
import BoardSection from '../../components/BoardSection/BoardSection';
import UpdateProjectDialog from '../../components/EditProjectDialog/UpdateProjectDialog';
import AnalyticsSection from '../../components/AnalyticsSection/AnalyticsSection';

export default function ProjectById() {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [equipeName, setEquipeName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'board' | 'analytics'>('board');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmDelete = async () => {
    if (id) {
      await deleteProjet(id);
      setOpenDialog(false);
      navigate('/front-office/projets');
    }
  };

  const fetchProjectAndEquipe = async () => {
    if (id) {
      const proj = await getProjectById(id);
      setProject(proj);
      if (proj.equipeId) {
        const equipe = await getEquipeById(proj.equipeId);
        setEquipeName(equipe.nom);
      }
    }
  };

  useEffect(() => {
    fetchProjectAndEquipe();
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <p className="equipe-titre">
        {project?.titre ? `Projet : ${project.titre}` : 'Chargement du titre...'}
      </p>
      <p className="equipe-description">
        {project?.description ?? 'Chargement de la description...'}
      </p>

      {/* Navigation Tabs */}
      <div className="tabs" style={{ display: 'flex', alignItems: 'center' }}>
        <button
          className={activeTab === 'board' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('board')}
        >
          Tableau
        </button>
        <button
          className={activeTab === 'analytics' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('analytics')}
        >
          Analytique
        </button>

        {/* Gear Dropdown */}
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            position: 'sticky',
            right: '50px',
            color: '#333',
            backgroundColor: '#f5f5f5',
            '&:hover': { backgroundColor: '#e0e0e0' },
          }}
        >
          <Settings />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              setOpenDialog(true);
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <Delete fontSize="small" sx={{ color: 'red' }} />
            </ListItemIcon>
            <Typography color="red">Supprimer</Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              setOpenUpdateDialog(true);
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <Typography>Modifier</Typography>
          </MenuItem>
        </Menu>
      </div>

      {/* Board or Analytics View */}
      {activeTab === 'board' && <BoardSection />}
      {activeTab === 'analytics' && <AnalyticsSection />}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div style={{ padding: '20px 24px', minWidth: '320px' }}>
          <Typography variant="h6" gutterBottom>
            Confirmation
          </Typography>
          <Typography variant="body1" gutterBottom>
            Êtes-vous sûr de vouloir supprimer ce projet ?
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 20,
            }}
          >
            <button
              onClick={() => setOpenDialog(false)}
              style={{
                padding: '6px 12px',
                marginRight: 10,
                backgroundColor: '#eee',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Annuler
            </button>
            <button
              onClick={handleConfirmDelete}
              style={{
                padding: '6px 12px',
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      </Dialog>

      {/* Update Project Dialog */}
      {project && id && (
        <UpdateProjectDialog
          open={openUpdateDialog}
          onClose={() => {
            setOpenUpdateDialog(false);
            fetchProjectAndEquipe(); // Refresh project after update
          }}
          initialProject={project}
          projectId={id}
        />
      )}
    </div>
  );
}
