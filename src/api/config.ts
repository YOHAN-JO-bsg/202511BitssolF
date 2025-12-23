// API 기본 설정

export const API_BASE_URL = 'http://localhost:9000/v1'

// API 공통 헤더
export const getHeaders = () => {
    const token = localStorage.getItem('token') // 저장된 토큰 읽기
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}` // 토큰이 있으면 헤더에 추가
    }

    return headers
}

// API 에러 처리
export const handleApiError = (error: any) => {
    console.error('API Error:', error)
    if (error.response) {
        throw new Error(error.response.data.message || 'API 요청 실패')
    } else if (error.request) {
        throw new Error('서버 응답 없음')
    } else {
        throw new Error('요청 설정 오류')
    }
}
