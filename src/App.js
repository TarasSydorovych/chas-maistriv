import MainPage from "./components/mainPage/mainPage";
import Header from "./components/standartComponent/header/header";
import { Routes, Route } from "react-router-dom";
import Catalog from "./components/catalog/catalog";
import Product from "./components/product/product";
import AddBooks from "./components/admin/addBooks";
import { auth, db } from "./firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Order from "./components/order/order";
import UserCabinet from "./components/userCabinet/userCabinet";
import Like from "./components/like/like";
import Hero from "./components/product/hero";
import HeroPage from "./components/hero/hero";
import PriceOpt from "./components/priceOpt/priceOpt";
import HeroAdm from "./components/heroAdm/heroAdm";
import AddPromo from "./components/admin/addPromo";
import VideoView from "./components/videoView/videoView";
import Blog from "./components/blog/blog";
import AddBlog from "./components/admBlog/addBlog";
import AddRuk from "./components/addRuk/addRuk";
import Manuscript from "./components/manuscript/manuscript";
import CatalogMan from "./components/catalogMan/catalogMan";
import Author from "./components/autor/author";
import AutorAdm from "./components/autorAdm/autorAdm";
import Obcladunka from "./components/mainPage/obcladunka";
import Carton from "./components/admin/carton";
import SurveyForm from "./components/admin/surveyForm";
import Footer from "./components/standartComponent/footer/footer";
import FullAdm from "./components/admin/fullAdm";
import AboutComp from "./components/infoComponent/aboutComp";
import BlogPage from "./components/blog/blogPage";
import Delivery from "./components/infoComponent/delivery";
import AboutAuth from "./components/infoComponent/aboutAuth";
import PublicOffer from "./components/infoComponent/publicOffer";
import AuthTH from "./components/userCabinet/authTG";
import Coock from "./components/infoComponent/coock";
import Get from "./components/get";
import NewPayBlock from "./components/fon";

