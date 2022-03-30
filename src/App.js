import styled, { css } from "styled-components";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { throttle } from "lodash";
import smoothscroll from "smoothscroll-polyfill";

import Colors from "./styles/colors";
import RWD from "./styles/rwd";

import MotionComponent from "./components/MotionComponent";
import RwdComponent from "./components/RwdComponent";
import SwiperComponent from "./components/SwiperComponent";

/**
 * SECTION_LIST에 값에 따라 섹션콤포넌트 유동적으로 변경
 * 섹션 리스트값 변경해도 스크롤시 메뉴변경이나, 메뉴 클릭시 해당 섹션으로 이동 가능하도록 적용
 */

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

          &:nth-child(odd) {
            border-right: 1px solid ${Colors.GRAY};
            border-bottom: 1px solid ${Colors.GRAY};
          }

          &:nth-child(even) {
            border-right: 1px solid ${Colors.GRAY};
            border-bottom: 1px solid ${Colors.GRAY};
          }
          &:nth-child(3n) {
            border-right: 0;
          }
        }
      }
    }

    ${({ listLength, isMobile }) => {
      const columnNumber = isMobile ? 2 : 3; // 너비에 따라 2 or 3
      const restNumber = listLength % columnNumber;

      if (listLength % columnNumber === 0) {
        return css`
          nav {
            a {
              &:nth-last-child(-n + ${columnNumber}) {
                border-bottom: 0;
              }
            }
          }
        `;
      } else {
        return css`
          nav {
            a {
              &:nth-last-child(-n + ${restNumber}) {
                border-bottom: 0;
              }
            }
          }
        `;
      }
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
  const [isFixed, setIsFixed] = useState(false); // 메뉴 상단 고정 여부
  const [menuOffsetTop, setMenuOffsetTop] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // 모바일 너비 인지 여부

  /**
   * 메뉴 클릭할때 해당 위치로 부드럽게 이동
   */
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

  /**
   * 앱이 실행될때 기본적으로 필요한 것들 셋팅
   */
  useEffect(() => {
    smoothscroll.polyfill();
    setMenuHeight(menuRef.current.offsetHeight);
    setMenuOffsetTop(menuRef.current.offsetTop);
    setIsMobile(window.innerWidth <= RWD.TABLET);
  }, []);

  /**
   * 스크롤이 해당 섹션 상단 위치로 이동할때 해당 메뉴로 변경되기 위함
   * 메뉴 리스트 갯수가 변경되도 대응 되도록 적용
   */
  useEffect(() => {
    const handleScroll = throttle(() => {
      const TRIGGER_MARGIN = 200; // 타겟위치값 보다 얼마나 이전에 이벤트가 발생할 것인가
      const scrollY = window.scrollY;

      menuOffsetTop - 1 <= scrollY ? setIsFixed(true) : setIsFixed(false);

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
  }, [menuHeight, menuOffsetTop]);

  /**
   * 윈도우창 사이즈 변경될때 마다 isMobile(모바일 너비) 인지 확인
   */
  useEffect(() => {
    const handleResize = throttle(() => {
      const { innerWidth } = window;
      innerWidth <= RWD.TABLET ? setIsMobile(true) : setIsMobile(false);
    }, [100]);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  /**
   * 메뉴 리스트 렌더
   */
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

  /**
   * 섹션 리스트 렌더
   */
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
          listLength={SECTION_LIST.length}
          isMobile={isMobile}
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
