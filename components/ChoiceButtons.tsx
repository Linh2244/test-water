
import React from 'react';

interface ChoiceButtonsProps {
  choices: string[];
  onChoose: (choice: string) => void;
}

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ choices, onChoose }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 animate-fade-in">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onChoose(choice)}
          className="w-full text-left bg-gray-700/50 border border-gray-600 text-gray-200 font-medium py-3 px-5 rounded-lg hover:bg-blue-500/20 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 transition-all duration-200 transform hover:scale-[1.02]"
        >
         <span className="text-blue-400 mr-2">{'>'}</span> {choice}
        </button>
      ))}
    </div>
  );
};

export default ChoiceButtons;
