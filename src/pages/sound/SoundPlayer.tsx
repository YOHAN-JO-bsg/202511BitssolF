import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './SoundPlayer.module.css';
import { usePlayer } from '../../hooks/usePlayer';

// Helper function to format time from seconds to MM:SS
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

    // Local state to manage the slider's value during a drag
    const [sliderValue, setSliderValue] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Sync the local slider value with the global currentTime,
    // but only when the user is NOT actively dragging the slider.
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

        // If not dragging, this is likely a click - seek immediately
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
            // Was dragging, now release - seek to final value
            seekTo(newValue);
        }
        setIsDragging(false);
    };

    // The time displayed should reflect the drag action instantly
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