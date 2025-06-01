import { useEffect, useCallback } from 'react';

const useSound = (soundFile) => {
    const audio = new Audio(soundFile);

    const playSound = useCallback(() => {
        audio.currentTime = 0; // ��� ��ġ�� ó������ ����
        audio.play().catch(error => console.error("Sound play failed:", error));
    }, [audio]);

    // ������Ʈ �𸶿�Ʈ �� ����� ���ҽ� ����
    useEffect(() => {
        return () => {
            audio.pause();
            audio.src = ''; // ���ҽ� ����
        };
    }, [audio]);

    return playSound;
};

export default useSound;