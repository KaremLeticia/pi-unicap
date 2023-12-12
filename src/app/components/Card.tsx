import React from 'react';

interface CardProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title }) => {

  return (
    <div className={`border-l-8 bg-white rounded-s-lg p-4 shadow-lg h-36 mb-4 w-full`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
    </div>
  );
};

export default Card;
