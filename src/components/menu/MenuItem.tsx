import type { ReactNode } from 'react'

export interface MenuItemProps {
  icon: ReactNode // SVG 혹은 커스텀 노드
  label: string // 메뉴명 텍스트
}

// 단일 메뉴 버튼: 아이콘 + 라벨
function MenuItem({ icon, label }: MenuItemProps) {
  return (
    <button type="button" className="menu-item">
      <span className="menu-item__icon">{icon}</span>
      <span className="menu-item__label">{label}</span>
    </button>
  )
}

export default MenuItem
