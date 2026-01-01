import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './SoundPlayer.module.css';
import { usePlayer } from '../../hooks/usePlayer';

// 초 단위의 시간을 MM:SS 형식으로 변환하는 헬퍼 함수
const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

function SoundPlayer() {
    const {
        currentSound,
        isPlaying,
        togglePlayPause,
        currentTime,
        duration,
        seekTo
    } = usePlayer();
    const navigate = useNavigate();

    // 드래그 중 슬라이더의 값을 관리하기 위한 로컬 상태
    const [sliderValue, setSliderValue] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // 전역 currentTime과 로컬 슬라이더 값을 동기화
    // 단, 사용자가 슬라이더를 드래그하고 있지 않을 때만 수행
    useEffect(() => {
        if (!isDragging) {
            setSliderValue(currentTime);
        }
    }, [currentTime, isDragging]);

    if (!currentSound) {
        return (
            <div className={styles.playerContainer}>
                <h2>음악을 선택해주세요.</h2>
                <button onClick={() => navigate(-1)}>뒤로가기</button>
            </div>
        );
    }

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setSliderValue(newValue);

        // 드래그 중이 아니라면 클릭한 것으로 간주하여 즉시 탐색(seek)
        if (!isDragging) {
            seekTo(newValue);
        }
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
        const newValue = Number(e.currentTarget.value);

        if (isDragging) {
            // 드래그 중이었다가 놓은 상태이므로 최종 값으로 탐색(seek)
            seekTo(newValue);
        }
        setIsDragging(false);
    };

    // 화면에 표시되는 시간은 드래그 동작을 즉시 반영
    const displayedTime = isDragging ? sliderValue : currentTime;

    return (
        <div className={styles.playerContainer}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                &lt; Back
            </button>
            <div className={styles.thumbnailWrapper}>
                <img src={currentSound.thumbnailUrl} alt={currentSound.title} className={styles.thumbnail} />
            </div>

            <div className={styles.trackInfo}>
                <h2 className={styles.trackTitle}>{currentSound.title}</h2>
                <p className={styles.trackArtist}>{currentSound.uploaderName}</p>
            </div>

            <div className={styles.progressContainer}>
                <input
                    type="range"
                    value={sliderValue}
                    max={duration || 0}
                    onChange={handleSliderChange}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    className={styles.progressBar}
                />
                <div className={styles.timeLabels}>
                    <span>{formatTime(displayedTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className={styles.controls}>
                <button className={styles.controlButton}>{"<<"}</button>
                <button className={`${styles.controlButton} ${styles.playPauseButton}`} onClick={togglePlayPause}>
                    {isPlaying ? "❚❚" : "▶"}
                </button>
                <button className={styles.controlButton}>{">>"}</button>
            </div>
        </div>
    );
}

export default SoundPlayer;