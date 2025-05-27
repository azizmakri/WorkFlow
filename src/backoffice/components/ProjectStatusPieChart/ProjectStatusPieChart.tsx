import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  getNumberOfEnAttenteProjects,
  getNumberOfEnCoursProjects,
  getNumberOfTermineProjects
} from '../../../services/ProjectService'; // adjust this path as needed

const COLORS = ['#F59E0B', '#3B82F6', '#10B981']; // Yellow, Blue, Green

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central">
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function ProjectStatusPieChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [enAttente, enCours, termine] = await Promise.all([
        getNumberOfEnAttenteProjects(),
        getNumberOfEnCoursProjects(),
        getNumberOfTermineProjects()
      ]);

      setData([
        { name: 'En Attente', value: enAttente },
        { name: 'En Cours', value: enCours },
        { name: 'Terminé', value: termine }
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Répartition des projets</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
