// src/pages/auth/Signup.tsx

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BottomNav from "../../components/layout/BottomNav";
import api from "../../api";

function Signup(): React.ReactElement {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    api.post('/v1/users/signup', { name, password, role: 'USER' })
      .then((response) => {
        console.log("회원가입 성공:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("회원가입 실패:", error);
      });
    console.log("회원가입 시도:", { name, password });
  };

  return (
    <div className="auth-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">아이디</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          회원가입
        </button>
      </form>
      <div className="auth-link">
        <p>이미 계정이 있으신가요?</p>
        <NavLink to="/login">로그인</NavLink>
      </div>
      <BottomNav />
    </div>
  );
}

export default Signup;