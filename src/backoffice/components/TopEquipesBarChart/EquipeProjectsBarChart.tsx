// src/components/Backoffice/EquipeProjectsBarChart.tsx
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts';
import { top5EquipesTermineProjects, getEquipeById } from '../../../services/EquipeService';

interface ChartData {
  nom: string;
  nbProjects: number;
}

const COLORS = ['#6366F1', '#3B82F6', '#06B6D4', '#10B981', '#84CC16'];

export default function EquipeProjectsBarChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const equipesStats = await top5EquipesTermineProjects();
      const enrichedData: ChartData[] = [];

      for (const e of equipesStats) {
        const equipe = await getEquipeById(e.equipeId);
        enrichedData.push({ nom: equipe.nom, nbProjects: e.nbProjects });
      }

      setData(enrichedData);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }} className="bg-white rounded-2xl p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Top 5 équipes par projets terminés</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 60, bottom: 20 }}
          barCategoryGap="20%"
        >
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.9} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" stroke="#9CA3AF" />
          <YAxis dataKey="nom" type="category" stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: 8 }}
            labelStyle={{ color: '#F9FAFB' }}
            itemStyle={{ color: '#D1D5DB' }}
            cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }}
          />
          <Bar dataKey="nbProjects" name="Projets terminés" radius={[10, 10, 10, 10]} fill="url(#colorBar)">
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
