import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'user';  // 나중에 관리자 기능 추가할 때 사용
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const token = localStorage.getItem('token');
    const location = useLocation();

    // 토큰 없으면 로그인 페이지로
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 나중에 관리자 권한 체크 추가할 수 있음
    // if (requiredRole === 'admin' && userRole !== 'admin') {
    //   return <Navigate to="/" replace />;
    // }

    return <>{children}</>;
}

export default ProtectedRoute;