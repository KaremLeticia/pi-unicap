import React from 'react';
import { Bar } from 'react-chartjs-2';

interface HorizontalBarProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

const HorizontalBar: React.FC<HorizontalBarProps> = ({ data }) => {
  return <Bar data={data} />;
};

export default HorizontalBar;
