import React from 'react';

interface CardProps {
  title: string;
  description: string;
  status: 'feito' | 'incompleto' | 'pendente' | string;
}

const Card: React.FC<CardProps> = ({ title, description, status }) => {
  let bg = '';


  if (status === 'feito') {
    bg = 'bg-green-500';
  } else if (status === 'pendente') {
    bg = 'bg-orange-500';
  } else if (status === 'incompleto') {
    bg = 'bg-purple-500';
  }

  return (
    <div className={`border-l-8 bg-white rounded-s-lg p-4 shadow-lg h-36 mb-4 w-full`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2 text-sm">{description}</p>
      <button className={`${bg} text-white text-xs uppercase rounded-full px-4 py-2`}>
        {status}
      </button>
    </div>
  );
};

export default Card;
