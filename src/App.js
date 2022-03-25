import styled from "styled-components";
import { useRef, useState, useEffect, useCallback } from "react";
import { throttle } from "lodash";

import Colors from "./styles/colors";

import MotionComponent from "./components/MotionComponent";
import RwdComponent from "./components/RwdComponent";
import SwiperComponent from "./components/SwiperComponent";

const MENU_HEIGHT = 132;

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

  Menu: styled.div`
    z-index: 10;
    position: sticky;
    top: 0;
    padding: 2rem;
    background-color: ${Colors.WHITE};

    nav {
      display: flex;
      flex-wrap: wrap;
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

        &.on {
          color: ${Colors.WHITE};
          background-color: ${Colors.BLUE};
          transition: 0.4s background-color;
        }
      }
    }
  `,

  Container: styled.main``,

  Section: styled.section``,

  Title: styled.h2`
    scroll-margin-top: ${MENU_HEIGHT}px;
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
  const titleRefs = useRef([]);
  const [menuIndex, setMenuIndex] = useState(0);

  const handleMenuClick = useCallback(index => {
    return e => {
      e.preventDefault();
      titleRefs.current[index].scrollIntoView({
        behavior: "smooth"
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      if (titleRefs.current[1].offsetTop - MENU_HEIGHT - 1 > scrollY) {
        setMenuIndex(0);
      } else if (
        titleRefs.current[1].offsetTop - MENU_HEIGHT - 1 <= scrollY &&
        titleRefs.current[2].offsetTop - MENU_HEIGHT - 1 > scrollY
      ) {
        setMenuIndex(1);
      } else {
        setMenuIndex(2);
      }
    }, 100);

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <Styled.Wrap>
        <Styled.Header>
          <h1>SKP Homework</h1>
          <p>각 섹션을 참고하여 그대로 레이아웃을 구현해 주세요.</p>
        </Styled.Header>

        <Styled.Menu>
          <nav>
            <a
              href="#"
              onClick={handleMenuClick(0)}
              className={menuIndex === 0 ? "on" : ""}
            >
              Motion
            </a>
            <a
              href="#"
              onClick={handleMenuClick(1)}
              className={menuIndex === 1 ? "on" : ""}
            >
              Responsive Web Design
            </a>
            <a
              href="#"
              onClick={handleMenuClick(2)}
              className={menuIndex === 2 ? "on" : ""}
            >
              Swiper
            </a>
          </nav>
        </Styled.Menu>

        <Styled.Container>
          <Styled.Section>
            <Styled.Title ref={el => (titleRefs.current[0] = el)}>
              <strong>Motion</strong>
            </Styled.Title>
            <MotionComponent></MotionComponent>
          </Styled.Section>
          <Styled.Section>
            <Styled.Title ref={el => (titleRefs.current[1] = el)}>
              <strong>Responsive Web Design</strong>
            </Styled.Title>
            <RwdComponent></RwdComponent>
          </Styled.Section>
          <Styled.Section>
            <Styled.Title ref={el => (titleRefs.current[2] = el)}>
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
