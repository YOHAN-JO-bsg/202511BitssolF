// src/pages/SoundMain.tsx

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api";
import { usePlayer } from "../../hooks/usePlayer";
import BottomNav from "../../components/layout/BottomNav";

interface Sound {
  soundId: number;
  title: string;
  thumbnailUrl: string;
  fileUrl: string;
}

function SoundMain(): React.ReactElement {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const { playSound } = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Sound[]>("/v1/sounds")
      .then(res => {
        setSounds(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSoundClick = (soundId: number) => {
    playSound(soundId);
    navigate('/soundplayer');
  };

  return (
    <>
      <h1>빗소리</h1>
      <div className="input-group">
        <select name="search" className="form-select">
          <option value="all">전체</option>
          <option value="ordinary">일상</option>
          <option value="monsoon">장마</option>
        </select>
        <input type="text" name="keyword" className="form-control" placeholder="검색어 입력..." />
        <button type="submit" className="btn btn-outline-secondary">
          <i className="bi bi-search"></i>
          <span className="visually-hidden">검색</span>
        </button>
        <button className="btn btn-outline-danger">
          <i className="bi bi-arrow-clockwise"></i>
          <span className="visually-hidden">새로고침</span>
        </button>
      </div>
      <NavLink to="/sound/new">+</NavLink>
      <h3>목록</h3>
      <div className="sound-list">
        {sounds.map(sound => (
          <div className="sound-card" key={sound.soundId} onClick={() => handleSoundClick(sound.soundId)}>
            <img src={sound.thumbnailUrl} alt={sound.title} />
            <p>{sound.thumbnailUrl}</p><br />
            <h4>{sound.title}</h4>
          </div>
        ))}
      </div>
      <BottomNav />
    </>
  );
}

export default SoundMain;