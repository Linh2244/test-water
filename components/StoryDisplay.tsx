
import React, { useEffect, useRef } from 'react';

interface StoryDisplayProps {
  scenes: string[];
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ scenes }) => {
  const latestSceneRef = useRef<HTMLDivElement | null>(null);
  const currentScene = scenes[scenes.length - 1] || '';

  useEffect(() => {
    if (latestSceneRef.current) {
      latestSceneRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [scenes]);

  return (
    <div className="space-y-4 text-gray-300 leading-relaxed text-lg mb-6">
        {scenes.slice(0, -1).map((scene, index) => (
             <p key={index} className="opacity-50 border-l-2 border-gray-700 pl-4 text-base italic">
                {scene}
            </p>
        ))}
        {currentScene && (
             <div ref={latestSceneRef} className="animate-fade-in" key={scenes.length -1}>
                 <p>{currentScene}</p>
            </div>
        )}
    </div>
  );
};

// Simple fade-in animation for Tailwind
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.7s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default StoryDisplay;
