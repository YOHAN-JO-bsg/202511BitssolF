// 댓글 목록 컴포넌트

import { useState, useEffect } from 'react'
import { getComments, createComment } from '../../api/commentApi'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import Pagination from './Pagination'
import type { Comment, CommentListResponse } from '../../types/board'

interface CommentListProps {
    boardId: number
}

function CommentList({ boardId }: CommentListProps) {
    const [commentData, setCommentData] = useState<CommentListResponse | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [replyToId, setReplyToId] = useState<number | null>(null)

    const loadComments = async (page: number) => {
        setIsLoading(true)
        try {
            const data = await getComments(boardId, page, 10)
            setCommentData(data)
        } catch (error) {
            console.error('댓글 목록 조회 실패:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadComments(currentPage)
    }, [boardId, currentPage])

    const handleCreateComment = async (content: string) => {
        try {
            await createComment(boardId, content, replyToId || undefined)
            setReplyToId(null)
            loadComments(currentPage)
            alert('댓글이 등록되었습니다.')
        } catch (error) {
            alert('댓글 등록에 실패했습니다.')
            throw error
        }
    }

    const handleReply = (parentId: number) => {
        setReplyToId(parentId)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="comment-list">
            <div className="comment-list__header">
                <h3 className="comment-list__title">
                    댓글 {commentData?.totalElements || 0}
                </h3>
            </div>

            <div className="comment-list__form">
                <CommentForm
                    onSubmit={handleCreateComment}
                    placeholder={replyToId ? '답글을 입력하세요' : '댓글을 입력하세요'}
                    onCancel={replyToId ? () => setReplyToId(null) : undefined}
                />
            </div>

            {isLoading ? (
                <div className="comment-list__loading">댓글을 불러오는 중...</div>
            ) : commentData && commentData.comments.length > 0 ? (
                <>
                    <div className="comment-list__items">
                        {commentData.comments.map((comment) => (
                            <CommentItem
                                key={comment.commentId}
                                comment={comment}
                                onReply={handleReply}
                                onUpdate={() => loadComments(currentPage)}
                            />
                        ))}
                    </div>
                    {commentData.totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={commentData.totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            ) : (
                <div className="comment-list__empty">첫 댓글을 작성해보세요!</div>
            )}
        </div>
    )
}

export default CommentList
