import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './authUtils';
import type { JSX } from '@emotion/react/jsx-runtime';

interface Props {
  children: JSX.Element;
}

export default function RedirectIfLoggedIn({ children }: Props) {
  return isAuthenticated() ? <Navigate to="/home" /> : children;
}
