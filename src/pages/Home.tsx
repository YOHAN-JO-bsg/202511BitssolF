import StatusBar from '../components/layout/StatusBar'
import Header from '../components/layout/Header'
import HomeIndicator from '../components/layout/HomeIndicator'
import WeatherCard from '../components/weather/WeatherCard'
import ForecastStrip from '../components/weather/ForecastStrip'
import MenuGrid from '../components/menu/MenuGrid'
import type { MenuItemProps } from '../components/menu/MenuItem'
import type { ForecastItemProps, WeatherCondition } from '../components/weather/ForecastItem'

// 메뉴 아이콘 SVG import (실제 파일은 /src/assets/icons 에 존재한다고 가정)
import Group488Icon from '../assets/icons/group_488.svg'
import Group489Icon from '../assets/icons/group_489.svg'
import Group490Icon from '../assets/icons/group_490.svg'
import Group491Icon from '../assets/icons/group_491.svg'
import Group492Icon from '../assets/icons/group_492.svg'
import Group493Icon from '../assets/icons/group_493.svg'
import Group494Icon from '../assets/icons/group_494.svg'
import Group495Icon from '../assets/icons/group_495.svg'
import Group496Icon from '../assets/icons/group_496.svg'
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

const menuItems: MenuItemProps[] = [
  { icon: <img src={Group488Icon} alt="Menu 1" />, label: '날씨 상세' },
  { icon: <img src={Group489Icon} alt="Menu 2" />, label: '미세먼지' },
  { icon: <img src={Group490Icon} alt="Menu 3" />, label: '생활지수' },
  { icon: <img src={Group491Icon} alt="Menu 4" />, label: '예보 지도' },
  { icon: <img src={Group492Icon} alt="Menu 5" />, label: '즐겨찾기' },
  { icon: <img src={Group493Icon} alt="Menu 6" />, label: '설정' },
  { icon: <img src={Group494Icon} alt="Menu 7" />, label: '공지사항' },
  { icon: <img src={Group495Icon} alt="Menu 8" />, label: '문의하기' },
  { icon: <img src={Group496Icon} alt="Menu 9" />, label: '더보기' },
]

// 홈 화면 조립
function Home() {
  return (
    <div className="home-screen">
      <StatusBar />

      <main className="home-screen__content">
        <section className="home-screen__weather">
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
        </section>

        <section className="home-screen__menu">
          <MenuGrid items={menuItems} />
        </section>
      </main>

      <Header />
      <HomeIndicator />
    </div>
  )
}

export default Home
