import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-medium"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-slow"></div>
        <span className="ml-4 text-gray-400">Dòng chảy câu chuyện...</span>
      </div>
      <style>{`
        .animate-pulse-fast {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-medium {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 0.2s;
        }
        .animate-pulse-slow {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 0.4s;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;