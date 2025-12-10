import StatusBarIcon from '../../assets/icons/status_bar.svg'

// 단순 상태바 래퍼: iOS 스타일 상태바 SVG 표시
function StatusBar() {
  return (
    <div className="status-bar">
      <img src={StatusBarIcon} alt="Status bar" className="status-bar__icon" />
    </div>
  )
}

export default StatusBar
