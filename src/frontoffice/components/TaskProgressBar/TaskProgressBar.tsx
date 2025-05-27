// src/components/AnalyticsSection/TaskProgressBar.tsx
import React from 'react';
import './TaskProgressBar.css';

interface Props {
  termine: number;
  enCours: number;
  total: number;
}

export default function TaskProgressBar({ termine, enCours, total }: Props) {
  const enAttente = total - (termine + enCours);

  const getPercentage = (count: number) =>
    total > 0 ? Math.round((count / total) * 100) : 0;

  const terminePct = getPercentage(termine);
  const enCoursPct = getPercentage(enCours);
  const enAttentePct = getPercentage(enAttente);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-segment termine"
        style={{ width: `${terminePct}%` }}
        title={`Terminées: ${terminePct}%`}
      />
      <div
        className="progress-segment encours"
        style={{ width: `${enCoursPct}%` }}
        title={`En cours: ${enCoursPct}%`}
      />
      <div
        className="progress-segment enattente"
        style={{ width: `${enAttentePct}%` }}
        title={`En attente: ${enAttentePct}%`}
      />
    </div>
  );
}
