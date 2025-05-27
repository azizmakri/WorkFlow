// src/components/AnalyticsSection/AnalyticsSection.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getNumberOfTermineTachesByProject,
  getNumberOfEnCoursTachesByProject,
  getTotalNumberOfTachesByProject,
} from '../../../services/TacheService';
import TaskProgressBar from '../TaskProgressBar/TaskProgressBar';

export default function AnalyticsSection() {
  const { id } = useParams<{ id: string }>();
  const [termine, setTermine] = useState(0);
  const [enCours, setEnCours] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const [termineRes, enCoursRes, totalRes] = await Promise.all([
          getNumberOfTermineTachesByProject(id),
          getNumberOfEnCoursTachesByProject(id),
          getTotalNumberOfTachesByProject(id),
        ]);
        setTermine(termineRes);
        setEnCours(enCoursRes);
        setTotal(totalRes);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Analyse des tâches</h2>
      <TaskProgressBar termine={termine} enCours={enCours} total={total} />
      <p>Total : {total} tâches</p>
      <p>Terminées : {termine}</p>
      <p>En cours : {enCours}</p>
      <p>En attente : {total - (termine + enCours)}</p>
    </div>
  );
}
