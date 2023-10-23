"use client"
import React, { useState } from 'react';
import Text from './Text';

export default function Question({ titles }: any) {
  // Create a state to track the user's responses
  const [responses, setResponses] = useState(titles.map(() => 0));

  // Function to handle changes to the user's responses
  const handleResponseChange = (index: number, value: number) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);

    // Log the value being saved
    console.log(`Question ${index + 1}: ${value}`);
  };

  return (
    <div className="flex flex-col my-8">
      {titles.map((title: any, index: any) => (
        <div key={index}>
          <div className="flex mx-[30%] my-4">
            <Text size="2xl" fontFamily="sans" weight="semibold">
              {title}
            </Text>
          </div>

          <form className="flex justify-center items-center gap-8">
            {[0, 1, 2, 3, 4, 5].map((value) => (
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
          </form>
        </div>
      ))}
    </div>
  );
}
