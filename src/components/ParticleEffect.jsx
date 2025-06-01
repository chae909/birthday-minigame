import React, { useEffect, useRef } from 'react';
import styles from '../styles/ParticleEffect.module.css';

const ParticleEffect = () => {
    const particlesRef = useRef([]);

    useEffect(() => {
        const createParticle = (x, y) => {
            const particle = document.createElement('div');
            particle.className = styles.particle;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`; // 무작위 색상
            document.body.appendChild(particle);

            // 애니메이션 시작
            const size = Math.random() * 5 + 5; // 5px ~ 10px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const animationDuration = Math.random() * 1 + 0.5; // 0.5s ~ 1.5s
            const translateX = (Math.random() - 0.5) * 100; // -50px ~ 50px
            const translateY = (Math.random() - 0.5) * 100; // -50px ~ 50px

            particle.animate(
                [
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${translateX}px, ${translateY}px) scale(0)`, opacity: 0 }
                ],
                {
                    duration: animationDuration * 1000,
                    easing: 'ease-out',
                    fill: 'forwards'
                }
            ).onfinish = () => {
                particle.remove();
            };

            particlesRef.current.push(particle);
        };

        const handleMouseMove = (e) => {
            createParticle(e.clientX, e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            // 컴포넌트 언마운트 시 모든 파티클 제거
            particlesRef.current.forEach(p => p.remove());
        };
    }, []);

    return null; // 파티클은 DOM에 직접 추가되므로 JSX를 렌더링하지 않습니다.
};

export default ParticleEffect;