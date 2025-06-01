import React, { useState, useEffect, useCallback, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import useSound from '../hooks/useSound';
import clickSound from '../assets/sounds/click.mp3';
import findSound from '../assets/sounds/success.mp3';
import styles from '../styles/GiftHuntGame.module.css';

// 선물 상자 이미지 (실제 이미지 파일로 대체 필요)
import giftBoxClosed from '../assets/images/gift_closed.png';
import giftBoxOpen1 from '../assets/images/gift_open1.jpg';
import giftBoxOpen2 from '../assets/images/gift_open2.jpg';
import giftBoxOpen3 from '../assets/images/gift_open3.jpg';

const NUM_GIFTS = 3;

const openGiftImages = [giftBoxOpen1, giftBoxOpen2, giftBoxOpen3];

const GiftHuntGame = () => {
    const { setGameCompleted, setProgress, completeGame } = useContext(GameContext);
    const [gifts, setGifts] = useState([]);
    const [foundCount, setFoundCount] = useState(0);
    const [openedGiftImage, setOpenedGiftImage] = useState(null);
    const [showOpenedImage, setShowOpenedImage] = useState(false);
    const playClickSound = useSound(clickSound);
    const playFindSound = useSound(findSound);

    // 선물 초기화 로직은 컴포넌트가 마운트될 때 한 번만 실행되어야 합니다.
    // StrictMode에서 두 번 호출되는 것을 막기 위해 이펙트 내에서 안전하게 처리하거나,
    // 초기 렌더링 시에만 실행되도록 조정할 수 있습니다.
    const initializeGifts = useCallback(() => {
        const newGifts = [];
        for (let i = 0; i < NUM_GIFTS; i++) {
            newGifts.push({
                id: i,
                found: false,
                top: `${Math.random() * 70 + 10}%`,
                left: `${Math.random() * 70 + 10}%`,
                obstacleClass: styles[`obstacle${Math.floor(Math.random() * 3) + 1}`],
                openImage: openGiftImages[i % openGiftImages.length], // 각 선물마다 다른 이미지 할당
            });
        }
        setGifts(newGifts);
        setFoundCount(0);
        setProgress(50);
        console.log("선물 초기화 완료!"); // 디버깅용
    }, [setProgress]); // setProgress가 의존성 배열에 있어야 합니다.

    useEffect(() => {
        initializeGifts();
        // 클린업 함수는 필요 없을 수 있지만, StrictMode에서 두 번 초기화 방지 목적이라면
        // 컴포넌트 언마운트 시 추가적인 리소스 해제 등을 고려할 수 있습니다.
        // 현재 로직에서는 두 번 호출되어도 큰 문제는 없지만, 불필요한 재설정을 막을 수 있습니다.
        return () => {
            // 이펙트가 다시 실행되거나 컴포넌트 언마운트될 때 실행됩니다.
            // 필요하다면 여기서 정리 작업을 할 수 있습니다.
            console.log("GiftHuntGame useEffect cleanup (if any)");
        };
    }, [initializeGifts]);


    const handleGiftClick = (id) => {
        const clickedGift = gifts.find(g => g.id === id);
        if (!clickedGift || clickedGift.found) return;

        playClickSound();

        setGifts(gifts.map(gift =>
            gift.id === id ? { ...gift, found: true } : gift
        ));
        setFoundCount(prevCount => prevCount + 1);
        playFindSound();

        // 새로 연 선물 이미지 크게 보여주기
        setOpenedGiftImage(clickedGift.openImage);
        setShowOpenedImage(true);
        setTimeout(() => {
            setShowOpenedImage(false);
        }, 2000);
    };

    // 🚨 핵심: 이 useEffect가 두 번 실행되는지 확인해야 합니다.
    useEffect(() => {
        if (foundCount === NUM_GIFTS) {
            console.log("모든 선물 찾음! 게임 완료 처리 시작...");

            const timeoutId = setTimeout(() => {
                setProgress(100); // 2단계 완료 시 진행도 업데이트
                alert("2단계 완료!");
                completeGame(); // 게임 완료 처리 (setGameCompleted 호출 X)
            }, 1000);

            return () => {
                clearTimeout(timeoutId);
                console.log("GiftHuntGame - nextStage useEffect cleanup.");
            };
        }
    }, [foundCount, setProgress, completeGame]);

    return (
        <div className={styles.giftHuntContainer}>
            <h2>선물 찾기 게임</h2>
            <p>화면에 숨겨진 선물 {NUM_GIFTS}개를 모두 찾아보세요!</p>
            <div className={styles.gameArea}>
                {gifts.map(gift => (
                    <div
                        key={gift.id}
                        className={`${styles.giftBox} ${gift.obstacleClass}`}
                        style={{ top: gift.top, left: gift.left }}
                        onClick={() => handleGiftClick(gift.id)}
                    >
                        <img
                            src={gift.found ? gift.openImage : giftBoxClosed}
                            alt="Gift Box"
                            className={styles.giftImage}
                        />
                        {gift.found && <span className={styles.foundText}></span>}
                    </div>
                ))}
            </div>
            <p className={styles.foundStatus}>찾은 선물: {foundCount} / {NUM_GIFTS}</p>
            {showOpenedImage && openedGiftImage && (
                <div className={styles.openedGiftOverlay}>
                    <img src={openedGiftImage} alt="Opened Gift" className={styles.openedGiftImage} />
                </div>
            )}
        </div>
    );
};

export default GiftHuntGame;