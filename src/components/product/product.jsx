import ViewProductCatalog from "../catalog/viewProductCatalog";
import YouLikeIt from "../catalog/youLikeIt";
import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import Description from "./description";
import Hero from "./hero";
import HeroPage from "./heroPage";
import css from "./product.module.css";
import ProductPageTitle from "./productPageTitle";
import Respons from "./respons";
import ResponsTextArea from "./responsTextArea";
import VideoBlock from "./videoBlock";
import WhyNeedRead from "./whyNeedRead";
import { useParams, useLocation } from "react-router-dom";
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
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Product({
  products,
  setAddressChanged,
  addressChanged,
  setLogin,
  windowDimensions,
}) {
  const [reloadP, setReloadP] = useState(true);
  const [isOrdered, setIsOrdered] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [user, setUser] = useState("");
  const [rerenderAfter, setRerenderAfter] = useState(false);
  const [oneProd, setOneProd] = useState();
  const [haveProd, setHaveProd] = useState(false);
  const [rewievList, setRewievList] = useState([]);
  const location = useLocation();

  let params = useParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Користувач увійшов в систему
        setUser(currentUser);
      } else {
        // Користувач вийшов з системи

        setUser(null);
      }
    });

    return () => {
      // Відписка від слухача після розмонтовування компоненти
      unsubscribe();
    };
  }, []);

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
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "reviews");
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const arr = [];
      for (let i = 0; i < productsList.length; i++) {
        if (productsList[i].productId === oneProd?.uid) {
          arr.push(productsList[i]);
        }
      }
      if (isMounted) {
        setRewievList(arr);
      }
    };

    let isMounted = true;
    if (haveProd && oneProd) {
      document.title = oneProd.ceoTitle; // Встановлюємо заголовок сторінки

      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", oneProd.coeDescription); // Встановлюємо опис сторінки
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.setAttribute("name", "description");
        newMetaDescription.setAttribute("content", oneProd.coeDescription);
        document.head.appendChild(newMetaDescription); // Створюємо та вставляємо новий елемент <meta> з описом сторінки
      }
      fetchProducts();
    }

    return () => {
      isMounted = false;
    };
  }, [oneProd, haveProd, reloadP]);

  // функціонал для корегування відгуків

  useEffect(() => {
    const checkOrder = async () => {
      if (user && oneProd) {
        try {
          const ordersCol = collection(db, "orders");
          const q = query(ordersCol, where("user", "==", user.uid));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const order = { id: doc.id, ...doc.data() };
            const choice = JSON.parse(order.choice);

            const foundProduct = choice.find(
              (tovar) => tovar.uid === oneProd.uid
            );
            if (foundProduct) {
              setIsOrdered(true);
            }
          });
        } catch (error) {
          console.error("Error checking order:", error);
        }
      }
    };
    // Перевіряємо, чи користувач вже робив відгук для цього товару
    const checkReview = async () => {
      if (user && oneProd) {
        try {
          const reviewsCol = collection(db, "reviews");
          const q = query(
            reviewsCol,
            where("productId", "==", oneProd.uid),
            where("userUid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            setHasReviewed(true);
          }
        } catch (error) {
          console.error("Error checking review:", error);
        }
      }
    };

    checkOrder();
    checkReview();
  }, [oneProd, user, rerenderAfter]);

  const enterUser = () => {
    setLogin(true);
  };

  return (
    <>
      {haveProd && (
        <>
          <ProductPageTitle oneProd={oneProd} />
          <Description oneProd={oneProd} />
          <WhyNeedRead oneProd={oneProd} />
          <VideoBlock windowDimensions={windowDimensions} />

          <Hero oneProd={oneProd} />
          <HeroPage oneProd={oneProd} />
          {rewievList.length > 0 && (
            <>
              <Respons rewievList={rewievList} reloadP={reloadP} />
            </>
          )}
          {user && (
            <>
              {isOrdered && !hasReviewed ? (
                <ResponsTextArea
                  rerenderAfter={rerenderAfter}
                  setRerenderAfter={setRerenderAfter}
                  user={user}
                  oneProd={oneProd}
                  reloadP={reloadP}
                  setReloadP={setReloadP}
                />
              ) : (
                <p className={css.canNotAddDesc}>
                  Ви не можете додати відгук до цього товару, оскільки ви вже
                  додали відгук до нього або ще не придбали товар.
                </p>
              )}
            </>
          )}
          {!user && (
            <div className={css.buttonReg}>
              Для того щоб додати відгук{" "}
              <span className={css.buttonRegSpan} onClick={enterUser}>
                Зареєструйтесь
              </span>{" "}
            </div>
          )}

          <ViewProductCatalog
            products={products}
            setAddressChanged={setAddressChanged}
          />
          <Footer />
        </>
      )}
    </>
  );
}
