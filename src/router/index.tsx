/* 
    src/router/index.jsx 

    - 파일명을 index.js or index.jsx 로 작성하면 외부에서
      router 폴더까지만 import 했을 때 자동으로 index.js or index.jsx
      파일에서 export default 된 자원을 사용할 수 있다. 
    - index 는 약속된 파일명이다.
*/

import { createHashRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/BissolHome";
import BoardList from "../pages/Board/BoardList";
import BoardDetail from "../pages/Board/BoardDetail";
import BoardForm from "../pages/Board/BoardForm";
import SoundMain from "../pages/sound/SoundMain";
import SoundForm from "../pages/sound/SoundForm";
import SoundPlayer from "../pages/sound/SoundPlayer";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";

// 인증 보호용 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

// 페이지 routing 정보를 배열에 미리 저장해둔다.
const routes = [
    { path: "/index.html", element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: "/board", element: <ProtectedRoute><BoardList /></ProtectedRoute> },
    { path: "/board/:id", element: <ProtectedRoute><BoardDetail /></ProtectedRoute> },
    { path: "/board/new", element: <ProtectedRoute><BoardForm /></ProtectedRoute> },
    { path: "/board/:id/edit", element: <ProtectedRoute><BoardForm /></ProtectedRoute> },
    { path: "/sound", element: <ProtectedRoute><SoundMain /></ProtectedRoute> },
    { path: "/sound/new", element: <ProtectedRoute><SoundForm /></ProtectedRoute> },
    { path: "/soundplayer", element: <ProtectedRoute><SoundPlayer /></ProtectedRoute> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
];

//export 해줄 router 객체를 만든다
const router = createHashRouter([{
    path: "/",
    element: <App />,
    children: routes.map((route) => {
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역할을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시되지 않게  
            element: route.element //어떤 컴포넌트를 활성화 할것인지 
        }
    })
}]);

export default router;