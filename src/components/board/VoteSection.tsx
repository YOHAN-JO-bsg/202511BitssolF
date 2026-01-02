// VoteSection.tsx

import { useState, useEffect } from 'react'
import { castVote } from '../../api/voteApi'
import type { Vote } from '../../types/board'

interface VoteSectionProps {
  voteOptions: Vote[]
  isVotedByUser: boolean
  onVoteSuccess?: () => void
}

function VoteSection({
  voteOptions,
  isVotedByUser,
  onVoteSuccess,
}: VoteSectionProps) {
  const [hasVoted, setHasVoted] = useState(isVotedByUser)
  const [isLoading, setIsLoading] = useState(false)

  /** 🔥 서버 상태 변경 시 동기화 (핵심) */
  useEffect(() => {
    setHasVoted(isVotedByUser)
  }, [isVotedByUser])

  const totalVotes = voteOptions.reduce(
    (sum, option) => sum + option.voteCount,
    0
  )

  const getPercentage = (count: number) => {
    if (totalVotes === 0) return 0
    return Math.round((count / totalVotes) * 100)
  }

  const handleVote = async (voteId: number) => {
    if (hasVoted || isLoading) return

    setIsLoading(true)
    try {
      await castVote(voteId)

      // 👉 서버 최신 데이터 다시 로드
      onVoteSuccess?.()

      alert('투표가 완료되었습니다!')
    } catch (error) {
      console.error('투표 실패:', error)
      alert('이미 투표에 참여하셨습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="vote-section">
      <div className="vote-section__header">
        <h3 className="vote-section__title">투표</h3>
        <span className="vote-section__total">
          총 {totalVotes}표
        </span>
      </div>

      <div className="vote-section__options">
        {voteOptions.map((option) => {
          const percentage = getPercentage(option.voteCount)

          return (
            <div key={option.voteId} className="vote-option">
              <button
                className={`vote-option__btn
                  ${option.selectedByUser ? 'selected' : ''}
                  ${hasVoted ? 'voted' : ''}
                `}
                onClick={() => handleVote(option.voteId)}
                disabled={hasVoted || isLoading}
              >
                <div className="vote-option__content">
                  <span className="vote-option__text">
                    {option.optionText}
                  </span>
                  <span className="vote-option__percent">
                    {percentage}%
                  </span>
                </div>

                <div
                  className="vote-option__bar"
                  style={{ width: `${percentage}%` }}
                />
              </button>
            </div>
          )
        })}
      </div>

      {hasVoted && (
        <p className="vote-section__notice">
          이미 투표하셨습니다.
        </p>
      )}
    </div>
  )
}

export default VoteSection
