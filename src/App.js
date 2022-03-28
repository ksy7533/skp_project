import styled, { css } from "styled-components";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { throttle } from "lodash";
import smoothscroll from "smoothscroll-polyfill";

import Colors from "./styles/colors";
import RWD from "./styles/rwd";

import MotionComponent from "./components/MotionComponent";
import RwdComponent from "./components/RwdComponent";
import SwiperComponent from "./components/SwiperComponent";

const SECTION_LIST = [
  {
    name: "Motion",
    component: MotionComponent
  },
  {
    name: "Responsive Web Design",
    component: RwdComponent,
    bgColor: Colors.GRAY
  },
  {
    name: "Swiper",
    component: SwiperComponent
  },
  {
    name: "Motion",
    component: MotionComponent
  },
  {
    name: "Motion",
    component: MotionComponent
  }
];

const Styled = {
  Wrap: styled.div`
    @media screen and (min-width: ${RWD.TABLET}px) {
      max-width: 1024px;
      margin: 0 auto;
    }
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
    z-index: 400;
    position: sticky;
    top: 0;
    padding: 2rem;
    background-color: ${Colors.WHITE};
    transition: 0.4s box-shadow;

    ${({ isFixed }) => {
      return (
        isFixed &&
        css`
          box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1);
        `
      );
    }}

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
        font-size: 1.1rem;


        /* &:nth-child(-n + 2) {
          border-bottom: 1px solid ${Colors.GRAY};
        } */

        &:nth-child(odd) {
          border-right: 1px solid ${Colors.GRAY};
          border-bottom: 1px solid ${Colors.GRAY};
        }

        &:nth-child(even) {
          border-bottom: 1px solid ${Colors.GRAY};
        }

        &.on {
          color: ${Colors.WHITE};
          background-color: ${Colors.BLUE};
          transition: 0.4s background-color;
        }

        @media screen and (min-width: ${RWD.TABLET}px) {
          width: 33.33%;
          border-right: 0;
          border-bottom: 0;
          border-top: 0;

          &:nth-child(-n + 2) {
            border-bottom: 0;
          }

          &:nth-child(odd) {
            border-right: 0;
          }

          &:not(:first-of-type) {
            border-left: 1px solid ${Colors.GRAY};
          }
        }
      }
    }

    

    ${({ isEven }) => {
      console.log(isEven);
      return isEven
        ? css`
            nav {
              a {
                &:nth-last-child(-n + 2) {
                  border-bottom: 0;
                }
              }
            }
          `
        : css`
            nav {
              a {
                &:nth-last-child(-n + 1) {
                  border-bottom: 0;
                }
              }
            }
          `;
    }}
  `,

  Container: styled.main``,

  Section: styled.section`
    ${({ bgColor }) => {
      return (
        bgColor &&
        css`
          background-color: ${bgColor};
        `
      );
    }}
  `,

  Title: styled.h2`
    padding: 6rem 2rem 2rem;

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
    padding: 8rem 1rem;
    background-color: ${Colors.GRAY};

    p {
      text-align: right;
      color: ${Colors.BLACK};
      font-size: 2rem;
      font-weight: bold;

      @media screen and (min-width: ${RWD.TABLET}px) {
        max-width: 1024px;
        margin: 0 auto;
      }
    }
  `
};

function App() {
  const sectionRefs = useRef([]);
  const menuRef = useRef();
  const [menuIndex, setMenuIndex] = useState(0);
  const [menuHeight, setMenuHeight] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [menuOffset, setMenuOffset] = useState(0);

  const handleMenuClick = useCallback(
    index => {
      return e => {
        e.preventDefault();
        if (menuIndex === index) return;

        window.scroll({
          behavior: "smooth",
          left: 0,
          top: sectionRefs.current[index].offsetTop - menuHeight
        });
      };
    },
    [menuIndex, menuHeight]
  );

  useEffect(() => {
    smoothscroll.polyfill();
    setMenuHeight(menuRef.current.offsetHeight);
    setMenuOffset(menuRef.current.offsetTop);
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const TRIGGER_MARGIN = 200;
      const scrollY = window.scrollY;

      menuOffset - 1 <= scrollY ? setIsFixed(true) : setIsFixed(false);

      if (sectionRefs.current[1].offsetTop - TRIGGER_MARGIN > scrollY) {
        setMenuIndex(0);
        return;
      }

      for (let index = 1; index < sectionRefs.current.length - 1; index++) {
        if (
          sectionRefs.current[index].offsetTop - TRIGGER_MARGIN <= scrollY &&
          sectionRefs.current[index + 1].offsetTop - TRIGGER_MARGIN > scrollY
        ) {
          setMenuIndex(index);
          break;
        }
      }

      if (
        sectionRefs.current[sectionRefs.current.length - 1].offsetTop -
          TRIGGER_MARGIN <
        scrollY
      ) {
        setMenuIndex(sectionRefs.current.length - 1);
      }
    }, 100);

    document.addEventListener("scroll", handleScroll, false);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [menuHeight, menuOffset]);

  const renderMenuList = useMemo(() => {
    return SECTION_LIST.map((item, index) => {
      return (
        <a
          href="#"
          onClick={handleMenuClick(index)}
          className={menuIndex === index ? "on" : ""}
          key={index}
        >
          {item.name}
        </a>
      );
    });
  }, [handleMenuClick, menuIndex]);

  const renderSectionList = useMemo(() => {
    return SECTION_LIST.map((item, index) => {
      return (
        <Styled.Section
          ref={el => (sectionRefs.current[index] = el)}
          key={index}
          bgColor={item.bgColor}
        >
          <Styled.Title>
            <strong>{item.name}</strong>
          </Styled.Title>
          <item.component />
        </Styled.Section>
      );
    });
  }, []);

  return (
    <div className="App">
      <Styled.Wrap>
        <Styled.Header>
          <h1>SKP Homework</h1>
          <p>각 섹션을 참고하여 그대로 레이아웃을 구현해 주세요.</p>
        </Styled.Header>

        <Styled.Menu
          ref={menuRef}
          isFixed={isFixed}
          isEven={SECTION_LIST.length % 2 === 0}
        >
          <nav>{renderMenuList}</nav>
        </Styled.Menu>

        <Styled.Container>{renderSectionList}</Styled.Container>
      </Styled.Wrap>

      <Styled.Footer>
        <p>SK Planet, ALL RIGHT RESERVED</p>
      </Styled.Footer>
    </div>
  );
}

export default App;
