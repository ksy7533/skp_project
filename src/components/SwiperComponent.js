import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import styled, { css } from "styled-components";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from "react-icons/hi";
import RWD from "../styles/rwd";
import Colors from "../styles/colors";
import "swiper/css";
import img01 from "../images/img_01.jpg";
import img02 from "../images/img_02.jpg";
import img03 from "../images/img_03.jpg";
import img04 from "../images/img_04.jpg";
import img05 from "../images/img_05.jpg";
import img06 from "../images/img_06.jpg";

const PHOTO_LIST_DATA = [
  {
    id: 1,
    src: img01,
    name: "샌드위치"
  },
  {
    id: 2,
    src: img02,
    name: "파스타"
  },
  {
    id: 3,
    src: img03,
    name: "피자"
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
    position: relative;

    .prev-button,
    .next-button {
      display: none;
      z-index: 10;
      position: absolute;
      top: 50%;
      padding: 0;
      transform: translateY(-50%);

      .icon {
        vertical-align: middle;
        width: 30px;
        height: 30px;
        color: ${Colors.GRAY};
        font-size: 4rem;
      }
    }

    .prev-button {
      left: 0;
    }

    .next-button {
      right: 0;
    }

    ${({ sideShadow }) => {
      switch (sideShadow) {
        case "left":
          return css`
            .prev-button {
              display: block;
            }
          `;
        case "right":
          return css`
            .next-button {
              display: block;
            }
          `;
        default:
          return css`
            .prev-button,
            .next-button {
              display: block;
            }
          `;
      }
    }}

    .tag-swiper {
      margin-bottom: 2rem;

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

    .swiper.photo-swiper {
      height: 50rem;

      .swiper-slide {
        img {
          height: 100%;
          object-fit: cover;
        }
      }

      @media screen and (min-width: ${RWD.TABLET}px) {
        height: auto;
      }
    }

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
  const tagSwiperRef = useRef(null);
  const [sideShadowClassName, setSideShadowClassName] = useState("");

  const handleClickTag = useCallback(
    id => {
      const index = PHOTO_LIST_DATA.findIndex(item => {
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
      return PHOTO_LIST_DATA.map((item, index) => {
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
  }, [currentIndex, handleClickTag]);

  const renderPhotoSwiperSlide = useMemo(() => {
    return () => {
      return PHOTO_LIST_DATA.map(item => {
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

  useEffect(() => {
    const swiper = tagSwiperRef.current;
    const slides = swiper.slides;
    const slideTotalWidth = slides.reduce(
      (acc, currentValue) => acc + currentValue.offsetWidth,
      0
    );
    const selectedTargetLeft =
      slides[currentIndex].offsetLeft + slides[currentIndex].offsetWidth / 2;
    const swiperWidthHalf = swiper.width / 2;
    let positionLeft = 0;

    if (swiperWidthHalf > selectedTargetLeft) {
      positionLeft = 0;
      setSideShadowClassName("right");
    } else if (swiperWidthHalf > slideTotalWidth - selectedTargetLeft) {
      positionLeft = slideTotalWidth - swiper.width;
      setSideShadowClassName("left");
    } else {
      positionLeft = selectedTargetLeft - swiperWidthHalf;
      setSideShadowClassName("both");
    }
    swiper.translateTo(-positionLeft, 500);
  }, [currentIndex]);

  const handleClickTagNaviButton = useCallback(
    direction => {
      return () => {
        if (direction === "prev") {
          tagSwiperRef.current.slidePrev();
          photoSwiperRef.current.slidePrev();
        } else {
          tagSwiperRef.current.slideNext();
          photoSwiperRef.current.slideNext();
        }
      };
    },
    [tagSwiperRef, photoSwiperRef]
  );

  return (
    <>
      <Styled.TagSwiperWrap sideShadow={sideShadowClassName}>
        <Swiper
          onSwiper={swiper => (tagSwiperRef.current = swiper)}
          slidesPerView="auto"
          className="tag-swiper"
        >
          {renderTagSwiperSlide()}
        </Swiper>
        <button
          className="prev-button"
          onClick={handleClickTagNaviButton("prev")}
        >
          <HiOutlineChevronLeft className="icon" />
          <Styled.ScreenOut>이전</Styled.ScreenOut>
        </button>
        <button
          className="next-button"
          onClick={handleClickTagNaviButton("next")}
        >
          <HiOutlineChevronRight className="icon" />
          <Styled.ScreenOut>다음</Styled.ScreenOut>
        </button>
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
