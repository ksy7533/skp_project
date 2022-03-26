import React, { useState, useRef, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import styled, { css } from "styled-components";
import RWD from "../styles/rwd";

import "swiper/css";
import "swiper/css/navigation";

import img01 from "../images/img_01.jpg";
import img02 from "../images/img_02.jpg";
import img03 from "../images/img_03.jpg";
import img04 from "../images/img_04.jpg";
import img05 from "../images/img_05.jpg";
import img06 from "../images/img_06.jpg";
import Colors from "../styles/colors";

const photoList = [
  {
    id: 1,
    src: img01,
    name: "샌드위치1"
  },
  {
    id: 2,
    src: img02,
    name: "샌드위치2"
  },
  {
    id: 3,
    src: img03,
    name: "귤"
  },
  {
    id: 4,
    src: img04,
    name: "꼬치"
  },
  {
    id: 5,
    src: img05,
    name: "스테이크"
  },
  {
    id: 6,
    src: img06,
    name: "캘리포니아롤"
  }
];

const Styled = {
  TagSwiperWrap: styled.div`
    .tag-swiper {
      margin-bottom: 2rem;
      padding: 0 1rem;

      .swiper-slide {
        width: auto;

        &:first-child {
          .item {
            margin-left: 0;
          }
        }

        &:last-child {
          .item {
            margin-right: 0;
          }
        }
      }
    }
  `,

  Tag: styled.button`
    text-align: center;
    display: inline-block;
    min-width: 4rem;
    margin: 0 0.5rem;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    border: 1px solid ${Colors.GRAY};
    border-radius: 20px;

    ${({ isOn }) => {
      return (
        isOn &&
        css`
          color: ${Colors.WHITE};
          background-color: ${Colors.GRAY};
        `
      );
    }}

    @media screen and (min-width: ${RWD.TABLET}px) {
      min-width: 14rem;
    }
  `,

  PhotoSwiperWrap: styled.div``
};

function SwiperComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photoSwiperRef = useRef();

  const handleClickTag = useCallback(
    id => {
      const index = photoList.findIndex(item => {
        return item.id === id;
      });
      if (photoSwiperRef.current) {
        photoSwiperRef.current.slideTo(index);
        setCurrentIndex(index);
      }
    },
    [photoSwiperRef]
  );

  const renderTagSwiperSlide = useMemo(() => {
    return () => {
      return photoList.map((item, index) => {
        return (
          <SwiperSlide key={item.id}>
            <Styled.Tag
              isOn={currentIndex === index}
              onClick={() => handleClickTag(item.id)}
            >
              #{item.name}
            </Styled.Tag>
          </SwiperSlide>
        );
      });
    };
  }, [currentIndex]);

  const renderPhotoSwiperSlide = useMemo(() => {
    return () => {
      return photoList.map(item => {
        return (
          <SwiperSlide key={item.id}>
            <img src={item.src} alt={item.name} />
          </SwiperSlide>
        );
      });
    };
  }, []);

  const handleRealIndexChange = useCallback(({ realIndex }) => {
    setCurrentIndex(realIndex);
  }, []);

  return (
    <>
      <Styled.TagSwiperWrap>
        <Swiper slidesPerView="auto" className="tag-swiper">
          {renderTagSwiperSlide()}
        </Swiper>
      </Styled.TagSwiperWrap>

      <Styled.PhotoSwiperWrap>
        <Swiper
          onSwiper={swiper => (photoSwiperRef.current = swiper)}
          navigation={true}
          modules={[Navigation]}
          className="photo-swiper"
          onRealIndexChange={handleRealIndexChange}
        >
          {renderPhotoSwiperSlide()}
        </Swiper>
      </Styled.PhotoSwiperWrap>
    </>
  );
}

export default SwiperComponent;
