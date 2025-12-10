import type { ReactNode } from 'react'
import PartlyCloudyIcon from '../../assets/icons/partly_cloudy.svg'
import TempIcon from '../../assets/icons/temp_27.svg'

export type WeatherCondition = 'sunny' | 'partly-cloudy' | 'rain' | 'snow' | 'cloudy'

export interface WeatherCardProps {
  temperature: number
  condition: WeatherCondition
  location: string
  feelsLike?: number
  humidity?: number
  windKph?: number
  temperatureIcon?: ReactNode // 커스텀 기온 아이콘
  icons?: Partial<Record<WeatherCondition, string>> // 상태별 아이콘 매핑
}

const defaultIcons: Record<WeatherCondition, string> = {
  sunny: PartlyCloudyIcon,
  'partly-cloudy': PartlyCloudyIcon,
  rain: PartlyCloudyIcon,
  snow: PartlyCloudyIcon,
  cloudy: PartlyCloudyIcon,
}

// 현재 날씨/기온/위치를 표시하는 카드
function WeatherCard({
  temperature,
  condition,
  location,
  feelsLike,
  humidity,
  windKph,
  temperatureIcon,
  icons,
}: WeatherCardProps) {
  const iconSrc = icons?.[condition] ?? defaultIcons[condition] ?? PartlyCloudyIcon

  return (
    <section className="weather-card">
      <div className="weather-card__top">
        <div className="weather-card__icon-wrap">
          <img src={iconSrc} alt={condition} />
        </div>
        <div className="weather-card__main">
          <div className="weather-card__temperature">
            {temperatureIcon ?? <img src={TempIcon} alt="Temperature" />}
            <span>{temperature}℃</span>
          </div>
          <div className="weather-card__condition">부분 흐림</div>
          <div className="weather-card__location">{location}</div>
        </div>
      </div>

      <div className="weather-card__meta">
        {feelsLike !== undefined && <span>체감 {feelsLike}℃</span>}
        {humidity !== undefined && <span>습도 {humidity}%</span>}
        {windKph !== undefined && <span>풍속 {windKph}km/h</span>}
      </div>
    </section>
  )
}

export default WeatherCard
