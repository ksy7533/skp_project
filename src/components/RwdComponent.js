import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import RWD from "../styles/rwd";
import { throttle } from "lodash";

import img01 from "../images/img_01.jpg";
import img02 from "../images/img_02.jpg";
import img03 from "../images/img_03.jpg";
import img04 from "../images/img_04.jpg";
import img05 from "../images/img_05.jpg";
import img06 from "../images/img_06.jpg";

/**
 * IMG_LIST에 값에 따라 이미지가 유동적으로 변경한다
 */

const IMG_LIST = [
  {
    src: img01,
    name: "샌드위치"
  },
  {
    src: img02,
    name: "파스타"
  },
  {
    src: img03,
    name: "피자"
  },
  {
    src: img04,
    name: "꼬치"
  },
  {
    src: img05,
    name: "스테이크"
  },
  {
    src: img06,
    name: "캘리포니아롤"
  }
];

const Styled = {
  Wrap: styled.div`
    padding-bottom: 3rem;

    .wrap-img {
      padding: 0 1rem;
      transform: translateY(50px);
      opacity: 0;
      transition: 0.6s all;

      &:not(:first-of-type) {
        padding-top: 1rem;
      }

      img {
        object-fit: cover;
      }

      @media screen and (min-width: ${RWD.TABLET}px) {
        transform: translateY(0);
        opacity: 1;
      }

      &.active {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @media screen and (min-width: ${RWD.TABLET}px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 300px 300px;
      gap: 1rem;
      height: 612px;
      padding: 0 1rem 3rem;

      .wrap-img {
        padding: 0;

        &:not(:first-of-type) {
          padding-top: 0;
        }

        &:nth-child(1) {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }
        &:nth-child(2) {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
        &:nth-child(3) {
          grid-column: 1 / 3;
          grid-row: 2 / 3;
        }
        &:nth-child(4) {
          grid-column: 3 / 4;
          grid-row: 1 / 3;
        }
        &:nth-child(5) {
          grid-column: 4 / 5;
          grid-row: 1 / 2;
        }
        &:nth-child(6) {
          grid-column: 4 / 5;
          grid-row: 2 / 3;
        }

        img {
          height: 100%;
        }
      }
    }
  `
};

function RwdComponent() {
  const imgRefs = useRef([]);

  /**
   * 각 이미지 리스트 위치에 스크롤이 이동할때 이미지가 아래에서 위로 스르륵 올라오는 애니메이션 구현
   */
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;

      if (document.body.clientWidth > RWD.TABLET) {
        imgRefs.current.forEach(item => {
          item.classList.remove("active");
        });
      }

      imgRefs.current.forEach((item, index) => {
        const TRIGGER_MARGIN = index === 0 ? 500 : 600;
        if (scrollY > item.offsetTop - TRIGGER_MARGIN) {
          item.classList.add("active");
        }
      });
    }, 100);

    document.addEventListener("scroll", handleScroll, false);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [imgRefs]);

  /**
   * 이미지 리트스 렌더
   */
  const renderImgList = () => {
    return IMG_LIST.map((item, index) => {
      return (
        <div
          className="wrap-img"
          key={index}
          ref={el => (imgRefs.current[index] = el)}
        >
          <img src={item.src} alt={item.name} />
        </div>
      );
    });
  };

  return <Styled.Wrap>{renderImgList()}</Styled.Wrap>;
}

export default RwdComponent;
