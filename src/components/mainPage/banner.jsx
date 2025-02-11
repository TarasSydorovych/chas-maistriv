// import "./mainPage.css";

// import { HandySvg } from "handy-svg";
// import iconSrc from "../../svg/pta.svg";
// import arrow from "../../svg/arrow.svg";
// import { useState } from "react";
// import ChouseBook from "../popUp/chouseBook";

// export default function Banner({ windowDimensions }) {
//   const [chose, setChose] = useState(false);
//   const over = () => {
//     setChose(true);
//   };
//   const leave = () => {
//     setChose(false);
//   };

//   return (
//     <div className="bannerWrapperAll">
//       <div className="bannerWrapper">
//         <div className="bannerText">
//           <h1 className="banerH1">Знаю як</h1>
//           <p className="bannerP">Цінний досвід в книзі</p>
//           <p className="bannerP">
//             Ми ті, хто створює книгу з ідеї, з першоелемента, як Малевич, від
//             чорного квадрата до великого барвистого світу, яким цікаво й корисно
//             мандрувати. Ми прагнемо долучати до створення книги Майстрів.
//             Засобами тексту й зображень вкладаємо в дитячу книгу їхній цінний
//             досвід, який захоплює і допомагає дітям знайти свій шлях Майстра.
//             Настав час Майстрів!
//           </p>
//           <button
//             className="bannerButton"
//             onMouseOver={over}
//             onMouseLeave={leave}
//           >
//             Допомагаємо обрати книгу
//           </button>
//           {chose && <ChouseBook />}
//         </div>
//         <div className="bannerIcon">
//           {windowDimensions && (
//             <HandySvg src={iconSrc} width="972.27" height="512.83" />
//           )}
//           {!windowDimensions && (
//             <HandySvg src={iconSrc} width="381" height="201" />
//           )}
//         </div>
//       </div>
//       <HandySvg
//         src={arrow}
//         className="arrovIconBanner"
//         width="52"
//         height="49.56"
//       />
//     </div>
//   );
// }
import "./mainPage.css";

import { HandySvg } from "handy-svg";
import iconSrc from "../../svg/pta.svg";
import arrow from "../../svg/arrow.svg";
import { useState } from "react";
import ChouseBook from "../popUp/chouseBook";

export default function Banner({ windowDimensions }) {
  const [chose, setChose] = useState(false);
  const over = () => {
    setChose(true);
  };
  const leave = () => {
    setChose(false);
  };

  return (
    <div className="bannerWrapperAll">
      <div className="bannerWrapper">
        <div className="bannerText">
          <h1 className="banerH1">Знаю як</h1>
          <p className="bannerP">Цінний досвід в книзі</p>
          <p className="bannerP">
            Ми ті, хто створює книгу з ідеї, з першоелемента, як Малевич, від
            чорного квадрата до великого барвистого світу, яким цікаво й корисно
            мандрувати. Ми прагнемо долучати до створення книги Майстрів.
            Засобами тексту й зображень вкладаємо в дитячу книгу їхній цінний
            досвід, який захоплює і допомагає дітям знайти свій шлях Майстра.
            Настав час Майстрів!
          </p>
          <button
            className="bannerButton"
            onMouseOver={over}
            onMouseLeave={leave}
          >
            Допомагаємо обрати книгу
          </button>
          {chose && <ChouseBook />}
        </div>
        <div className="bannerIcon">
          <HandySvg
            src={iconSrc}
            className={windowDimensions ? "largeIcon" : "smallIcon"}
          />
        </div>
      </div>
      <HandySvg
        src={arrow}
        className="arrovIconBanner"
        width="52"
        height="49.56"
      />
    </div>
  );
}
