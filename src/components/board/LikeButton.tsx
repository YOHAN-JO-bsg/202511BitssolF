// 좋아요 버튼 컴포넌트

import { useState } from 'react'
import { toggleLike } from '../../api/likeApi'

interface LikeButtonProps {
    targetType: 'board' | 'comment'
    targetId: number
    initialLikeCount: number
    initialLikedByUser: boolean
    onLikeChange?: (isLiked: boolean, newCount: number) => void
}

function LikeButton({
    targetType,
    targetId,
    initialLikeCount,
    initialLikedByUser,
    onLikeChange,
}: LikeButtonProps) {
    const [likeCount, setLikeCount] = useState(initialLikeCount)
    const [isLiked, setIsLiked] = useState(initialLikedByUser)
    const [isLoading, setIsLoading] = useState(false)

    const handleLikeClick = async () => {
        if (isLoading) return

        setIsLoading(true)
        try {
            // ⭐ 핵심 수정: 백엔드가 기대하는 값으로 변환
            const backendTargetType =
                targetType === 'board' ? 'BOARD' : 'COMMENT'

            const newIsLiked = await toggleLike(backendTargetType, targetId)

            const newCount = newIsLiked
                ? likeCount + 1
                : Math.max(likeCount - 1, 0)

            setIsLiked(newIsLiked)
            setLikeCount(newCount)
            onLikeChange?.(newIsLiked, newCount)
        } catch (error) {
            console.error('좋아요 처리 실패:', error)
            alert('좋아요 처리에 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            disabled={isLoading}
        >
            <span className="like-btn__icon">{isLiked ? '❤️' : '🤍'}</span>
            <span className="like-btn__count">{likeCount}</span>
        </button>
    )
}

export default LikeButton
