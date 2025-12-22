// src/pages/SoundForm.tsx

import React, { type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import BottomNav from "../../components/layout/BottomNav";


interface SoundDto {
  title: string;
  description: string;
}

function SoundForm(): React.ReactElement {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData();

    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const descriptionInput = form.elements.namedItem(
      "description"
    ) as HTMLInputElement;
    const soundFileInput = form.elements.namedItem(
      "soundFile"
    ) as HTMLInputElement;
    const thumbnailFileInput = form.elements.namedItem(
      "thumbnailFile"
    ) as HTMLInputElement;

    const dto: SoundDto = {
      title: titleInput.value,
      description: descriptionInput.value,
    };

    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    if (soundFileInput.files && soundFileInput.files.length > 0) {
      formData.append("soundFile", soundFileInput.files[0]);
    }

    if (thumbnailFileInput.files && thumbnailFileInput.files.length > 0) {
      formData.append("thumbnailFile", thumbnailFileInput.files[0]);
    }

    try {
      const res = await api.post("/v1/sounds", formData);
      console.log(res.data);
      navigate("/sound");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>빗소리 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label" htmlFor="title">제목</label>
          <input type="text" className="form-control" name="title" id="title" required />
        </div>

        <div>
          <label className="form-label" htmlFor="description">설명</label>
          <input type="text" className="form-control" name="description" id="description" />
        </div>

        <div>
          <label className="form-label" htmlFor="sound">빗소리 파일</label>
          <input type="file" id="sound" name="soundFile" accept="audio/*" required />
        </div>

        <div>
          <label className="form-label" htmlFor="image">썸네일 이미지</label>
          <input type="file" id="image" name="thumbnailFile" accept="image/*" required />
        </div>

        <button className="btn btn-success btn-sm" type="submit">
          업로드
        </button>
      </form>
      <BottomNav />
    </>
  );
}

export default SoundForm;
