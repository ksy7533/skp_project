import React from "react";
import styled, { keyframes } from "styled-components";
import Colors from "../styles/colors";

/**
 * 모션 콤포넌트
 * - CSS 애니메이션 속성을 이용하여 구현한다
 * - 좌측 원, 가운데 바, 우측 흰색 네모로 구성되어 있다
 * - 좌측 원이 가운데로 이동할때 마치 쏘옥 들어가서 쏘옥 나가는 모습을 구현 하기 위해
 *   가운데 바를 축으로 우측에 있는 흰색 네모가 회전하도록 만들어 들어가는 순간 원의 절반이 보이지 않고
 *   나갈때도 원의 반쪽이 가려져 있는것 처럼 보이도록 한다
 * - 애니메이션은 모든 색이 전부 바뀔때까지를 한 싸이클로 본다 (변경되는 원의 색 x KEYFRAMES_STEP)
 */

const BASE_CIRCLE_COLOR = "#fe0955"; // 기본 원의 색
const CIRCLE_COLORS = ["#ffd35c", "#29afff", "#50ebc3", "#fb9f5f"]; // 변경되는 원의 색
/**
 * KEYFRAMES_STEP
 * - 오른쪽 원의 색이 한번 변하는 것이 1회 왕복이라고 했을때 아래와 같이 4단계로 나뉨
 * 1. 왼쪽   -> 가운데
 * 2. 가운데 -> 오른쪽
 * 3. 오른쪽 -> 가운데
 * 4. 가운데 -> 왼쪽
 */
const KEYFRAMES_STEP = 4;
const BOX_WIDTH = 258;
const BOX_HEIGHT = 210;
const CIRCLE_WIDTH = 84;
const CIRCLE_HEIGHT = 84;
const DURATION = 450;
const BAR_WIDTH = 2;
const BAR_HEIGHT = 132;

const fadeKeyframes = () => {
  const CIRCLE_COLORS_LENGTH = CIRCLE_COLORS.length;
  const TRANSLATE_X_DISTANCE = BOX_WIDTH - CIRCLE_WIDTH; // 원의 이동 거리
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

    .bg-white-wrap {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 200;
      width: 100%;
      height: 100%;

      .bg-white {
        position: absolute;
        top: 0;
        right: 0;
        width: ${BOX_WIDTH / 2}px;
        height: ${BOX_HEIGHT}px;
        background-color: ${Colors.WHITE};
        animation: ${rotate} ${DURATION * 2}ms 0ms infinite ease-in-out
          alternate;
        transform: rotateY(0deg);
        transform-origin: 0% 0%;
      }
    }

    .circle-wrap {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;

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
    }

    .bar {
      z-index: 300;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0 auto;
      width: ${BAR_WIDTH}px;
      height: ${BAR_HEIGHT}px;
      background-color: #e7e7e7;
      transform: translate(-50%, -50%);
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
        top: 9px;
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
        <div className="circle-wrap">
          <div className="circle"></div>
        </div>

        <div className="bg-white-wrap">
          <div className="bg-white"></div>
        </div>

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
