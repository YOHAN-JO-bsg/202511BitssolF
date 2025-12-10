import type { WeatherCondition } from './WeatherCard'
import PartlyCloudyIcon from '../../assets/icons/partly_cloudy.svg'

export interface ForecastItemProps {
  day: string
  high: number
  low: number
  condition: WeatherCondition
  icon?: string
}

// 단일 예보 아이템: 요일, 아이콘, 최고/최저
function ForecastItem({ day, high, low, condition, icon }: ForecastItemProps) {
  return (
    <div className="forecast-item">
      <div className="forecast-item__day">{day}</div>
      <div className="forecast-item__icon">
        <img src={icon ?? PartlyCloudyIcon} alt={condition} />
      </div>
      <div className="forecast-item__temp">
        <span className="forecast-item__high">{high}℃</span>
        <span className="forecast-item__low">{low}℃</span>
      </div>
    </div>
  )
}

export type { WeatherCondition }
export default ForecastItem
