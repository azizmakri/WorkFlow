import React from 'react';
import EquipeProjectsBarChart from '../../components/TopEquipesBarChart/EquipeProjectsBarChart';
import ProjectStatusPieChart from '../../components/ProjectStatusPieChart/ProjectStatusPieChart';

export default function Analytiques() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">📊 Tableau de bord</h1>
        <EquipeProjectsBarChart />
        <ProjectStatusPieChart />
    </div>
  );
}
