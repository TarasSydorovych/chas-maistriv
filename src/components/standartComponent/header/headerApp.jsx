import { HandySvg } from "handy-svg";
import { useState, useEffect } from "react";
import IconSocial from "./iconSocial";
import Number from "./number";
import Search from "./search";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import iconSrc from "../../../svg/phone.svg";
import checkTelegramSubscription from "../../../function/checkTelegramSubscription";
import { auth, db } from "../../../firebase";
import Sun from "./sun";
import { Link, useNavigate } from "react-router-dom";
import arrowDownIconHeadersT from "../../../img/arrowDownIconHeadersT.png";
import {
  getAuth,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
export default function HeaderApp({
  login,
  setLogin,
  setCart,
  countProductForCart,
  cartCounterC,
  totalQuantity,
  likedCount,
}) {
  const [user, setUser] = useState("");
  const [windowDimensions, setWindowDimensions] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [rightsGuideLink, setRightsGuideLink] = useState("");
  useEffect(() => {
    const fetchRightsGuideLink = async () => {
      try {
        const docRef = doc(db, "foreignRights", "uniqueForeignRight");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRightsGuideLink(docSnap.data().link || "");
        } else {
          console.error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching Rights Guide link:", error);
      }
    };

    fetchRightsGuideLink();
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Користувач увійшов в систему
        setUser(currentUser);
        const fetchData = async () => {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            checkTelegramSubscription(userData);
          }
        };

        fetchData();
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1100) {
        setWindowDimensions(false);
      } else {
        setWindowDimensions(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="sectionHeaderApp">
      {windowDimensions && (
        <div className="headerAppWrap">
          <div
            className="wrapAllConnectInMenuHeader"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="language">
              {/* <a href="" className="linkPlInHeader">
              <div className="rightGuide">Rights Guide</div>
            </a> */}
              <div className="iconLanguage">
                <div className="blue"></div>
                <div className="yellow"></div>
              </div>
              <p className="uaTextRet">UA</p>
              <img
                className="imageArrowHeaderTop"
                src={arrowDownIconHeadersT}
                alt="Стрілка"
              />
              {/* <a href="" className="linkPlInHeader">
              <div className="textLanguage">PL</div>
            </a> */}
            </div>
            {isHovered && (
              <div className="wrapAllContacWhaLan">
                <a
                  href="https://knowhowbook.eu/"
                  className="rightGuideLink"
                  target="_blank"
                >
                  PL
                </a>
                <a
                  href={rightsGuideLink}
                  className="rightGuideLink"
                  target="_blank"
                >
                  Rights Guide
                </a>
              </div>
            )}
          </div>
          <IconSocial />
          <Sun />
          <Number />
          <Search
            user={user}
            countProductForCart={countProductForCart}
            setLogin={setLogin}
            login={login}
            setCart={setCart}
            cartCounterC={cartCounterC}
            totalQuantity={totalQuantity}
            likedCount={likedCount}
          />
        </div>
      )}
      {!windowDimensions && (
        <>
          <Sun />
          <div className="headerAppWrap">
            <div className="language">
              <div className="iconLanguage">
                <div className="blue"></div>
                <div className="yellow"></div>
              </div>
              <div className="textLanguage">ua</div>
            </div>
            <a className="phoneHref" href="tel:+380672315737">
              <div className="numberWrap">
                <HandySvg src={iconSrc} width="18" height="16.37" />
              </div>
            </a>
            <Search
              user={user}
              countProductForCart={countProductForCart}
              setLogin={setLogin}
              login={login}
              setCart={setCart}
            />
          </div>
        </>
      )}
    </section>
  );
}
