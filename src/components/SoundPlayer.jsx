// �� ������Ʈ�� ��ǻ� �ʿ� ���� �� �ֽ��ϴ�.
// �� ���� ������Ʈ���� ���� useSound ���� ȣ���Ͽ� ����ϴ� ���� �� ȿ�����Դϴ�.
// ���� ���,
 import useSound from '../hooks/useSound';
 import clickSound from '../assets/sounds/click.mp3';
 const playClickSound = useSound(clickSound);
 <button onClick={playClickSound}>Ŭ��</button>