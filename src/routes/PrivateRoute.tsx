import type { JSX } from '@emotion/react/jsx-runtime';
import { Navigate } from 'react-router-dom';
import { getUserRole, isAuthenticated } from '../Utils/authUtils';

interface Props {
  children: JSX.Element;
  role?: 'Admin' | 'Membre'; // optional role
}

export default function PrivateRoute({ children, role }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (role && getUserRole() !== role) {
    return <Navigate to="*" />; // or to /home or /dashboard depending
  }

  return children;
}
