import React, { useState, useEffect, useContext } from 'react'; // useContext 임포트
import { GameContext } from '../contexts/GameContext'; // GameContext 임포트
import useSound from '../hooks/useSound';
import clickSound from '../assets/sounds/click.mp3';
import completeSound from '../assets/sounds/success.mp3';
import styles from '../styles/BirthdayCakeGame.module.css';

// 케이크 이미지 경로 (실제 이미지 파일로 대체 필요)
import cake0 from '../assets/images/cake_step0.png'; // 빈 접시
import cake1 from '../assets/images/cake_step1.png'; // 밀가루
import cake2 from '../assets/images/cake_step2.png'; // 달걀
import cake3 from '../assets/images/cake_step3.png'; // 우유
import cake4 from '../assets/images/cake_step4.png'; // 설탕
import cake5 from '../assets/images/cake_step5.png'; // 구운 케이크
import cakeComplete from '../assets/images/cake_complete.jpg'; // 🎂 완성 이미지 추가

const cakeImages = [cake0, cake1, cake2, cake3, cake4, cake5];
const ingredients = ['밀가루', '달걀', '우유', '설탕', '굽기'];

const BirthdayCakeGame = () => {
    // useGame 훅 대신 직접 useContext 사용
    const { nextStage, setProgress, progress } = useContext(GameContext);
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false); // 🎂 완성 상태
    const playClickSound = useSound(clickSound);
    const playCompleteSound = useSound(completeSound);

    const handleIngredientClick = (step) => {
        if (currentStep === step) {
            playClickSound();
            setCurrentStep(prevStep => prevStep + 1);
            setProgress(prev => prev + (50 / ingredients.length));
        } else {
            alert(`"${ingredients[currentStep]}"를 먼저 클릭하세요!`);
        }
    };

    useEffect(() => {
        if (currentStep === ingredients.length) {
            setIsComplete(true); // 🎂 완성 상태로 변경
            playCompleteSound();
        }
    }, [currentStep, playCompleteSound]);

    const handleNextStage = () => {
        alert("1단계 완료!");
        setIsComplete(false);
        nextStage();
    };

    return (
        <div className={styles.cakeGameContainer}>
            <h2>생일 케이크 만들기</h2>
            <div className={styles.cakeDisplay}>
                <img
                    src={isComplete ? cakeComplete : cakeImages[currentStep]}
                    alt={`Cake Step ${currentStep}`}
                    className={styles.cakeImage}
                />
            </div>
            <div className={styles.ingredientButtons}>
                {ingredients.map((ingredient, index) => (
                    <button
                        key={ingredient}
                        onClick={() => handleIngredientClick(index)}
                        disabled={currentStep !== index || isComplete}
                        className={`${styles.ingredientButton} ${currentStep > index ? styles.completed : ''}`}
                    >
                        {ingredient}
                    </button>
                ))}
            </div>
            {isComplete && (
                <div className={styles.completeSection}>
                    <p className={styles.message}>케이크가 완성되었습니다!</p>
                    <button className={styles.nextStageButton} onClick={handleNextStage}>
                        다음 단계로
                    </button>
                </div>
            )}
        </div>
    );
};

export default BirthdayCakeGame;