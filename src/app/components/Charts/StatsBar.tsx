import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RatingDistribution {
  [key: string]: number;
}

export function StatsBar() {
  const [ratingDistribution, setRatingDistribution] = useState<RatingDistribution | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchRatingDistribution = async () => {
      try {
        const response = await axios.get<{ ratingDistribution: RatingDistribution }>(
          `${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/getratingdistribution`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.ratingDistribution;
        setRatingDistribution(data);

        let totalRatings = 0;
        let totalSum = 0;
        for (const key in data) {
          totalRatings += data[key];
          totalSum += parseInt(key) * data[key];
        }
        setAverageRating(totalSum / totalRatings);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchRatingDistribution();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
      {/* Card para exibir a distribuição de classificações */}
      <Card className="col-span-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Distribuição de Classificações          </CardTitle>
          <CardDescription className="text-base font-medium">Média: {averageRating.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent>
          {ratingDistribution && (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={Object.entries(ratingDistribution)}>
                <XAxis dataKey="0" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="1" fill="#8884d8">
                  {Object.entries(ratingDistribution).map(([key, value], index) => (
                    <text
                      key={index}
                      x={index * 25 + 10}
                      y={220}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#000000"
                      fontSize={12}
                    >
                      {value}
                    </text>
                  ))}
                </Bar>

              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
