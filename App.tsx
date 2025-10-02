import React, { useState, useCallback, useEffect } from 'react';
import type { GameState } from './types';
import { getGameStep } from './services/geminiService';
import Header from './components/Header';
import StoryDisplay from './components/StoryDisplay';
import ChoiceButtons from './components/ChoiceButtons';
import LoadingSpinner from './components/LoadingSpinner';

const INITIAL_GAME_STATE: GameState = {
  history: [],
  currentChoices: [],
  isGameOver: false,
  isStarted: false,
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGameUpdate = useCallback((prompt: string) => {
    setIsLoading(true);
    setError(null);
    getGameStep(prompt)
      .then(step => {
        setGameState(prevState => ({
          ...prevState,
          history: [...prevState.history, step.scene],
          currentChoices: step.choices,
          isGameOver: step.gameOver,
          isStarted: true,
        }));
      })
      .catch(err => {
        console.error(err);
        setError("Không thể tải phần tiếp theo của câu chuyện. Vui lòng kiểm tra kết nối hoặc khóa API của bạn.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleStartGame = () => {
    setGameState(INITIAL_GAME_STATE);
    handleGameUpdate("Bắt đầu trò chơi. Người chơi bị mất nước và tỉnh dậy trong một khung cảnh khô cằn, bí ẩn.");
  };

  const handleChoice = (choice: string) => {
    if (isLoading) return;
    const storyContext = `
      CÁC CẢNH TRƯỚC:
      ${gameState.history.join('\n---\n')}
      
      LỰA CHỌN CỦA NGƯỜI CHƠI: "${choice}"
      
      Tạo ra cảnh tiếp theo dựa trên lựa chọn này.
    `;
    handleGameUpdate(storyContext);
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center p-4 selection:bg-blue-500/30" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/10 border border-gray-700 overflow-hidden flex flex-col">
        <Header onRestart={handleStartGame} isStarted={gameState.isStarted} />
        <main className="p-6 md:p-8 flex-grow flex flex-col justify-center">
          {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">{error}</p>}
          
          {!gameState.isStarted && !isLoading && (
            <div className="text-center animate-fade-in">
              <p className="text-lg text-gray-400 mb-6">Cuộc phiêu lưu của bạn về tinh hoa của sự sống bắt đầu tại đây. Hãy đưa ra những lựa chọn định hình cuộc hành trình và khám phá những bí mật của nước.</p>
              <button
                onClick={handleStartGame}
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30"
              >
                Bắt đầu cuộc hành trình
              </button>
            </div>
          )}

          {gameState.isStarted && <StoryDisplay scenes={gameState.history} />}
          
          {isLoading && <LoadingSpinner />}
          
          {!isLoading && gameState.isStarted && !gameState.isGameOver && (
            <ChoiceButtons choices={gameState.currentChoices} onChoose={handleChoice} />
          )}

          {gameState.isGameOver && gameState.isStarted && !isLoading && (
             <div className="text-center mt-6 animate-fade-in">
                <p className="text-xl font-bold text-blue-300 mb-4" style={{fontFamily: "'Playfair Display', serif"}}>KẾT THÚC</p>
                <button
                    onClick={handleStartGame}
                    className="bg-gray-600 text-white font-bold py-2 px-6 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500/50 transition-all duration-300"
                >
                    Chơi Lại
                </button>
            </div>
          )}
        </main>
      </div>
       <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>Hỗ trợ bởi Gemini. Một cuộc phiêu lưu chữ đầy năng động.</p>
      </footer>
    </div>
  );
};

export default App;