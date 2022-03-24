import React from "react";
import styled, { keyframes } from "styled-components";
import Colors from "../styles/colors";

const BASE_CIRCLE_COLOR = "#fe0955"; // 기본 원의 색
const CIRCLE_COLORS = ["#ffd35c", "#29afff", "#50ebc3", "#fb9f5f"]; // 변경되는 원의 색
const KEYFRAMES_STEP = 4;
const BOX_WIDTH = 258;
const BOX_HEIGHT = 210;
const CIRCLE_WIDTH = 84;
const CIRCLE_HEIGHT = 84;
const DURATION = 450;

const fadeKeyframes = () => {
  const CIRCLE_COLORS_LENGTH = CIRCLE_COLORS.length;
  const TRANSLATE_X_DISTANCE = BOX_WIDTH - CIRCLE_WIDTH;
  let result = "";

  for (
    let index = 0;
    index < CIRCLE_COLORS_LENGTH * KEYFRAMES_STEP + 1;
    index++
  ) {
    const percent = (100 / (CIRCLE_COLORS_LENGTH * KEYFRAMES_STEP)) * index;
    if (index === 0) {
      result = `
        ${result}
        0% { 
          opacity: 1;
          transform: translate(0, -50%);
          background-color: ${BASE_CIRCLE_COLOR};
        }
        
      `;
    } else if (index % KEYFRAMES_STEP === 1) {
      result = `
        ${result}
        ${percent}% {
          opacity: 0;
          transform: translate(${TRANSLATE_X_DISTANCE / 2}px, -50%);
        }
      `;
    } else if (index % KEYFRAMES_STEP === 2) {
      result = `
        ${result}
        ${percent - 100 / (CIRCLE_COLORS_LENGTH * KEYFRAMES_STEP) / 2}% {
          transform: translate(${TRANSLATE_X_DISTANCE}px, -50%);
        }
        ${percent}% {
          opacity: 1;
          transform: translate(${TRANSLATE_X_DISTANCE}px, -50%);
          background-color: ${
            CIRCLE_COLORS[Math.floor(index / KEYFRAMES_STEP)]
          };
        }
      `;
    } else if (index % KEYFRAMES_STEP === 3) {
      result = `
        ${result}
        ${percent}% {
          opacity: 0;
          transform: translate(${TRANSLATE_X_DISTANCE / 2}px, -50%);
        }
      `;
    } else if (index % KEYFRAMES_STEP === 0) {
      result = `
        ${result}
        ${percent - 100 / (CIRCLE_COLORS_LENGTH * KEYFRAMES_STEP) / 2}% {
          transform: translate(0, -50%);
        }
        ${percent}% {
          opacity: 1;
          transform: translate(0, -50%);
          background-color: #fe0955;
        }
      `;
    }
  }

  return keyframes`${result}`;
};

const rotate = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

const Styled = {
  MotionBox: styled.div`
    position: relative;
    margin: 0 auto;
    width: ${BOX_WIDTH}px;
    height: ${BOX_HEIGHT}px;

    .bar {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0 auto;
      width: 2px;
      height: 132px;
      background-color: #e7e7e7;
      transform: translate(-50%, -50%);
    }

    .circle {
      position: absolute;
      top: 50%;
      left: 0;
      width: ${CIRCLE_WIDTH}px;
      height: ${CIRCLE_HEIGHT}px;
      border-radius: 50%;
      animation: ${fadeKeyframes()}
        ${DURATION * KEYFRAMES_STEP * CIRCLE_COLORS.length}ms 0ms infinite
        ease-in-out normal;
    }

    .bg-white {
      position: absolute;
      top: 0;
      right: 0;
      width: ${BOX_WIDTH / 2}px;
      height: ${BOX_HEIGHT}px;
      background-color: white;
      animation: ${rotate} ${DURATION * 2}ms 0ms infinite ease-in-out alternate;
      transform: rotateY(0deg);
      transform-origin: 0% 0%;
    }
  `,

  Title: styled.h3`
    padding: 2rem;
    color: ${Colors.BLACK};
    font-size: 1.4rem;
    font-weight: bold;
  `,

  List: styled.ul`
    padding: 0 2rem 2rem;

    li {
      position: relative;
      padding-left: 1rem;
      font-size: 1.2rem;

      &:before {
        content: "";
        position: absolute;
        top: 6px;
        left: 0;
        display: block;
        width: 2px;
        height: 2px;
        background-color: ${Colors.BLACK};
      }

      &:not(:first-of-type) {
        margin-top: 0.8rem;
      }

      .highlight {
        color: ${Colors.RED};
      }
    }
  `
};

function MotionComponent() {
  return (
    <>
      <Styled.MotionBox>
        <div className="circle"></div>
        <div className="bg-white"></div>
        <div className="bar"></div>
      </Styled.MotionBox>

      <Styled.Title>모션 공통</Styled.Title>
      <Styled.List>
        <li>
          box size : 258px * 210px 
          <span className="highlight">
            * box size는 모션을 감싸는 box의 기본 size
          </span>
        </li>
        <li>
          circle size : 86px * 86px 
          <span className="highlight">
            * 각 circle은 box 내에서 수직 중앙 정렬
          </span>
        </li>
        <li>
          bar size : 2px * 132px (bg-color : #e7e7e7) 
          <span className="highlight">
            * bar 위치는 박스 (258px * 210px) 내에서 정중앙
          </span>
        </li>
        <li>
          circle in & out 시 opacity Duration 450ms 적용  
          <span className="highlight">
            * Duration 값은 참고사항으로 근사치 값 허용
          </span>
        </li>
        <li>
          circle in & out 시 moving Duration 450ms 적용 
          <span className="highlight">
            * Duration 값은 참고사항으로 근사치 값 허용
          </span>
        </li>
      </Styled.List>

      <Styled.Title>왼쪽 원</Styled.Title>
      <Styled.List>
        <li>bg-color : #fe0955</li>
      </Styled.List>

      <Styled.Title>오른쪽 원</Styled.Title>
      <Styled.List>
        <li>bg-color01 : #ffd35c</li>
        <li>bg-color02 : #29afff</li>
        <li>bg-color03 : #50ebc3</li>
        <li>bg-color04 : #fb9f5f</li>
        <li>
          ※ 각 bg-color 값이 circle out 시 bg-color01~04번 순서대로 색상이
          변경되도록 코드 작성
        </li>
      </Styled.List>
    </>
  );
}

export default MotionComponent;
