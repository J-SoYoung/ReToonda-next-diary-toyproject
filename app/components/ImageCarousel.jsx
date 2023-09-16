"use client";
import React, { useState, useEffect } from "react";
import styles from "./pageComponent.module.css";
import Image from "next/image";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function ImageCarousel() {
  const bannerImage = ["banner1", "banner2", "banner3"];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let autoPlayImage;
    if (autoPlay) {
      autoPlayImage = setInterval(() => {
        setCurrentSlide((currentSlide) =>
          currentSlide === bannerImage.length - 1 ? 0 : currentSlide + 1
        );
      }, 2500);
    }
    // setInterval은 한번 호출되면 계속 실행되므로 clearInterval 사용
    // return함수를 사용해 컴포넌트가 unmount될때 clearinterval 호출
    return () => clearInterval(autoPlayImage);
  }, [autoPlay]);

  const handleClickSlideMove = (move) => {
    move == "prev"
      ? setCurrentSlide(
          currentSlide == 0 ? bannerImage.length - 1 : currentSlide - 1
        )
      : setCurrentSlide(currentSlide == 2 ? 0 : currentSlide + 1);
  };

  return (
    <section className={styles.carousel}>
      <div className={styles.imgBox}>
        <div>
          <Image
            src={`/image/banner${currentSlide + 1}.png`}
            alt={'banner-img'}
            width={500}
            height={200}
          />
        </div>
      </div>
      <div className={styles.moveButtonBox}>
        <ArrowBackIosNewOutlinedIcon
          className={styles.arrowIcon}
          onClick={() => handleClickSlideMove("prev")}
        />
        <ArrowForwardIosOutlinedIcon
          className={styles.arrowIcon}
          onClick={() => handleClickSlideMove("next")}
        />
      </div>
      {autoPlay ? (
        <PauseIcon
          className={styles.playIcon}
          onClick={() => setAutoPlay(!autoPlay)}
        />
      ) : (
        <PlayArrowIcon
          className={styles.playIcon}
          onClick={() => setAutoPlay(!autoPlay)}
        />
      )}
    </section>
  );
}
