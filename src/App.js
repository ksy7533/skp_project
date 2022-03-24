import styled, { keyframes } from "styled-components";

const baseCircleColor = "#fe0955"; // 기본 원의 색
const circleColors = ["#ffd35c", "#29afff", "#50ebc3", "#fb9f5f"]; // 변경되는 원의 색
const KEYFRAMES_STEP = 4;

const fadeKeyframes = () => {
  let result = "";
  const circleColorsLength = circleColors.length;
  for (
    let index = 0;
    index < circleColorsLength * KEYFRAMES_STEP + 1;
    index++
  ) {
    const percent = (100 / (circleColorsLength * KEYFRAMES_STEP)) * index;
    if (index === 0) {
      result = `
        ${result}
        0% { 
          opacity: 1;
          transform: translateX(0);
          background-color: ${baseCircleColor};
        }
        
      `;
    } else if (index % KEYFRAMES_STEP === 1) {
      result = `
        ${result}
        ${percent}% {
          opacity: 0;
          transform: translateX(86px);
        }
      `;
    } else if (index % KEYFRAMES_STEP === 2) {
      result = `
        ${result}
        ${percent - 100 / (circleColorsLength * KEYFRAMES_STEP) / 2}% {
          transform: translateX(172px);
        }
        ${percent}% {
          opacity: 1;
          transform: translateX(172px);
          background-color: ${circleColors[Math.floor(index / KEYFRAMES_STEP)]};
        }
      `;
    } else if (index % KEYFRAMES_STEP === 3) {
      result = `
        ${result}
        ${percent}% {
          opacity: 0;
          transform: translateX(86px);
        }
      `;
    } else if (index % KEYFRAMES_STEP === 0) {
      result = `
        ${result}
        ${percent - 100 / (circleColorsLength * KEYFRAMES_STEP) / 2}% {
          transform: translateX(0);
        }
        ${percent}% {
          opacity: 1;
          transform: translateX(0);
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
    width: 258px;
    height: 210px;

    .bar {
      position: absolute;
      left: 128px;
      top: 30px;
      width: 2px;
      height: 132px;
      background-color: #e7e7e7;
    }

    .circle {
      position: absolute;
      top: 30px;
      left: 0;
      width: 86px;
      height: 86px;
      border-radius: 50%;
      animation: ${fadeKeyframes()}
        ${450 * KEYFRAMES_STEP * circleColors.length}ms 0ms infinite ease-in-out
        normal;
    }

    .bg-white {
      position: absolute;
      top: 0;
      left: 129px;
      width: 129px;
      height: 210px;
      background-color: white;
      animation: ${rotate} 900ms 0ms infinite ease-in-out alternate;
      transform: rotateY(0deg);
      transform-origin: 0% 0%;
    }
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
    </div>
  );
}

export default App;
