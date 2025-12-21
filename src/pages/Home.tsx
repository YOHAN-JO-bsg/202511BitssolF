import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/layout/StatusBar'
import BottomNav from '../components/layout/BottomNav'
import BottomPanel from '../components/layout/BottomPanel'
import WeatherCard from '../components/weather/WeatherCard'
import ForecastStrip from '../components/weather/ForecastStrip'
import type { ForecastItemProps, WeatherCondition } from '../components/weather/ForecastItem'

// 메뉴 아이콘 SVG import (실제 파일은 /src/assets/icons 에 존재한다고 가정)
import PartlyCloudyIcon from '../assets/icons/partly_cloudy.svg'

// 샘플 데이터: 실제 API 연동 시 이 부분만 교체하면 된다.
const currentWeather = {
  temperature: 27,
  condition: 'partly-cloudy' as WeatherCondition,
  location: '서울특별시 강남구',
  feelsLike: 29,
  humidity: 62,
  windKph: 12,
}

const forecastItems: ForecastItemProps[] = [
  { day: '오늘', high: 28, low: 22, condition: 'partly-cloudy' },
  { day: '내일', high: 27, low: 21, condition: 'partly-cloudy' },
  { day: '수', high: 26, low: 20, condition: 'partly-cloudy' },
  { day: '목', high: 25, low: 19, condition: 'partly-cloudy' },
  { day: '금', high: 29, low: 23, condition: 'partly-cloudy' },
]

// 홈 화면 조립
function Home() {

  return (
    <div className="home-screen">
      <StatusBar /> {/* 상단 상태 표시줄, 단순 표시용. 나중에는 자기 스마트폰 상태를 불러와야 함.  */}

      <main className="home-screen__content">
        <BottomPanel>
          <div className="home-screen__stack">
            <WeatherCard
              temperature={currentWeather.temperature}
              condition={currentWeather.condition}
              location={currentWeather.location}
              feelsLike={currentWeather.feelsLike}
              humidity={currentWeather.humidity}
              windKph={currentWeather.windKph}
              icons={{ 'partly-cloudy': PartlyCloudyIcon }}
            />
            <ForecastStrip items={forecastItems} />
          </div>
          <BottomNav />
        </BottomPanel>
      </main>

    </div>
  )
}

export default Home