import { onAuthStateChanged } from "firebase/auth";
import FourF from "./components/404/fourF";
import TestWebhook from "./components/userCabinet/authTG";
import ForeignRights from "./components/foreignRights/foreignRights";
export const MyContext = React.createContext({
  value: "",
  setValue: () => {},
});
function App() {
  const [visitedProducts, setVisitedProducts] = useState([]);
  const [value, setValue] = useState([]);
  const [coock, setCoock] = useState(() => {
    const cookieConsent = localStorage.getItem("cookie");
    return cookieConsent ? false : true;
  });
  const [products, setProducts] = useState([]);
  const [haveProduct, setHaveProduct] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [addressChanged, setAddressChanged] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(true);
  const [login, setLogin] = useState(false);
  const [reRe, setReRe] = useState(false);
  const [enterUser, setEnterUser] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [haveManu, setHaveManu] = useState(false);
  const [manuscript, setManuscript] = useState([]);
  const [admCha, setAdmCha] = useState(false);
  const [cartCounterC, setCartCounterC] = useState(0);
  const [likeCounterC, setLikeCounterC] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [twoAdmin, setTwoAdmin] = useState(false);
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
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollHeight = window.pageYOffset;
      setScrollHeight(currentScrollHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("visitedProducts"));
    if (storedProducts) {
      setVisitedProducts(storedProducts);
    }
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "product");
        const productsSnapshot = await getDocs(productsRef);

        const productsList = productsSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (product) =>
              product.productVisible === true ||
              product.productVisible === "true"
          )
          .sort((a, b) => {
            const sorterA =
              a.sorterNumber === "" || a.sorterNumber === undefined
                ? Infinity
                : Number(a.sorterNumber);
            const sorterB =
              b.sorterNumber === "" || b.sorterNumber === undefined
                ? Infinity
                : Number(b.sorterNumber);
            return sorterA - sorterB;
          });

        setHaveProduct(true);
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser.uid === "V1isGtif6naFawKKg3m224hoaOk2") {
  //       setAdmCha(true);
  //     } else {
  //       setAdmCha(false);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  useEffect(() => {
    const fetchAdminEmails = async () => {
      try {
        const adminCollection = collection(db, "admin");
        const adminSnapshot = await getDocs(adminCollection);
        const adminEmails = adminSnapshot.docs.map((doc) => doc.data().email);
        return adminEmails;
      } catch (error) {
        console.error("Error fetching admin emails: ", error);
        return [];
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.uid === "V1isGtif6naFawKKg3m224hoaOk2") {
          setAdmCha(true);
        } else {
          setAdmCha(false);
        }

        const adminEmails = await fetchAdminEmails();

        if (adminEmails.includes(currentUser.email)) {
          setTwoAdmin(true);
        } else {
          setTwoAdmin(false);
        }
      } else {
        setAdmCha(false);
        setTwoAdmin(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    const fetchManuscript = async () => {
      const productsRef = collection(db, "manuscript");
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHaveManu(true);
      setManuscript(productsList);
    };
    fetchManuscript();
  }, []);

  useEffect(() => {
    // Отримуємо корзину з localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);

      // Рахуємо загальну кількість товарів у корзині
      const quantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setTotalQuantity(quantity);

      // Диспетчеризуємо екшен для завантаження товарів у корзину в Redux store
    }
  }, [cartCounterC]);
  useEffect(() => {
    // Отримуємо кількість товарів з localStorage при завантаженні компонента
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedCount(likedProducts.length);
  }, [likeCounterC]);

  return (
    <>
      <MyContext.Provider value={{ selectedFilters, setSelectedFilters }}>
        {haveProduct && (
          <>
            <Header
              scrollHeight={scrollHeight}
              setLogin={setLogin}
              login={login}
              setEnterUser={setEnterUser}
              enterUser={enterUser}
              setCartCounterC={setCartCounterC}
              cartCounterC={cartCounterC}
              totalQuantity={totalQuantity}
              likedCount={likedCount}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <MainPage
                    scrollHeight={scrollHeight}
                    windowDimensions={windowDimensions}
                    setLogin={setLogin}
                    setCartCounterC={setCartCounterC}
                    setLikeCounterC={setLikeCounterC}
                  />
                }
              />
              <Route
                path="/catalog"
                element={
                  <Catalog
                    visitedProducts={visitedProducts}
                    productsAll={products}
                    setVisitedProducts={setVisitedProducts}
                    setCartCounterC={setCartCounterC}
                    cartCounterC={cartCounterC}
                    setLikeCounterC={setLikeCounterC}
                  />
                }
              />
              <Route
                path="/manuscriptCatalog"
                element={
                  <CatalogMan
                    visitedProducts={visitedProducts}
                    productsAll={manuscript}
                    setVisitedProducts={setVisitedProducts}
                  />
                }
              />
              <Route path="/product/" element={<Product />} />
              <Route
                path="/product/:id"
                element={
                  <Product
                    windowDimensions={windowDimensions}
                    setLogin={setLogin}
                    products={products}
                    addressChanged={addressChanged}
                    setAddressChanged={setAddressChanged}
                    setCartCounterC={setCartCounterC}
                    setLikeCounterC={setLikeCounterC}
                  />
                }
              />
              <Route path="/order" element={<Order setLogin={setLogin} />} />
              <Route
                path="/like"
                element={
                  <Like
                    setCartCounterC={setCartCounterC}
                    setLikeCounterC={setLikeCounterC}
                  />
                }
              />
              <Route path="/syrv" element={<SurveyForm />} />
              <Route
                path="/hero"
                element={<HeroPage windowDimensions={windowDimensions} />}
              />
              <Route path="/hero/:id" element={<HeroPage />} />
              <Route
                path="/opt"
                element={
                  <PriceOpt
                    windowDimensions={windowDimensions}
                    setCartCounterC={setCartCounterC}
                  />
                }
              />
              <Route
                path="/user"
                element={
                  <UserCabinet
                    reRe={reRe}
                    setReRe={setReRe}
                    windowDimensions={windowDimensions}
                    visitedProducts={visitedProducts}
                    productsAll={products}
                    addressChanged={addressChanged}
                    setAddressChanged={setAddressChanged}
                    setCartCounterC={setCartCounterC}
                    setLikeCounterC={setLikeCounterC}
                  />
                }
              />
              <Route
                path="/adm"
                element={
                  admCha ? (
                    <FullAdm admCha={admCha} />
                  ) : twoAdmin ? (
                    <FullAdm admCha={admCha} />
                  ) : (
                    <FourF />
                  )
                }
              />

              <Route
                path="/manuscript/:id"
                element={
                  <Manuscript
                    setLogin={setLogin}
                    products={manuscript}
                    addressChanged={addressChanged}
                    setAddressChanged={setAddressChanged}
                  />
                }
              />
              <Route path="/foreign-rights" element={<ForeignRights />} />
              <Route path="/promo" element={<AddPromo />} />
              <Route
                path="/video"
                element={<VideoView windowDimensions={windowDimensions} />}
              />
              <Route
                path="/blog"
                element={<Blog windowDimensions={windowDimensions} />}
              />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route
                path="/author"
                element={<Author windowDimensions={windowDimensions} />}
              />
              <Route
                path="/author/:id"
                element={<Author windowDimensions={windowDimensions} />}
              />
              <Route path="/obcladunka" element={<Carton />} />
              <Route path="/about" element={<AboutComp />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/authdes" element={<AboutAuth />} />
              <Route path="/publicOffer" element={<PublicOffer />} />
              <Route path="/tg" element={<TestWebhook />} />

              <Route path="*" element={<FourF />} />
            </Routes>
            {coock && <Coock setCoock={setCoock} />}
            <Footer
              windowDimensions={windowDimensions}
              scrollHeight={scrollHeight}
            />
          </>
        )}
      </MyContext.Provider>
    </>
  );
}

export default App;
