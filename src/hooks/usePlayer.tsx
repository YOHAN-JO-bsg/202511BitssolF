import { useContext } from 'react';
import { PlayerContext, type PlayerContextType } from '../contexts/PlayerContext'; // 우리가 만든 Context를 가져옴

// 다른 컴포넌트에서 Context 값을 쉽게 사용하도록 도와주는 훅
export const usePlayer = (): PlayerContextType => {
    const context = useContext(PlayerContext);

    // 만약 Provider로 감싸여있지 않은 곳에서 이 훅을 쓴다면
    // 개발자에게 알려주는 친절한 에러 메시지를 추가할 수 있음
    if (context === null) {
        throw new Error('usePlayer는 PlayerProvider 안에서만 사용해야 합니다!');
    }

    return context; // playSound, currentSound 등이 담긴 객체를 반환
};