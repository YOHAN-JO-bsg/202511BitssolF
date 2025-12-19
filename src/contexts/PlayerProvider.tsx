import { useState, type ReactNode } from "react";
import { PlayerContext, type Sound } from "./PlayerContext";
import api from "../api";


interface PlayerProviderProps {
  children: ReactNode;
}

// 2. Provider 컴포넌트 생성: 상태와 상태 변경 함수를 하위 컴포넌트에 제공
export function PlayerProvider({ children }: PlayerProviderProps) {
    const [currentSound, setCurrentSound] = useState<Sound | null>(null); // 현재 재생 중인 소리 정보
    const [isPlaying, setIsPlaying] = useState(false);       // 재생/일시정지 상태

    // 재생할 사운드를 설정하는 함수
    const playSound = async (soundId: number) => {
        try {
            
            // 백엔드에 상세 정보 요청
            const response = await api.get<Sound>(`/v1/sounds/${soundId}`);
            setCurrentSound(response.data); // 상태 업데이트
            setIsPlaying(true);             // 바로 재생 시작
        } catch (error) {
            console.error("사운드 정보를 가져오는데 실패했습니다.", error);
            setCurrentSound(null);
        }
    };

    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const value = { currentSound, isPlaying, playSound, togglePlayPause };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
}
