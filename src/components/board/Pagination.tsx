// 페이지네이션 컴포넌트

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // 페이지 번호 5개씩 표시
    const getPageNumbers = () => {
        const pageNumbers: number[] = []
        const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1
        const endPage = Math.min(startPage + 4, totalPages)

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }
        return pageNumbers
    }

    const pageNumbers = getPageNumbers()
    const showPrev = currentPage > 1
    const showNext = currentPage < totalPages
    const showPrevGroup = pageNumbers[0] > 1
    const showNextGroup = pageNumbers[pageNumbers.length - 1] < totalPages

    return (
        <div className="pagination">
            {showPrev && (
                <button
                    className="pagination__btn pagination__btn--prev"
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    ‹
                </button>
            )}

            {showPrevGroup && (
                <button
                    className="pagination__btn pagination__btn--group"
                    onClick={() => onPageChange(pageNumbers[0] - 1)}
                >
                    ‹‹
                </button>
            )}

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`pagination__btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {showNextGroup && (
                <button
                    className="pagination__btn pagination__btn--group"
                    onClick={() => onPageChange(pageNumbers[pageNumbers.length - 1] + 1)}
                >
                    ››
                </button>
            )}

            {showNext && (
                <button
                    className="pagination__btn pagination__btn--next"
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    ›
                </button>
            )}
        </div>
    )
}

export default Pagination
