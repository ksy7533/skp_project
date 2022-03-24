import styled from "styled-components";

import Colors from "./styles/colors";

import MotionComponent from "./components/MotionComponent";
import RwdComponent from "./components/RwdComponent";
import SwiperComponent from "./components/SwiperComponent";

const Styled = {
  Wrap: styled.div`
    width: 100%;
    height: 100%;
  `,

  Header: styled.header`
    text-align: center;

    h1 {
      padding: 6rem 2rem 2rem;
      color: ${Colors.BLACK};
      font-size: 3rem;
      font-weight: bold;
    }

    p {
      padding-bottom: 1rem;
      font-size: 1.4rem;
    }
  `,

  Nav: styled.nav`
    display: flex;
    flex-wrap: wrap;
    margin: 2rem;
    border: 1px solid ${Colors.GRAY};

    a {
      box-sizing: border-box;
      text-align: center;
      display: block;
      padding: 1.4rem 2rem;
      width: 50%;
      font-size: 1.2rem;

      &:nth-child(-n + 2) {
        border-bottom: 1px solid ${Colors.GRAY};
      }

      &:nth-child(odd) {
        border-right: 1px solid ${Colors.GRAY};
      }
    }
  `,

  Container: styled.main``,

  Section: styled.section``,

  Title: styled.h2`
    padding: 2rem;

    strong {
      display: inline-block;
      padding-top: 0.5rem;
      color: ${Colors.BLACK};
      font-weight: bold;
      font-size: 2.4rem;
      border-top: 2px solid ${Colors.BLACK};
    }
  `,

  Footer: styled.footer`
    padding: 4rem 1rem;

    p {
      text-align: right;
      color: ${Colors.BLACK};
      font-size: 2rem;
      font-weight: bold;
    }
  `
};

function App() {
  return (
    <div className="App">
      <Styled.Wrap>
        <Styled.Header>
          <h1>SKP Homework</h1>
          <p>각 섹션을 참고하여 그대로 레이아웃을 구현해 주세요.</p>
        </Styled.Header>

        <Styled.Nav>
          <a href="#">Motion</a>
          <a href="#">Responsive Web Design</a>
          <a href="#">Swiper</a>
        </Styled.Nav>

        <Styled.Container>
          <Styled.Section>
            <Styled.Title>
              <strong>Motion</strong>
            </Styled.Title>
            <MotionComponent></MotionComponent>
          </Styled.Section>
          <Styled.Section>
            <Styled.Title>
              <strong>Responsive Web Design</strong>
            </Styled.Title>
            <RwdComponent></RwdComponent>
          </Styled.Section>
          <Styled.Section>
            <Styled.Title>
              <strong>Swiper</strong>
            </Styled.Title>
            <SwiperComponent></SwiperComponent>
          </Styled.Section>
        </Styled.Container>

        <Styled.Footer>
          <p>SK Planet, ALL RIGHT RESERVED</p>
        </Styled.Footer>
      </Styled.Wrap>
    </div>
  );
}

export default App;
