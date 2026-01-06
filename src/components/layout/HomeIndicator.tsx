import HomeIndicatorIcon from '../../assets/icons/home_indicator.svg'

// 화면 하단 홈 인디케이터 (iOS 홈 바)
function HomeIndicator() {
    return (
        <div className="home-indicator">
            <img src={HomeIndicatorIcon} alt="Home indicator" className="home-indicator__icon" />
        </div>
    )
}

export default HomeIndicator
