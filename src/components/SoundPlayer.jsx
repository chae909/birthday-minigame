// 이 컴포넌트는 사실상 필요 없을 수 있습니다.
// 각 게임 컴포넌트에서 직접 useSound 훅을 호출하여 사용하는 것이 더 효율적입니다.
// 예를 들어,
 import useSound from '../hooks/useSound';
 import clickSound from '../assets/sounds/click.mp3';
 const playClickSound = useSound(clickSound);
 <button onClick={playClickSound}>클릭</button>