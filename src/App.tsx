import { useOutlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Player from './components/Player';
import { PlayerContext, type Sound } from './contexts/PlayerContext';
import api from './api';

function App() {
  const currentOutlet = useOutlet();
  const location = useLocation();

  // 모든 플레이어 상태와 로직은 App.tsx에서 관리

  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const lastPlayedUrlRef = useRef<string | null>(null);

  // 오디오 로직을 통합한 useEffect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSound) {
      // 노래가 바뀌었을 때만 소스 변경
      if (currentSound.fileUrl !== lastPlayedUrlRef.current) {
        audio.src = currentSound.fileUrl;
        lastPlayedUrlRef.current = currentSound.fileUrl;
        setDuration(0);
        setCurrentTime(0);
      }

      // isPlaying 상태에 따라 재생/일시정지 처리
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio play failed:", error);
          });
        }
      } else {
        audio.pause();
      }
    } else {
      // 선택된 음악 없음
      audio.pause();
      audio.src = '';
    }
  }, [currentSound?.fileUrl, isPlaying]);

  // 음악 재생 함수 - soundId로 음악 정보를 가져와서 재생
  const playSound = async (soundId: number) => {
    try {
      const response = await api.get<Sound>(`/v1/sounds/${soundId}`);
      setCurrentSound(response.data);
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to fetch sound info.", error);
      setCurrentSound(null);
    }
  };
  // 재생/일시정지 토글
  const togglePlayPause = () => {
    if (currentSound) {
      setIsPlaying(prev => !prev);
    }
  };
  // 특정 시간으로 이동 (seek)
  const seekTo = (time: number) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // 탐색 가능한 범위로 제한
    if (audio.seekable && audio.seekable.length > 0) {
      const seekableEnd = audio.seekable.end(0);
      if (seekableEnd > 0) {
        const seekableStart = audio.seekable.start(0);
        audio.currentTime = Math.max(seekableStart, Math.min(time, seekableEnd));
        return;
      }
    }

    // 폴백: 그냥 시도
    audio.currentTime = time;
  };
  // 재생 시간 업데이트 핸들러
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  // 메타데이터 로드 완료 핸들러 (전체 길이 설정)
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const contextValue = {
    currentSound,
    isPlaying,
    duration,
    currentTime,
    playSound,
    togglePlayPause,
    seekTo,
  };

  const showMiniPlayer = location.pathname !== '/soundplayer' && currentSound;

  return (
    <PlayerContext.Provider value={contextValue}>
      <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="container">
        {currentOutlet}
      </div>

      {showMiniPlayer && <Player />}
    </PlayerContext.Provider>
  );
}

export default App;
