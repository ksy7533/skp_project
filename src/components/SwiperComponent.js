import React, { useState, useRef, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import styled, { css } from "styled-components";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import RWD from "../styles/rwd";
import Colors from "../styles/colors";
import "swiper/css";
import img01 from "../images/img_01.jpg";
import img02 from "../images/img_02.jpg";
import img03 from "../images/img_03.jpg";
import img04 from "../images/img_04.jpg";
import img05 from "../images/img_05.jpg";
import img06 from "../images/img_06.jpg";

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

  PhotoSwiperWrap: styled.div`
    position: relative;

    button {
      z-index: 10;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &.prev-button {
        left: 1rem;
      }

      &.next-button {
        right: 1rem;
      }

      .icon {
        color: ${Colors.WHITE};
        font-size: 4rem;
      }

      &.swiper-button-disabled {
        .icon {
          opacity: 0.4;
        }
      }
    }
  `,

  PrevArrowIcon: styled(HiChevronDoubleLeft)`
    color: ${Colors.WHITE};
  `,

  NextArrowIcon: styled(HiChevronDoubleRight)`
    color: ${Colors.WHITE};
  `,

  ScreenOut: styled.span`
    overflow: hidden;
    position: absolute;
    clip: rect(0 0 0 0);
    margin: -1px;
    width: 1px;
    height: 1px;
  `
};

function SwiperComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photoSwiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

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

  const handlePhotoSwiperInit = useCallback(swiper => {
    swiper.params.navigation.prevEl = prevButtonRef.current;
    swiper.params.navigation.nextEl = nextButtonRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

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
          modules={[Navigation]}
          className="photo-swiper"
          onRealIndexChange={handleRealIndexChange}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current
          }}
          onInit={handlePhotoSwiperInit}
        >
          {renderPhotoSwiperSlide()}
        </Swiper>

        <button ref={prevButtonRef} className="prev-button">
          <HiChevronDoubleLeft className="icon" />
          <Styled.ScreenOut>이전</Styled.ScreenOut>
        </button>
        <button ref={nextButtonRef} className="next-button">
          <HiChevronDoubleRight className="icon" />
          <Styled.ScreenOut>다음</Styled.ScreenOut>
        </button>
      </Styled.PhotoSwiperWrap>
    </>
  );
}

export default SwiperComponent;
