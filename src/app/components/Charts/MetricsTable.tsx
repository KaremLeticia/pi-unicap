import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RatingMetrics {
  averageScore: number;
  scoreDistribution: Record<string, number>;
  percentageByScore: Record<string, number>;
}

interface RatingMetricsBySentence {
  [sentence: string]: RatingMetrics;
}

export function MetricsTable() {
  const [ratingMetrics, setRatingMetrics] = useState<RatingMetricsBySentence | null>(null);

  useEffect(() => {
    const fetchRatingMetrics = async () => {
      try {
        const response = await axios.get<{ ratingMetricsBySentence: RatingMetricsBySentence }>(
          `${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/getratingmetrics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRatingMetrics(response.data.ratingMetricsBySentence);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchRatingMetrics();
  }, []);

  const formatScoreDistribution = (distribution: Record<string, number>) => {
    return Object.entries(distribution)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  };

  const formatPercentageByScore = (percentage: Record<string, number>) => {
    return Object.entries(percentage)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pergunta</TableHead>
          <TableHead>Média</TableHead>
          {/* <TableHead>Score Distribution</TableHead>
          <TableHead>Percentage By Score</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {ratingMetrics &&
          Object.entries(ratingMetrics).map(([metric, data]) => (
            <TableRow key={metric}>
              <TableCell className="font-medium">{metric}</TableCell>
              <TableCell>{data.averageScore.toFixed(2)}</TableCell>
              {/* <TableCell>{formatScoreDistribution(data.scoreDistribution)}</TableCell>
              <TableCell>{formatPercentageByScore(data.percentageByScore)}</TableCell> */}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
