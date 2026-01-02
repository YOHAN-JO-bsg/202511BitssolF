// 개별 댓글 컴포넌트

import { useState } from 'react'
import { updateComment, deleteComment } from '../../api/commentApi'
import LikeButton from './LikeButton'
import CommentForm from './CommentForm'
import type { Comment } from '../../types/board'

interface CommentItemProps {
    comment: Comment
    onReply: (parentId: number) => void
    onUpdate: () => void
}

function CommentItem({ comment, onReply, onUpdate }: CommentItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [showReplyForm, setShowReplyForm] = useState(false)

    const isMyComment = false // TODO: 내 정보 조회 API 연동 후 수정 필요
    const isDeleted = comment.isHidden === 1

    const handleEdit = async (content: string) => {
        try {
            await updateComment(comment.commentId, content)
            setIsEditing(false)
            onUpdate()
            alert('댓글이 수정되었습니다.')
        } catch (error) {
            alert('댓글 수정에 실패했습니다.')
            throw error
        }
    }

    const handleDelete = async () => {
        if (!confirm('댓글을 삭제하시겠습니까?')) return

        try {
            await deleteComment(comment.commentId)
            onUpdate()
            alert('댓글이 삭제되었습니다.')
        } catch {
            alert('댓글 삭제에 실패했습니다.')
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return '방금 전'
        if (minutes < 60) return `${minutes}분 전`
        if (hours < 24) return `${hours}시간 전`
        if (days < 7) return `${days}일 전`
        return date.toLocaleDateString('ko-KR')
    }

    return (
        <div className={`comment-item ${comment.parentId ? 'comment-item--reply' : ''}`}>
            <div className="comment-item__header">
                <span className="comment-item__writer">{comment.writer}</span>
                <span className="comment-item__date">{formatDate(comment.createdAt)}</span>
            </div>

            {isDeleted ? (
                <p className="comment-item__content comment-item__content--deleted">
                    삭제된 댓글입니다.
                </p>
            ) : isEditing ? (
                <CommentForm
                    onSubmit={handleEdit}
                    onCancel={() => setIsEditing(false)}
                    initialContent={comment.content}
                    submitText="수정"
                />
            ) : (
                <>
                    <p className="comment-item__content">{comment.content}</p>
                    <div className="comment-item__actions">
                        <LikeButton
                            targetType="comment"
                            targetId={comment.commentId}
                            initialLikeCount={comment.likeCount}
                            initialLikedByUser={comment.likedByUser}
                        />
                        {!comment.parentId && (
                            <button
                                className="comment-item__btn"
                                onClick={() => {
                                    setShowReplyForm(!showReplyForm)
                                    onReply(comment.commentId)
                                }}
                            >
                                답글
                            </button>
                        )}
                        {isMyComment && (
                            <>
                                <button className="comment-item__btn" onClick={() => setIsEditing(true)}>
                                    수정
                                </button>
                                <button className="comment-item__btn" onClick={handleDelete}>
                                    삭제
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}

            {comment.children && comment.children.length > 0 && (
                <div className="comment-item__children">
                    {comment.children.map((child) => (
                        <CommentItem key={child.commentId} comment={child} onReply={onReply} onUpdate={onUpdate} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CommentItem
