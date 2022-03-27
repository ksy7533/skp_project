import React from "react";
import styled from "styled-components";
import RWD from "../styles/rwd";

import img01 from "../images/img_01.jpg";
import img02 from "../images/img_02.jpg";
import img03 from "../images/img_03.jpg";
import img04 from "../images/img_04.jpg";
import img05 from "../images/img_05.jpg";
import img06 from "../images/img_06.jpg";

const Styled = {
  Wrap: styled.div`
    padding-bottom: 3rem;

    .wrap-img {
      padding: 0 1rem;

      &:not(:first-of-type) {
        padding-top: 1rem;
      }

      img {
        object-fit: cover;
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
  return (
    <Styled.Wrap>
      <div className="wrap-img">
        <img src={img01} alt="샌드위치 이미지" />
      </div>
      <div className="wrap-img">
        <img src={img02} alt="파스타 이미지" />
      </div>
      <div className="wrap-img">
        <img src={img03} alt="피자 이미지" />
      </div>
      <div className="wrap-img">
        <img src={img04} alt="꼬치 이미지" />
      </div>
      <div className="wrap-img">
        <img src={img05} alt="스테이크 이미지" />
      </div>
      <div className="wrap-img">
        <img src={img06} alt="캘리포니아롤 이미지" />
      </div>
    </Styled.Wrap>
  );
}

export default RwdComponent;
