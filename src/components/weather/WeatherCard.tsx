export interface WeatherCardProps {
  secondaryText?: string
  footerText?: string
  iconSrc?: string
  iconAlt?: string
}

// SVG 비율을 유지한 채 텍스트/아이콘만 덮는 카드
function WeatherCard({ secondaryText, footerText, iconSrc, iconAlt }: WeatherCardProps) {
  return (
    <div className="weather-card">
      {iconSrc && (
        <div className="weather-card__icon" aria-hidden="true">
          <img src={iconSrc} alt={iconAlt ?? ''} />
        </div>
      )}
      <div className="weather-card__text">
        {secondaryText && <div className="weather-card__secondary">{secondaryText}</div>}
      </div>
      {footerText && <div className="weather-card__footer">{footerText}</div>}
    </div>
  )
}

export default WeatherCard
