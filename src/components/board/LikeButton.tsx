// 좋아요 버튼 컴포넌트

import { useState } from 'react'
import { toggleLike } from '../../api/likeApi'
import { TEMP_USER_ID } from '../../api/config'

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
            const newIsLiked = await toggleLike(TEMP_USER_ID, targetType, targetId)
            const newCount = newIsLiked ? likeCount + 1 : likeCount - 1
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
