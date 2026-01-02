import { usePlayer } from '../hooks/usePlayer';

function Player() {
    const { currentSound, isPlaying, togglePlayPause, stopSound } = usePlayer();

    // 재생 중인 소리가 없으면 아무것도 렌더링하지 않음
    if (!currentSound) {
        return null;
    }

    return (
        <div className="player-container"> {/* CSS로 하단에 고정 */}
            <img src={currentSound.thumbnailUrl} alt={currentSound.title} />
            <div className="sound-info">
                <h4>{currentSound.title}</h4>
                {/* <p>{currentSound.uploaderName}</p> */}
            </div>
            <button onClick={togglePlayPause}>
                {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button onClick={stopSound} className="close-btn">
                ✕
            </button>
        </div>
    );
}

export default Player;