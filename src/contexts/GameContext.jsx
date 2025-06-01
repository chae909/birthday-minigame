import React, { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [currentStage, setCurrentStage] = useState(1);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentStage === 1) setProgress(0);
        else if (currentStage === 2) setProgress(50);
        else if (gameCompleted) setProgress(100);
    }, [currentStage, gameCompleted]);

    const nextStage = () => {
        setCurrentStage(prevStage => {
            const newStage = prevStage + 1;
            console.log(`Current Stage: ${prevStage} -> Next Stage: ${newStage}`);
            return newStage;
        });
    };

    const completeGame = () => {
        setGameCompleted(true);
        setCurrentStage(3);
    };

    const resetGame = () => {
        setCurrentStage(1);
        setGameCompleted(false);
        setProgress(0);
    };

    return (
        <GameContext.Provider
            value={{
                currentStage,
                setCurrentStage,
                gameCompleted,
                completeGame,
                nextStage,
                resetGame,
                progress,
                setProgress
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

// useGame ���� �� ���Ͽ��� �������� �ʰ�, ����ϴ� �ʿ��� ���� useContext(GameContext)�� ����մϴ�.
// export const useGame = () => {
//     return useContext(GameContext);
// };

// GameContext ��ü�� �������ϴ�.
export { GameContext };