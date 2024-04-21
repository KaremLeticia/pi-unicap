"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import colors from 'tailwindcss/colors';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from 'recharts';

interface ChartData {
  date: string;
  revenue: number;
}

export function RevenueChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchRatingByDay = async () => {
      try {
        const response = await axios.get<{ ratingCountByDay: Record<string, number> }>(
          `${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/getratingbyday`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const formattedData: ChartData[] = Object.entries(response.data.ratingCountByDay).map(([date, count]) => ({
          date: new Date(date).toLocaleDateString('pt-BR'),
          revenue: count,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchRatingByDay();
  }, []);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Avaliações por dia
          </CardTitle>
          <CardDescription>Receita diária de avaliações</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value) => value.toLocaleString('pt-BR')}
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet['500']}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
