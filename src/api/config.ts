// API 기본 설정

export const API_BASE_URL = 'http://localhost:9000/v1'

// 임시 사용자 ID (인증 기능 없을 때 사용)
export const TEMP_USER_ID = 1

// API 공통 헤더
export const getHeaders = () => ({
    'Content-Type': 'application/json',
})

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
