// 게시글 작성/수정 페이지

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBoardDetail, createBoard, updateBoard } from '../../api/boardApi'
import BottomNav from '../../components/layout/BottomNav'
import type { BoardFormData } from '../../types/board'
import './Board.css'


const CATEGORIES = [
    { value: 'free', label: '자유' },
    { value: 'daily', label: '일상' },
    { value: 'question', label: '질문' },
]

function BoardForm() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const isEditMode = !!id

    const [formData, setFormData] = useState<BoardFormData>({
        title: '',
        content: '',
        category: 'free',
        imageUrl: '',
        voteOptionTexts: [],
    })
    const [voteOptions, setVoteOptions] = useState<string[]>(['', ''])
    const [showVoteSection, setShowVoteSection] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isEditMode && id) {
            loadBoard()
        }
    }, [id])

    const loadBoard = async () => {
        if (!id) return
        setIsLoading(true)
        try {
            const data = await getBoardDetail(Number(id))
            setFormData({
                title: data.title,
                content: data.content,
                category: data.category,
                imageUrl: data.imageUrl || '',
            })
            if (data.voteOptions && data.voteOptions.length > 0) {
                setShowVoteSection(true)
                setVoteOptions(data.voteOptions.map((v) => v.optionText))
            }
        } catch (error) {
            console.error('게시글 조회 실패:', error)
            alert('게시글을 불러오는데 실패했습니다.')
            navigate('/board')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title.trim()) {
            alert('제목을 입력해주세요.')
            return
        }
        if (!formData.content.trim()) {
            alert('내용을 입력해주세요.')
            return
        }

        const submitData: BoardFormData = {
            ...formData,
            voteOptionTexts: showVoteSection
                ? voteOptions.filter((opt) => opt.trim())
                : undefined,
        }

        setIsLoading(true)
        try {
            if (isEditMode && id) {
                await updateBoard(Number(id), submitData)
                alert('게시글이 수정되었습니다.')
                navigate(`/board/${id}`)
            } else {
                const newBoard = await createBoard(submitData)
                alert('게시글이 작성되었습니다.')
                navigate(`/board/${newBoard.boardId}`)
            }
        } catch (error) {
            alert(isEditMode ? '게시글 수정에 실패했습니다.' : '게시글 작성에 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    const addVoteOption = () => {
        setVoteOptions([...voteOptions, ''])
    }

    const removeVoteOption = (index: number) => {
        if (voteOptions.length <= 2) {
            alert('투표 항목은 최소 2개 이상이어야 합니다.')
            return
        }
        setVoteOptions(voteOptions.filter((_, i) => i !== index))
    }

    const updateVoteOption = (index: number, value: string) => {
        const newOptions = [...voteOptions]
        newOptions[index] = value
        setVoteOptions(newOptions)
    }

    return (
        <div className="home-screen">
            <div className="board-header">
                <button className="board-header__back-btn" onClick={() => navigate('/board')}>
                    ← 취소
                </button>
                <h1 className="board-header__title">
                    {isEditMode ? '게시글 수정' : '게시글 작성'}
                </h1>
            </div>

            <main className="home-screen__content">
                <div className="bottom-panel">
                    <div className="bottom-panel__bg" />
                    <div className="bottom-panel__content">
                        <form className="board-form" onSubmit={handleSubmit}>
                            <div className="board-form__group">
                                <label className="board-form__label">카테고리</label>
                                <select
                                    className="board-form__select"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                    disabled={isLoading}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="board-form__group">
                                <label className="board-form__label">제목</label>
                                <input
                                    type="text"
                                    className="board-form__input"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    placeholder="제목을 입력하세요"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="board-form__group">
                                <label className="board-form__label">내용</label>
                                <textarea
                                    className="board-form__textarea"
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    placeholder="내용을 입력하세요"
                                    rows={10}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="board-form__group">
                                <label className="board-form__label">이미지 URL (선택)</label>
                                <input
                                    type="text"
                                    className="board-form__input"
                                    value={formData.imageUrl}
                                    onChange={(e) =>
                                        setFormData({ ...formData, imageUrl: e.target.value })
                                    }
                                    placeholder="이미지 URL을 입력하세요"
                                    disabled={isLoading}
                                />
                            </div>

                            {!isEditMode && (
                                <div className="board-form__group">
                                    <div className="board-form__vote-toggle">
                                        <label className="board-form__label">투표 추가</label>
                                        <input
                                            type="checkbox"
                                            checked={showVoteSection}
                                            onChange={(e) => setShowVoteSection(e.target.checked)}
                                            disabled={isLoading}
                                        />
                                    </div>

                                    {showVoteSection && (
                                        <div className="board-form__vote-options">
                                            {voteOptions.map((option, index) => (
                                                <div key={index} className="board-form__vote-option">
                                                    <input
                                                        type="text"
                                                        className="board-form__input"
                                                        value={option}
                                                        onChange={(e) => updateVoteOption(index, e.target.value)}
                                                        placeholder={`투표 항목 ${index + 1}`}
                                                        disabled={isLoading}
                                                    />
                                                    {voteOptions.length > 2 && (
                                                        <button
                                                            type="button"
                                                            className="board-form__remove-btn"
                                                            onClick={() => removeVoteOption(index)}
                                                            disabled={isLoading}
                                                        >
                                                            삭제
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="board-form__add-btn"
                                                onClick={addVoteOption}
                                                disabled={isLoading}
                                            >
                                                + 투표 항목 추가
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="board-form__actions">
                                <button
                                    type="button"
                                    className="board-form__btn board-form__btn--cancel"
                                    onClick={() => navigate('/board')}
                                    disabled={isLoading}
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="board-form__btn board-form__btn--submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? '처리중...' : isEditMode ? '수정' : '작성'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <BottomNav />
                </div>
            </main>
        </div>
    )
}

export default BoardForm
