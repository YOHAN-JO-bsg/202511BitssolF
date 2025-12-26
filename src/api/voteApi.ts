// 투표 API 통신 함수

import { API_BASE_URL, getHeaders, handleApiError } from './config'
import type { VoteResultsDto } from '../types/board'

// 투표 실행
export const castVote = async (voteId: number): Promise<number> => {
    try {
        const voteResultsDto: Partial<VoteResultsDto> = {
            voteId,
        }
        const response = await fetch(`${API_BASE_URL}/votes/cast`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(voteResultsDto),
        })
        if (!response.ok) throw new Error('투표 실패')
        return await response.json()
    } catch (error) {
        handleApiError(error)
        throw error
    }
}
