import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './FrontSidebar.css';
import userImage from '../../../assets/user.jpg';
import workflowImage from '../../../assets/workflow.png';
import { getEquipesByUser } from '../../../services/EquipeService'; // Import the service
import type { Equipe } from '../../../models/Equipe';

export default function FrontSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [equipesOpen, setEquipesOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user?.userName || 'User';

  const fetchEquipes = async () => {
    if (!equipesOpen && userName) {
      try {
        const data = await getEquipesByUser(userName);
        setEquipes(data);
      } catch (error) {
        console.error('Erreur de récupération des équipes:', error);
      }
    }
    setEquipesOpen(!equipesOpen);
  };

  const navLinks = [
    { path: '/front-office/projets', label: 'Projets' },
    { path: '/orders', label: 'Orders' },
    { path: '/products', label: 'Products' },
    { path: '/customers', label: 'Customers' },
  ];

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-4"
      style={{
        width: 280,
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #dee2e6',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.03)',
        position: 'sticky',
        top: 0,
      }}
    >
      <Link to="/front-office/projets" className="d-flex align-items-center mb-4 text-dark text-decoration-none">
        <img src={workflowImage} alt="Logo" width="38" height="32" className="me-2" />
        <span className="fs-4 fw-semibold">WorkFlow</span>
      </Link>

      <ul className="nav nav-pills flex-column mb-auto">
  {/* Projets */}
  <li className="nav-item">
    <Link
      to="/front-office/projets"
      className={`nav-link ${location.pathname === '/front-office/projets' ? 'active-link' : 'text-dark'}`}
      style={{
        borderRadius: '8px',
        padding: '10px 15px',
        marginBottom: '6px',
        fontWeight: 500,
      }}
    >
      Projets
    </Link>
  </li>

  {/* Collapsible Équipes */}
  <li className="nav-item">
    <button
      onClick={fetchEquipes}
      className="nav-link text-dark d-flex align-items-center"
      style={{
        borderRadius: '8px',
        padding: '10px 15px',
        marginBottom: equipesOpen && equipes.length > 0 ? '0' : '6px',
        fontWeight: 500,
        backgroundColor: equipesOpen ? '#e1bee7' : 'transparent',
        width: '100%',
        textAlign: 'left',
      }}
    >
      <i
        className={`bi me-2 ${equipesOpen ? 'bi-caret-down-fill' : 'bi-caret-right-fill'}`}
        style={{ transition: 'transform 0.2s ease-in-out' }}
      ></i>
      Équipes
    </button>

    {equipesOpen && (
      <ul className="nav flex-column ms-3">
        {equipes.map((equipe) => (
          <li key={equipe.id} className="nav-item">
            <span
              className="nav-link text-dark"
              style={{
                borderRadius: '8px',
                padding: '10px 15px',
                marginBottom: '6px',
                fontWeight: 500,
              }}
            >
              {equipe.nom}
            </span>
          </li>
        ))}
      </ul>
    )}
  </li>

  {/* Other links */}
  {navLinks
    .filter(link => link.path !== '/front-office/projets') // Skip Projets to avoid duplicate
    .map((link) => (
      <li className="nav-item" key={link.path}>
        <Link
          to={link.path}
          className={`nav-link ${location.pathname === link.path ? 'active-link' : 'text-dark'}`}
          style={{
            borderRadius: '8px',
            padding: '10px 15px',
            marginBottom: '6px',
            fontWeight: 500,
          }}
        >
          {link.label}
        </Link>
      </li>
    ))}
</ul>


      <div className="dropdown mt-auto">
        <a
          href="#"
          className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={userImage} alt="Profile" width="32" height="32" className="rounded-circle me-2" />
          <strong>{userName}</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-light text-small shadow" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button className="dropdown-item" onClick={logout}>
              Se déconnecter
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
