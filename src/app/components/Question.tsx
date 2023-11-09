import React, { useState } from 'react';
import Text from './Text';

interface QuestionProps {
  titles: string[];
  onSubmit: (responses: number[], comment: string) => void;
}

export default function Question({ titles, onSubmit }: QuestionProps) {
  const [responses, setResponses] = useState(titles.map(() => 0));
  const [comments, setComments] = useState('');

  const handleResponseChange = (index: number, value: number) => {
    setResponses((prevResponses) =>
      prevResponses.map((prevValue, i) => (i === index ? value : prevValue))
    );

    console.log(`Question ${index + 1}: ${value}`);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    onSubmit(responses, comments);
  
    setResponses(titles.map(() => 0));
    setComments('');
  
    console.log('Respostas:', responses);
    console.log('Comentário:', comments);
  };
  
  return (
    <form className="flex flex-col my-8" onSubmit={handleSubmit}>
      {titles.map((title: string, index: number) => (
        <div key={index}>
          <div className="flex mx-[30%] my-4">
            <Text size="2xl" fontFamily="sans" weight="semibold">
              {title}
            </Text>
          </div>

          <div className="flex justify-center items-center gap-8">
            {[5, 4, 3, 2, 1, 0].map((value) => (
              <label key={value}>
                {value}
                <input
                  className="flex flex-col"
                  type="radio"
                  name={`opcion_${index}`}
                  value={value}
                  checked={responses[index] === value}
                  onChange={() => handleResponseChange(index, value)}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <label className="block text-sm font-medium text-gray-700">Comentário:</label>
        <textarea
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder="Digite seu comentário aqui..."
          value={comments}
          onChange={handleCommentChange}
        ></textarea>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}
