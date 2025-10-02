import React from 'react';

interface HeaderProps {
  onRestart: () => void;
  isStarted: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRestart, isStarted }) => {
  return (
    <header className="bg-gray-900/70 p-4 border-b border-gray-700 flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300" style={{fontFamily: "'Playfair Display', serif"}}>
        Hành Trình Của Nước
      </h1>
      {isStarted && (
         <button
            onClick={onRestart}
            className="text-sm bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Bắt đầu lại
        </button>
      )}
    </header>
  );
};

export default Header;