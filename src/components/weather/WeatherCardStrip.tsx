import WeatherCard, { type WeatherCardProps } from './WeatherCard'

interface WeatherCardStripProps {
  items: WeatherCardProps[]
}

// 오늘 날씨 카드 가로 스크롤 리스트
function WeatherCardStrip({ items }: WeatherCardStripProps) {
  return (
    <div className="weather-card-strip">
      {items.map((item, idx) => (
        <WeatherCard key={`${item.secondaryText}-${idx}`} {...item} />
      ))}
    </div>
  )
}

export default WeatherCardStrip
