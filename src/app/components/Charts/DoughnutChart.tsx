import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface DoughnutChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  return <Doughnut data={data} />;
};

export default DoughnutChart;
