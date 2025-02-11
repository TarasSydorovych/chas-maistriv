import ViewProductCatalog from "../catalog/viewProductCatalog";
import YouLikeIt from "../catalog/youLikeIt";
import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import Description from "./description";
import Hero from "./hero";
import HeroPage from "./heroPage";
import css from "./product.module.css";
import autorPic from "../../img/sasasas.png";
import ProductPageTitle from "./productPageTitle";
import Respons from "./respons";
import ResponsTextArea from "./responsTextArea";
import VideoBlock from "./videoBlock";
import WhyNeedRead from "./whyNeedRead";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PdfReader from "./pdfReader";
import AddResponse from "./addResponse";

export default function Manuscript({
  products,
  setAddressChanged,
  addressChanged,
  setLogin,
}) {
  const [reloadP, setReloadP] = useState(true);
  const [isOrdered, setIsOrdered] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [user, setUser] = useState("");
  const [rerenderAfter, setRerenderAfter] = useState(false);
  const [oneProd, setOneProd] = useState();
  const [haveProd, setHaveProd] = useState(false);
  const [rewievList, setRewievList] = useState([]);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  let params = useParams();

  const increaseRating = async (uid) => {
    try {
      const manuscriptRef = doc(db, "manuscript", uid);
      await updateDoc(manuscriptRef, {
        rating: increment(1),
      });
    } catch (error) {
      console.error("Помилка при оновленні значення rating:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    for (let i = 0; i < products.length; i++) {
      if (products[i].uid === params.id) {
        setOneProd(products[i]);
        setHaveProd(true);
      }
    }
  }, [products, addressChanged]);
  useEffect(() => {
    if (addressChanged) {
      window.scrollTo(0, 0);
      setAddressChanged(false);
    }
  }, [addressChanged]);

  const enterUser = () => {
    setLogin(true);
  };
  useEffect(() => {
    let timer;

    if (isTimerRunning) {
      timer = setTimeout(() => {
        setIsTimerFinished(true);
      }, 180000); // Час таймера - 3хв

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isTimerRunning, setIsTimerFinished]);

  const handleButtonClick = (uid) => {
    increaseRating(uid);
  };

  return (
    <>
      {haveProd && (
        <>
          <ProductPageTitle oneProd={oneProd} />
          <PdfReader
            pdfUrl={oneProd.shortPdf}
            setIsTimerRunning={setIsTimerRunning}
          />
          {isTimerFinished && (
            <div className={css.manuscriptPdfBigButWr}>
              <a href={oneProd.longPdf} target="_blanck">
                <button
                  onClick={() => handleButtonClick(oneProd.uid)}
                  className={css.manuscriptPdfBigBut}
                >
                  Переглянути весь Рукопис
                </button>
              </a>
            </div>
          )}
          <div className={css.inHvastWrap}>
            <div className={css.someWrapINew}>
              <h4 className={css.manuscripnAuthRes}>Відгуки експертів</h4>{" "}
            </div>
            {/* <div className={css.someWrapI}>
              <div className={css.autorPic}>
                <div className={css.autorPicRotate}>
                  <img src={autorPic} />
                </div>
              </div>
              <div className={css.descWrapAutor}>
          
                <div className={css.yellowFitchWrap}>
                  <p className={css.yellowFitchWrapP}>{oneProd.expert}</p>
                  <div className={css.hvist}></div>
                </div>
              </div>
            </div> */}
            {oneProd.expertResponse && oneProd.expertResponse.length > 0 ? (
              oneProd.expertResponse
                .filter((response) => response.visible) // Фільтруємо відгуки з visible === true
                .map((response, index) => (
                  <div key={index} className={css.someWrapI}>
                    <div className={css.autorPic}>
                      {response.photoURL ? (
                        <img
                          src={response.photoURL}
                          alt="Фото експерта"
                          className={css.respAutorPic}
                        />
                      ) : (
                        <div className={css.wrapWithPic}>
                          {response.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className={css.descWrapAutor}>
                      <div className={css.yellowFitchWrap}>
                        <p className={css.autorResponseNameP}>
                          Автор відгуку: {response.name}
                        </p>
                        <p className={css.yellowFitchWrapP}>{response.text}</p>
                        <div className={css.hvist}></div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p>Відгуків експертів поки немає.</p>
            )}
          </div>{" "}
          <div className={css.inHvastWrap}>
            {" "}
            <div className={css.someWrapINew}>
              <h4 className={css.manuscripnAuthRes}>Відгуки читачів</h4>{" "}
            </div>
            {/* <div className={css.someWrapI}>
              {" "}
              <div className={css.autorPic}>
                <div className={css.autorPicRotate}>
                  <img src={autorPic} />
                </div>
              </div>
              <div className={css.descWrapAutor}>
                <div className={css.yellowFitchWrap}>
                  <p className={css.yellowFitchWrapP}>{oneProd.respUser}</p>
                  <div className={css.hvist}></div>
                </div>
              </div>
            </div> */}
            {oneProd.userResponse && oneProd.userResponse.length > 0 ? (
              oneProd.userResponse.map((response, index) => (
                <div key={index} className={css.someWrapI}>
                  <div className={css.autorPic}>
                    {response.photoURL ? (
                      <img
                        src={response.photoURL}
                        alt="Фото читача"
                        className={css.respAutorPic}
                      />
                    ) : (
                      <div className={css.wrapWithPic}>
                        {response.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className={css.descWrapAutor}>
                    <div className={css.yellowFitchWrap}>
                      <p className={css.autorResponseNameP}>
                        Автор відгуку: {response.name}
                      </p>
                      <p className={css.yellowFitchWrapP}>{response.text}</p>
                      <div className={css.hvist}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Відгуків читачів поки немає.</p>
            )}
          </div>
        </>
      )}
      {oneProd && <AddResponse uid={oneProd.uid} />}
    </>
  );
}
