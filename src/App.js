import styled, { keyframes } from "styled-components";

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

  Text: styled.p`
    font-weight: 700;
  `
};

function App() {
  return (
    <div className="App">
      <Styled.MotionBox>
        <div className="circle"></div>
        <div className="bg-white"></div>
        <div className="bar"></div>
      </Styled.MotionBox>

      <Styled.Text>한글테스트</Styled.Text>
      <p>sdfl sk fd</p>
    </div>
  );
}

export default App;
