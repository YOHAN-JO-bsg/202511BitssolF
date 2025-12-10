import MenuItem, { type MenuItemProps } from './MenuItem'

interface MenuGridProps {
  items: MenuItemProps[] // 그리드에 표시할 메뉴 목록
}

// 메뉴들을 그리드 형태로 나열
function MenuGrid({ items }: MenuGridProps) {
  return (
    <div className="menu-grid">
      {items.map((item, index) => (
        <div className="menu-grid__item" key={`${item.label}-${index}`}>
          <MenuItem icon={item.icon} label={item.label} />
        </div>
      ))}
    </div>
  )
}

export default MenuGrid
