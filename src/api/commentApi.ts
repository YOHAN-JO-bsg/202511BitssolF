// 댓글 API 통신 함수

import { API_BASE_URL, getHeaders, handleApiError } from './config'
import type { CommentListResponse } from '../types/board'

// 댓글 목록 조회
export const getComments = async (
    boardId: number,
    pageNum: number = 1,
    pageSize: number = 10,
    userId?: number
): Promise<CommentListResponse> => {
    try {
        const url = userId
            ? `${API_BASE_URL}/board/${boardId}/comments?pageNum=${pageNum}&pageSize=${pageSize}&userId=${userId}`
            : `${API_BASE_URL}/board/${boardId}/comments?pageNum=${pageNum}&pageSize=${pageSize}`
        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
        })
        if (!response.ok) throw new Error('댓글 목록 조회 실패')
        return await response.json()
    } catch (error) {
        handleApiError(error)
        throw error
    }
}

// 댓글 작성
export const createComment = async (
    boardId: number,
    content: string,
    userId: number,
    parentId?: number
): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/board/${boardId}/comments`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                content,
                userId,
                parentId,
            }),
        })
        if (!response.ok) throw new Error('댓글 작성 실패')
    } catch (error) {
        handleApiError(error)
        throw error
    }
}

// 댓글 수정
export const updateComment = async (
    commentId: number,
    content: string,
    userId: number
): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}?userId=${userId}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ content }),
        })
        if (!response.ok) throw new Error('댓글 수정 실패')
    } catch (error) {
        handleApiError(error)
        throw error
    }
}

// 댓글 삭제
export const deleteComment = async (commentId: number, userId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}?userId=${userId}`, {
            method: 'DELETE',
            headers: getHeaders(),
        })
        if (!response.ok) throw new Error('댓글 삭제 실패')
    } catch (error) {
        handleApiError(error)
        throw error
    }
}
