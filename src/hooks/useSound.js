import { useEffect, useCallback } from 'react';

const useSound = (soundFile) => {
    const audio = new Audio(soundFile);

    const playSound = useCallback(() => {
        audio.currentTime = 0; // 재생 위치를 처음으로 돌림
        audio.play().catch(error => console.error("Sound play failed:", error));
    }, [audio]);

    // 컴포넌트 언마운트 시 오디오 리소스 해제
    useEffect(() => {
        return () => {
            audio.pause();
            audio.src = ''; // 리소스 해제
        };
    }, [audio]);

    return playSound;
};

export default useSound;