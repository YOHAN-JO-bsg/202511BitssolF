import type { ReactNode } from 'react'

interface BottomPanelProps {
    children: ReactNode
}

// 회색 패널(사각형) 배경 위에 콘텐츠를 얹는 용도
function BottomPanel({ children }: BottomPanelProps) {
    return (
        <section className="bottom-panel">
            <div className="bottom-panel__bg" />
            <div className="bottom-panel__content">{children}</div>
        </section>
    )
}

export default BottomPanel
