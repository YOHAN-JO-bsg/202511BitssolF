import 'bootstrap/dist/css/bootstrap.css'
import { useOutlet } from 'react-router-dom'

// 라우터 아웃렛을 감싸는 루트 레이아웃
function App() {
  const currentOutlet = useOutlet()

  return (
    <div className="app-shell">
      <div className="container">{currentOutlet}</div>
    </div>
  )
}

export default App
