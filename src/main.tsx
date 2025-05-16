import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import LoginComponent from './sharedcomponents/login/loginComponent';
import RegisterComponent from './sharedcomponents/signup/registerComponent';
import NotFoundComponent from './sharedcomponents/NotFound/notFoundComponent';
import HomePage from './frontoffice/pages/home/homePage.tsx';
import Dashboard from './backoffice/pages/Dashboard/dashboard.tsx';
import Equipes from './backoffice/pages/Equipes/Equipes.tsx';
import RedirectIfLoggedIn from './Utils/RedirectIfLoggedIn.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import Projets from './frontoffice/pages/Projets/Projets.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <LoginComponent />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <RegisterComponent />
            </RedirectIfLoggedIn>
          }
        />

        {/* Member-protected routes */}
        <Route
          path="/front-office"
          element={
            <PrivateRoute role="Membre">
              <HomePage />
            </PrivateRoute>
          }
        >
          <Route path="projets" element={<Projets />} />
        </Route>

        {/* Admin-protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute role="Admin">
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="equipes" element={<Equipes />} />
        </Route>

        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
