import { Link, useLocation,useNavigate } from 'react-router-dom';
import './DashboardSidebar.css'; // optional: for external styling
import userImage from '../../../assets/user.jpg'; // adjust path as needed
import workflowImage from '../../../assets/workflow.png'; // adjust path as needed



export default function DashboardSidebar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user?.userName || 'User';
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', label: 'Tableau de bord' },
    { path: '/dashboard/equipes', label: 'equipes' },
    { path: '/orders', label: 'Orders' },
    { path: '/products', label: 'Products' },
    { path: '/customers', label: 'Customers' },
  ];

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark shadow"
      style={{
        width: 280,
        height: '100vh',
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px',
      }}
    >
      <Link
        to="/home"
        className="d-flex align-items-center mb-4 text-white text-decoration-none"
      >
        <img
          src={workflowImage}
          alt="Logo"
          width="38"
          height="32"
          className="me-2"
        />
        <span className="fs-4 fw-semibold">WorkFlow</span>
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        {navLinks.map((link) => (
          <li className="nav-item" key={link.path}>
            <Link
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active-link' : 'text-white'}`}

              style={{ borderRadius: '8px', marginBottom: '4px' }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <div className="dropdown mt-auto">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={userImage}
            alt="Profile"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />

          <strong>{userName}</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button className="dropdown-item" onClick={logout}>
              se déconnecter
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
