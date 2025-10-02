
export interface GameStep {
  scene: string;
  choices: string[];
  gameOver: boolean;
}

export interface GameState {
  history: string[];
  currentChoices: string[];
  isGameOver: boolean;
  isStarted: boolean;
}
