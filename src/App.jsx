import React, { useContext } from 'react'; // useContext 임포트
import { GameProvider, GameContext } from './contexts/GameContext'; // GameContext 임포트
import BirthdayCakeGame from './games/BirthdayCakeGame';
import GiftHuntGame from './games/GiftHuntGame';
import ProgressBar from './components/ProgressBar';
import ParticleEffect from './components/ParticleEffect';
import styles from './styles/App.module.css';

const GameContainer = () => {
    const { currentStage, gameCompleted, resetGame, progress } = useContext(GameContext);

    if (gameCompleted) {
        return (
            <div className={styles.finalCelebration}>
                <ParticleEffect />
                <h2>생일 진심으로 축하해!! 🎉</h2>
                <p>사랑해 많이(●'◡'●)</p>
                <button onClick={resetGame} className={styles.resetButton}>
                    다시 시작
                </button>
            </div>
        );
    }

    // 게임 중일 때만 게임 UI 렌더링
    return (
        <div className={styles.gameWrapper}>
            <ProgressBar progress={progress} />
            <ParticleEffect />
            {currentStage === 1 && <BirthdayCakeGame />}
            {currentStage === 2 && <GiftHuntGame />}
        </div>
    );
};

function App() {
    return (
        <GameProvider>
            <GameContainer />
        </GameProvider>
    );
}

export default App;