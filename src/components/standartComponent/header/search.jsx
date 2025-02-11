import { HandySvg } from "handy-svg";
import iconSrc from "../../../svg/searsh.svg";
import iconSrctele from "../../../svg/like.svg";
import iconSrcYou from "../../../svg/cabinetIcon.svg";
import shopIco from "../../../svg/shopIco.svg";
import whiteSearch from "../../../svg/whiteSearch.svg";
import slonForHeader from "../../../svg/slonForHeader.svg";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { GrInstagram } from "react-icons/gr";
import React, { useState, useEffect } from "react";
import SearchInput from "./searchInput";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../../firebase";
export default function Search({
  user,
  login,
  setLogin,
  setCart,
  countProductForCart,
  cartCounterC,
  totalQuantity,
  likedCount,
}) {
  const [cartItems, setCartItems] = useState([]);
  const [countProduct, setCountProduct] = useState(null);
  const [searchInput, setSearchInput] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userBd, setUserBd] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const usersRef = collection(db, "users");
      if (user) {
        const q = query(usersRef, where("uid", "==", user.uid));
        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setUserBd(userData);
            });
          } else {
          }
        } catch (error) {
          console.error("Помилка під час отримання даних:", error);
        }
      }
    };

    fetchUser();
  }, [user]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    let count = 0;
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      for (let i = 0; i < cartItems.length; i++) {
        count += cartItems[i].quantity;
      }
    }
    setCountProduct(count);
  }, [cartItems]);
  const loginFun = () => {
    if (user) {
      navigate("/user");
    } else {
      setLogin(!login);
    }
  };
  const openCart = () => {
    setCart(true);
  };
  const closeSearch = () => {
    setSearchInput(false);
  };
  const openSearch = () => {
    setSearchInput(true);
  };

  return (
    <div className="wrapSearch">
      {!searchInput && (
        <div className="searchBlock" onClick={openSearch}>
          <div className="socialIcon">
            <HandySvg src={iconSrc} width="28" height="28" />
          </div>
        </div>
      )}
      {searchInput && (
        <div className="searchBlockGrenn" onClick={closeSearch}>
          <div className="socialIcon">
            <HandySvg src={whiteSearch} width="28" height="28" />
          </div>
        </div>
      )}
      {searchInput && <SearchInput closeSearch={closeSearch} />}

      <Link to="/like">
        <div className="searchBlock">
          <div className="socialIcon">
            <HandySvg src={iconSrctele} width="30" height="28" />
            <div className="counterProd">{likedCount}</div>
          </div>
        </div>
      </Link>

      <div className="searchBlock" onClick={openCart}>
        <div className="socialIcon">
          <HandySvg src={shopIco} width="28.33" height="28" />

          <div className="counterProd">{totalQuantity}</div>
        </div>
      </div>

      <div className="searchBlock">
        <div className="socialIcon">
          {!user && (
            <HandySvg
              src={iconSrcYou}
              width="28"
              height="28"
              onClick={loginFun}
            />
          )}
          {user && (
            <HandySvg
              src={iconSrcYou}
              width="28"
              height="28"
              onClick={loginFun}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          )}
          {userBd && (
            <p
              className="userNameInHeader"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {" "}
              {userBd.displayName.split(" ")[0]}
            </p>
          )}
          {userBd && isHovered && (
            <div className="wrapRelativeSlon">
              <HandySvg src={slonForHeader} width="29" height="21" />
              <p className="wrapPinSlonPop">
                Ваші слони (бонуси) {userBd.elefant}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
