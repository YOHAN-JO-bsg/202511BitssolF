// 좋아요 API 통신 함수

import { API_BASE_URL, getHeaders, handleApiError } from './config'
import type { LikesDto } from '../types/board'

// 좋아요 토글
export const toggleLike = async (
    userId: number,
    targetType: 'board' | 'comment',
    targetId: number
): Promise<boolean> => {
    try {
        const likesDto: LikesDto = {
            userId,
            targetType,
            targetId,
        }
        const response = await fetch(`${API_BASE_URL}/likes`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(likesDto),
        })
        if (!response.ok) throw new Error('좋아요 처리 실패')
        return await response.json()
    } catch (error) {
        handleApiError(error)
        throw error
    }
}
