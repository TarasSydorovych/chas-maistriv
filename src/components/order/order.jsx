import { useState, useEffect, useMemo, useCallback } from "react";
import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import css from "./order.module.css";
import { v4 as uuidv4 } from "uuid";

import withUserData from "../HOK/withUserData";
import {
  getFirestore,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import arrowImp from "../../img/arrowDownPick.png";
import fetchDepartments from "../../function/fetchDepartments";
import { auth, db } from "../../firebase";
import generateSignature from "../../function/generateSignature";
import {
  getAuth,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Buffer } from "buffer";
import sha1 from "sha1";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import ProductInOrder from "./productInOrder";
import axios from "axios";
const Order = ({ setLogin, user, discountInHok, dataFromBase }) => {
  const [name, setName] = useState("");
  const uid = uuidv4();

  const [fatherName, setFatherName] = useState("");
  const [surName, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameOtr, setNameOtr] = useState("");
  const [fatherNameOtr, setFatherNameOtr] = useState("");
  const [surNameOtr, setSurNameOtr] = useState("");
  const [phoneOtr, setPhoneOtr] = useState("");
  const [selectedCity, setSelectedCity] = useState();
  const [isNewBuyer, setIsNewBuyer] = useState(true);
  const [ulVisible, setUlVisible] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [whatSelect, setWhatSelect] = useState(0);
  const [discount, setDiscount] = useState(null);
  const [promo, setPromo] = useState("");
  const [fullPrice, setFullPrice] = useState();
  const [products, setProducts] = useState([]);
  const [haveProduct, setHaveProduct] = useState(false);
  const [cartProducts, setCartProducts] = useState();
  const [finishPrice, setFinishPrice] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [newFinValue, setNewFinValue] = useState("");

  const [visibleDiscount, setVisibleDiscount] = useState(0);
  const [depo, setDepo] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [countProductForCart, setCountProductForCart] = useState([]);
  const [whoCust, setWhoCust] = useState(true);

  // Функція промокоду

  const handleApplyPromoCode = useCallback(async () => {
    // Отримання документа "promo" з колекції
    const promoDocRef = doc(db, "promo", "promo-document");
    const promoDocSnapshot = await getDoc(promoDocRef);

    if (promoDocSnapshot.exists()) {
      // Перевірка, чи введений промокод співпадає з uid промокода в документі
      const promoData = promoDocSnapshot.data();
      if (promoData.uid === promoCode) {
        // Промокод знайдено, оновлення значення знижки
        const discountValue = parseInt(promoData.discount);

        // Розрахунок нової суми для кожного товару
        const updatedCartProducts = cartProducts.map((product) => {
          if (product.havePromo === "true") {
            const discValue = (product.price * discountValue) / 100;
            const newPrice = product.price - discValue;
            return {
              ...product,
              price: newPrice,
            };
          }
          return product;
        });

        // Розрахунок нової загальної суми
        const totalPrice = updatedCartProducts.reduce((acc, product) => {
          return acc + product.price * product.quantity;
        }, 0);

        console.log("totalPrice", totalPrice);

        const discValue = (totalPrice * discountValue) / 100;
        const resul = totalPrice - discValue;
        setNewFinValue(totalPrice);
        setVisibleDiscount(discValue);
      } else {
        // Промокод не знайдено, виведення повідомлення
        alert("Такого промокоду не існує");
      }
    } else {
      // Документ promo не існує, виведення повідомлення
      alert("Такого промокоду не існує");
    }
  }, [cartProducts, promoCode]);
  // закінчення функції промокоду
  // функції для зміни значень стандартних
  const handleNewBuyerClick = () => {
    setIsNewBuyer(true);
  };

  const handleAlwaysBuyerClick = () => {
    setIsNewBuyer(false);
  };

  const handleSelectChange = (event) => {
    const selectedIndex = event.target.value;
    const selectedDepartmentName =
      departments[selectedIndex]?.Description || "";
    setSelectedDepartment(selectedDepartmentName);
  };

  const [choisDostavka, setChoisDostavka] = useState(true);
  //Другі контактні данні
  const nameChangeOtr = (e) => {
    const na = e.target.value;
    setNameOtr(na);
  };
  const fatherNameChangeOtr = (e) => {
    const fa = e.target.value;
    setFatherNameOtr(fa);
  };
  const surNameChangeOtr = (e) => {
    const sa = e.target.value;
    setSurNameOtr(sa);
  };
  const handlePhoneChangeOtr = (event) => {
    const newPhone = event.target.value;

    // Перевірка, чи починається телефонний номер на +380
    if (newPhone.startsWith("") && newPhone.length <= 13) {
      setPhoneOtr(newPhone);
    }
  };

  //Перші контактні дані
  const nameChange = (e) => {
    const na = e.target.value;
    setName(na);
  };
  const fatherNameChange = (e) => {
    const fa = e.target.value;
    setFatherName(fa);
  };
  const surNameChange = (e) => {
    const sa = e.target.value;
    setSurName(sa);
  };
  const handlePhoneChange = (event) => {
    const newPhone = event.target.value;

    // Перевірка, чи починається телефонний номер на +380
    if (newPhone.startsWith("") && newPhone.length <= 13) {
      setPhone(newPhone);
    }
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption("");
    } else {
      setSelectedOption(option);
    }
    setWhoCust(!whoCust);
  };

  //код для виведення міста
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);

  const handleInputChange = async (event) => {
    const inputCityName = event.target.value;
    setCityName(inputCityName);
    setUlVisible(true);
    try {
      const apiKey = "f579aac88b980dff3f819958ce1cbca6";
      const apiUrl = "https://api.novaposhta.ua/v2.0/json/";
      const requestData = {
        apiKey,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          FindByString: inputCityName,
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      const citiesList = data.data || [];

      setCities(citiesList);
    } catch (error) {
      console.error("Error searching cities:", error);
    }
  };

  const handleCityClick = async (city) => {
    setSelectedCity(city);
    setCityName(city.Description);
    setCities([]);
    setUlVisible(false);

    setDepartments(await fetchDepartments(city.Ref));
  };

  // все для продуктів в корзині
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await fetchDepartments(selectedCity?.Ref || "");
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };

    fetchData();
  }, [selectedCity]);
  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "product");
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHaveProduct(true);
      setProducts(productsList);

      const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
      const productsWithQuantities = cartProducts.map((product) => {
        const foundProduct = productsList.find((p) => p.id === product.uid);
        return {
          ...foundProduct,
          quantity: product.quantity,
        };
      });
      setCartProducts(productsWithQuantities);
    };

    fetchProducts();
  }, []);

  const [totalQuantity, setTotalQuantity] = useState(0);
  const handleQuantityChange = (uid, quantity) => {
    const updatedCartProducts = cartProducts.map((product) => {
      if (product.uid === uid) {
        return {
          ...product,
          quantity,
        };
      } else {
        return product;
      }
    });
    const productToUpdate = updatedCartProducts.find(
      (product) => product.uid === uid
    );
    const totalPrice = updatedCartProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setFinishPrice(totalPrice);
    if (discountInHok > 0) {
      const discValue = (totalPrice * discountInHok) / 100;
      const resul = totalPrice - discValue;
      setNewFinValue(resul);
      setDiscount(discValue);
    } else {
      setNewFinValue(totalPrice);
    }

    setCartProducts(updatedCartProducts);

    // Update the quantity of the product with the corresponding uid in the localStorage
    if (productToUpdate) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const updatedCart = cart.map((product) => {
        if (product.uid === uid) {
          return {
            ...product,
            quantity,
          };
        } else {
          return product;
        }
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    // Update the total quantity of products in the cart
    const totalQuantity = updatedCartProducts.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    setTotalQuantity(totalQuantity);
  };

  const removeProduct = (uid) => {
    const updatedCart = cartProducts.filter((product) => product.uid !== uid);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartProducts(updatedCart);

    // Update the total quantity of products in the cart
    const totalQuantity = updatedCart.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    setTotalQuantity(totalQuantity);

    // Update the total price of products in the cart
    const totalPrice = updatedCart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setFinishPrice(totalPrice || 0); // if updatedCart is empty, set totalPrice to 0
    if (discountInHok > 0) {
      const discValue = (totalPrice * discountInHok) / 100;
      const resul = totalPrice - discValue;
      setNewFinValue(resul || 0);
      setDiscount(discValue);
    } else {
      setNewFinValue(totalPrice || 0);
    }
  };
  useEffect(() => {
    if (cartProducts && cartProducts.length) {
      const totalPrice = cartProducts.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
      setFinishPrice(totalPrice);
      if (discountInHok > 0) {
        const discValue = (totalPrice * discountInHok) / 100;
        const resul = totalPrice - discValue;
        setNewFinValue(resul);
        setVisibleDiscount(discValue);
      } else {
        setNewFinValue(totalPrice);
      }

      // Update the total quantity of products in the cart
      const totalQuantity = cartProducts.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
      setCountProductForCart(totalQuantity);
    }
  }, [cartProducts, discountInHok]);
  // заключаючий

  //Оплатва
  const params = {
    order_id: `ID${uid}`,
    order_desc: "test order",
    currency: "UAH",
    amount: `${newFinValue * 100}`,
    merchant_id: "1396424",
  };
  const getSignature = (merchant_id, password, params) => {
    const orderKey = Object.keys(params).sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    const signatureRow = orderKey.map((v) => params[v]).join("|");

    return sha1(`${password}|${signatureRow}`);
  };

  const merchant_id = "1396424";
  const password = "test";
  const signature = getSignature(merchant_id, password, params);
  const payParam = async (e) => {
    e.preventDefault();

    const json = JSON.stringify(cartProducts);

    let us = "";

    if (user) {
      us = user.uid;
    }

    try {
      // Створюємо об'єкт документу для запису в Firestore
      const newProduct = {
        uid: uid,
        choice: json,
        totalPrice: finishPrice,
        finishPrice: newFinValue,
        phone: phone,
        name: name,
        fatherName: fatherName,
        surName: surName,
        discount: discountInHok,
        nameOtr,
        fatherNameOtr,
        surNameOtr,
        phoneOtr,
        isNewBuyer,
        cityName,
        selectedDepartment,
        pay: "card",
        paymentStatus: "false",
        user: us,
        status: "Очікує підтвердження",
        createdAt: serverTimestamp(),
        // Додайте інші поля форми за необхідності
      };

      // Записуємо новий продукт в Firestore
      //const docRef = await addDoc(collection(db, 'orders'), newProduct);
      const frankDocRef = doc(db, "orders", uid);
      await setDoc(frankDocRef, newProduct);
      const apiUrl = "http://localhost:4000/create-order"; // Замініть на відповідний URL свого сервера

      const response = await axios.post(apiUrl, newProduct);
      document.querySelector("form").submit();
    } catch (error) {
      console.error("Помилка при додаванні документа:", error);
    }

    localStorage.removeItem("cart");
  };
  useEffect(() => {
    // Оновлюйте компоненту тут
  }, [discount]);
  const apiKey = "f579aac88b980dff3f819958ce1cbca6";
  const apiUrl = "https://api.novaposhta.ua/v2.0/json/";
  const ttnNumber = "20450715436175";
  const testCalback = async () => {
    const apiUrl = "http://localhost:4000/callback"; // Замініть на відповідний URL свого сервера

    const response = await axios.post(apiUrl, { test: "d" });
  };
  return (
    <>
      <div className={css.blueHeaderOrder}>
        <div className={css.blueHeaderOrderEnter}>
          <h3 className={css.titleH3OrderEnter}>Оформлення замовлення</h3>
        </div>
      </div>
      <div className={css.wrapCenterOrder}>
        <div className={css.wrapCenterOrderSmall}>
          <div className={css.firstBlockWrap}>
            <div className={css.newUserOrNoWrap}>
              <div
                className={`${css.newAlwaysBayer} ${
                  isNewBuyer ? css.newBayer : ""
                }`}
                onClick={handleNewBuyerClick}
              >
                Я новий покупець
              </div>
              <div
                className={`${css.newAlwaysBayer} ${
                  !isNewBuyer ? css.newBayer : ""
                }`}
                onClick={handleAlwaysBuyerClick}
              >
                Я постійний покупець
              </div>
            </div>
            {!user && (
              <p className={css.registerToOrder}>
                <span
                  onClick={() => setLogin(true)}
                  className={css.registerToOrderSpan}
                >
                  ЗАРЕЄСТРУВАТИСЬ
                </span>{" "}
                для відслідковування замовлення
              </p>
            )}
            <p className={css.labelMi}>Особисті дані</p>
            <div className={css.wrapUserData}>
              <input
                className={css.inputSmall}
                type="text"
                placeholder="Ім'я"
                value={name}
                onChange={nameChange}
              />
              <input
                className={css.inputSmall}
                type="text"
                placeholder="По-батькові"
                value={fatherName}
                onChange={fatherNameChange}
              />
              <input
                className={css.inputBig}
                type="text"
                placeholder="Прізвище"
                value={surName}
                onChange={surNameChange}
              />
              <input
                className={css.inputBig}
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
            </div>
            <div className={css.deliveryChoisWrap}>
              <div
                className={css.choisWrap}
                onClick={() => handleOptionClick("Доставка")}
              >
                <div className={css.choisWi}>
                  {selectedOption === "Доставка" && (
                    <div className={css.wi}></div>
                  )}
                </div>
                <p className={css.choisP}>Я отримувач</p>
              </div>
            </div>
            {choisDostavka && (
              <div className={css.wrapUserData}>
                <div className={css.chousBooksSelect}>
                  <select className={css.customSelect}>
                    <option className={css.customOpin} value="0">
                      Країна
                    </option>
                    <option className={css.customOpin} value="1">
                      Україна
                    </option>
                  </select>
                  <img src={arrowImp} className={css.customArrowSelect} />
                </div>

                <div className={css.chousBooksSelect}>
                  <input
                    className={css.inputSmallWrap}
                    type="text"
                    value={cityName}
                    onChange={handleInputChange}
                    placeholder="Місто"
                  />
                  {ulVisible && (
                    <ul className={css.ulWrapBigCity}>
                      {cities.length > 0 &&
                        cities.map((city, index) => {
                          return (
                            <li
                              onClick={() => handleCityClick(city)}
                              key={index}
                            >
                              {city.SettlementTypeDescription},
                              {city.Description}, {city.AreaDescription}
                            </li>
                          );
                        })}
                    </ul>
                  )}
                  <img src={arrowImp} className={css.customArrowSelect} />
                </div>
                <div className={css.chousBooksSelectBig}>
                  <select className={css.customSelect}>
                    <option className={css.customOpin} value="0">
                      Спосіб доставки
                    </option>
                    <option className={css.customOpin} value="1">
                      Нова пошта
                    </option>
                  </select>
                  <img src={arrowImp} className={css.customArrowSelect} />
                </div>
                <div className={css.chousBooksSelectBig}>
                  <select
                    className={css.customSelect}
                    onChange={handleSelectChange}
                  >
                    <option className={css.customOpin} value="0">
                      Нова пошта номер
                    </option>
                    {departments.length > 0 &&
                      departments.map((el, index) => {
                        return (
                          <option
                            className={css.customOpin}
                            key={index}
                            value={index}
                          >
                            {el.Description}
                          </option>
                        );
                      })}
                  </select>
                  <img src={arrowImp} className={css.customArrowSelect} />
                </div>
              </div>
            )}
            {whoCust && (
              <>
                <p className={css.labelMi}>Контактні дані отримувача</p>
                <div className={css.wrapUserData}>
                  <input
                    className={css.inputSmall}
                    type="text"
                    placeholder="Ім'я"
                    value={nameOtr}
                    onChange={nameChangeOtr}
                  />
                  <input
                    className={css.inputSmall}
                    type="text"
                    placeholder="По-батькові"
                    value={fatherNameOtr}
                    onChange={fatherNameChangeOtr}
                  />
                  <input
                    className={css.inputBig}
                    type="text"
                    placeholder="Прізвище"
                    value={surNameOtr}
                    onChange={surNameChangeOtr}
                  />
                  <input
                    className={css.inputBig}
                    type="tel"
                    placeholder="Телефон"
                    value={phoneOtr}
                    onChange={handlePhoneChangeOtr}
                    required
                  />
                </div>
              </>
            )}
            <form
              action="https://pay.fondy.eu/api/checkout/redirect/"
              method="POST"
            >
              <input type="hidden" name="merchant_id" value="1396424" />
              <input type="hidden" name="order_id" value={`ID${uid}`} />
              <input type="hidden" name="order_desc" value="test order" />
              <input type="hidden" name="currency" value="UAH" />
              <input
                type="hidden"
                name="amount"
                value={`${newFinValue * 100}`}
              />
              <input type="hidden" name="signature" value={signature} />

              <button
                type="submit"
                className={css.orderConfirmation}
                onClick={payParam}
              >
                Оформити замовлення
              </button>
            </form>
            <button onClick={testCalback}>TestChang</button>
          </div>
          <div className={css.wrapProdForOrder}>
            {cartProducts &&
              cartProducts.map((el, index) => {
                return (
                  <ProductInOrder
                    key={index}
                    el={el}
                    removeProduct={removeProduct}
                    handleQuantityChange={handleQuantityChange}
                  />
                );
              })}

            <div className={css.lineWrap}></div>
            <p className={css.sumOrder}>Всього: {finishPrice} грн</p>
            <p className={css.sumOrder}>Знижка: {discountInHok} %</p>
            <div className={css.discountWrapOrder}>
              <input
                className={css.promoInput}
                type="text"
                placeholder="Промокод"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <div className={css.promoButton} onClick={handleApplyPromoCode}>
                Застосувати
              </div>
            </div>
            <p className={css.sum}>Сума: {newFinValue} грн</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default withUserData(Order);
