import { Link, useLocation,useNavigate } from 'react-router-dom';
import './FrontSidebar.css';
import userImage from '../../../assets/user.jpg'; // adjust path as needed



export default function FrontSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user?.userName || 'User';
  const navLinks = [
    { path: '/front-office/projets', label: 'Projets' },
    { path: '/dashboard', label: 'Dashboard' },
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
      }}
    >
      <Link
        to="/front-office/projets"
        className="d-flex align-items-center mb-4 text-dark text-decoration-none"
      >
        <img
          src="https://img.icons8.com/fluency/48/dashboard-layout.png"
          alt="Logo"
          width="32"
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
              className={`nav-link ${
                location.pathname === link.path ? 'active-link' : 'text-dark'
              }`}
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
          className="dropdown-menu dropdown-menu-light text-small shadow"
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
