import ForecastItem, { type ForecastItemProps } from './ForecastItem'

interface ForecastStripProps {
  items: ForecastItemProps[]
}

// 일별 예보 가로 스크롤 리스트
function ForecastStrip({ items }: ForecastStripProps) {
  return (
    <div className="forecast-strip">
      {items.map((item, idx) => (
        <ForecastItem key={`${item.day}-${idx}`} {...item} />
      ))}
    </div>
  )
}

export default ForecastStrip
