import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import defaultImage from "../assets/default_image.svg";

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }

    setLoading(true);

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    const data = await response.json();
    // console.log("data: ", data);

    const dataArray = data.data;
    setImageUrl(dataArray[0].url);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      {/* 헤더 */}
      <div className="header">
        AI 이미지<span>생성기</span>
      </div>
      {/* 이미지 */}
      <div className="img-loading">
        <div className="image">
          <img src={imageUrl === "/" ? defaultImage : imageUrl} alt="" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            로딩 중...
          </div>
        </div>
      </div>
      {/* 입력창 */}
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="만들고 싶은 이미지를 설명해주세요."
          ref={inputRef}
        />
        <div className="generate-btn" onClick={imageGenerator}>
          생성하기
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
