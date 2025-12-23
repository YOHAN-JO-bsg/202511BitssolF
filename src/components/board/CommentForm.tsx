// 댓글 작성/수정 폼 컴포넌트

import { useState } from 'react'

interface CommentFormProps {
    onSubmit: (content: string) => Promise<void>
    onCancel?: () => void
    initialContent?: string
    placeholder?: string
    submitText?: string
}

function CommentForm({
    onSubmit,
    onCancel,
    initialContent = '',
    placeholder = '댓글을 입력하세요',
    submitText = '등록',
}: CommentFormProps) {
    const [content, setContent] = useState(initialContent)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) {
            alert('내용을 입력해주세요.')
            return
        }

        setIsLoading(true)
        try {
            await onSubmit(content)
            setContent('')
        } catch (error) {
            console.error('댓글 처리 실패:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
                className="comment-form__input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                rows={3}
                disabled={isLoading}
            />
            <div className="comment-form__actions">
                {onCancel && (
                    <button
                        type="button"
                        className="comment-form__btn comment-form__btn--cancel"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        취소
                    </button>
                )}
                <button
                    type="submit"
                    className="comment-form__btn comment-form__btn--submit"
                    disabled={isLoading}
                >
                    {isLoading ? '처리중...' : submitText}
                </button>
            </div>
        </form>
    )
}

export default CommentForm
