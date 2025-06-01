# 🎂 Birthday Minigame

생일을 맞아 특별한 미니게임 웹앱을 만들었습니다!  
React로 제작된 이 프로젝트는 두 가지 미니게임으로 구성되어 있으며, 게임을 모두 완료하면 축하 메시지가 나타납니다.

## 주요 기능

- **생일 케이크 만들기 게임**  
  순서대로 재료를 클릭해 케이크를 완성하세요!  
  각 단계마다 이미지가 바뀌고, 완성 시 축하 효과와 함께 다음 게임으로 넘어갑니다.

- **선물 찾기 게임**  
  화면 곳곳에 숨겨진 선물 상자를 클릭해 모두 찾아보세요!  
  선물을 찾으면 상자가 열리고, 모든 선물을 찾으면 최종 축하 화면이 나타납니다.

- **진행도 표시 & 파티클 효과**  
  상단에 진행 바가 표시되고, 게임 완료 시 파티클 애니메이션이 나옵니다.

## 폴더 구조

```
src/
  App.jsx
  components/
    ParticleEffect.jsx
    ProgressBar.jsx
    SoundPlayer.jsx
  contexts/
    GameContext.jsx
  games/
    BirthdayCakeGame.jsx
    GiftHuntGame.jsx
  hooks/
    useSound.js
  styles/
    App.module.css
    BirthdayCakeGame.module.css
    GiftHuntGame.module.css
    ...
  assets/
    images/
      cake_step0.png
      cake_step1.png
      ...
      gift_closed.png
      gift_open1.jpg
      ...
    sounds/
      click.mp3
      success.mp3
```

## 주요 코드 설명

- **App.jsx**  
  게임의 전체 흐름과 상태 관리를 담당합니다.  
  게임이 끝나면 축하 메시지와 함께 다시 시작 버튼이 나타납니다.

- **GameContext.jsx**  
  현재 스테이지, 진행도, 게임 완료 여부 등 전역 상태를 관리합니다.

- **BirthdayCakeGame.jsx**  
  재료를 순서대로 클릭해 케이크를 완성하는 게임입니다.

- **GiftHuntGame.jsx**  
  화면에 숨겨진 선물 상자를 모두 찾는 게임입니다.

- **ProgressBar.jsx, ParticleEffect.jsx**  
  진행도 표시와 파티클 애니메이션을 담당합니다.

## 실행 방법

1. 저장소를 클론합니다.
2. 필요한 패키지를 설치합니다.
   ```
   npm install
   ```
3. 개발 서버를 실행합니다.
   ```
   npm run dev
   ```
4. 브라우저에서 [http://localhost:5173](http://localhost:5173) (Vite 기준)로 접속합니다.

---

🎉 직접 만든 미니게임으로 소중한 사람의 생일을 더욱 특별하게 축하해보세요!  
