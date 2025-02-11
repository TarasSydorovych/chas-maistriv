import { useState, useEffect, useCallback } from "react";
import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import css from "./order.module.css";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import withUserData from "../HOK/withUserData";
import logoForSlidef from "../../svg/logoForSlidef.svg";
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
import { Circles } from "react-loader-spinner";

const Order = ({ setLogin, user, discountInHok, dataFromBase }) => {
  const [name, setName] = useState("");
  const uid = uuidv4();
  const [loading, setLoading] = useState(false);
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
  const [ulVisibleVid, setUlVisibleVid] = useState(false);
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
  const [currentUs, setCurrentUs] = useState(null);
  const [visibleDiscount, setVisibleDiscount] = useState(0);
  const [depo, setDepo] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [countProductForCart, setCountProductForCart] = useState([]);
  const [whoCust, setWhoCust] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("0");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("0");
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (user && user.uid) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCurrentUs(userDoc.data());
        }
      }
    };
    if (user) {
      fetchCurrentUser();
    }
  }, [user]);

  const handleApplyPromoCode = useCallback(async () => {
    const promoDocRef = doc(db, "promo", "promo-document");
    const promoDocSnapshot = await getDoc(promoDocRef);

    if (promoDocSnapshot.exists()) {
      const promoData = promoDocSnapshot.data();
      if (promoData.uid === promoCode) {
        const discountValue = parseInt(promoData.discount);

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

        const totalPrice = updatedCartProducts.reduce((acc, product) => {
          return acc + product.price * product.quantity;
        }, 0);

        const discValue = (totalPrice * discountValue) / 100;
        const resul = totalPrice - discValue;
        setNewFinValue(totalPrice);
        setVisibleDiscount(discValue);
      } else {
        alert("Такого промокоду не існує");
      }
    } else {
      alert("Такого промокоду не існує");
    }
  }, [cartProducts, promoCode]);
  const handleApplyelefant = async () => {
    if (!currentUs || !currentUs.elefant || parseInt(currentUs.elefant) === 0) {
      Swal.fire({
        icon: "info",
        title: "Увага",
        text: "У вас немає доступних слонів для списання.",
      });
      return;
    }

    const elefantCount = parseInt(currentUs.elefant); // Кількість слонів
    const updatedValue = Math.max(newFinValue - elefantCount, 0); // Зменшення newFinValue (не менше 0)

    // Оновлення newFinValue
    setNewFinValue(updatedValue);

    try {
      // Оновлення кількості слонів у Firebase
      const userDocRef = doc(db, "users", currentUs.uid);
      await setDoc(
        userDocRef,
        {
          elefant: "0", // Списуємо слони
        },
        { merge: true } // Зберігаємо інші дані користувача
      );

      Swal.fire({
        icon: "success",
        title: "Слони застосовані!",
        text: `Сума замовлення зменшена на ${elefantCount} грн.`,
      });

      // Оновлюємо currentUs у стані
      setCurrentUs((prev) => ({
        ...prev,
        elefant: "0", // Оновлення в локальному стані
      }));
    } catch (error) {
      console.error("Помилка при оновленні кількості слонів:", error);
      Swal.fire({
        icon: "error",
        title: "Помилка",
        text: "Не вдалося застосувати слони. Спробуйте ще раз.",
      });
    }
  };

  const handleNewBuyerClick = () => {
    setIsNewBuyer(true);
  };

  const handleAlwaysBuyerClick = () => {
    setIsNewBuyer(false);
  };

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department.Description);
    setSearchTerm(department.Description);
    setUlVisibleVid(false); // Hide dropdown after selection
  };
  const handleSelectChange = (event) => {
    const selectedIndex = event.target.value;
    const selectedDepartmentName =
      departments[selectedIndex]?.Description || "";
    setSelectedDepartment(selectedDepartmentName);
  };

  const [choisDostavka, setChoisDostavka] = useState(true);

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

    if (newPhone.startsWith("") && newPhone.length <= 13) {
      setPhoneOtr(newPhone);
    }
  };

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

  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);
  const [novaPoshtaKey, setNovaPoshtaKey] = useState("");

  useEffect(() => {
    const fetchNovaPoshtaKey = async () => {
      try {
        // Припустимо, що ключ зберігається в колекції "novapost" в документі "novaPoshtaData" у полі "key"
        const keyDocRef = doc(db, "novapost", "novaPoshtaData");
        const keyDocSnap = await getDoc(keyDocRef);
        if (keyDocSnap.exists()) {
          setNovaPoshtaKey(keyDocSnap.data().key || "");
        } else {
        }
      } catch (error) {
        console.error("Помилка завантаження ключа Нової Пошти:", error);
      }
    };
    fetchNovaPoshtaKey();
  }, []);
  const handleInputChange = async (event) => {
    const inputCityName = event.target.value;

    if (!novaPoshtaKey) {
      console.error("Ключ Нової Пошти не завантажено");
      return;
    }
    setCityName(inputCityName);
    setUlVisible(true);
    try {
      const apiUrl = "https://api.novaposhta.ua/v2.0/json/";
      const requestData = {
        apiKey: novaPoshtaKey,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await fetchDepartments(selectedCity?.Ref || "");

        setDepartments(departmentsData);
        setFilteredDepartments(departmentsData);
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

    const totalQuantity = updatedCartProducts.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    setTotalQuantity(totalQuantity);
  };

  const removeProduct = (uid) => {
    const updatedCart = cartProducts.filter((product) => product.uid !== uid);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartProducts(updatedCart);

    const totalQuantity = updatedCart.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    setTotalQuantity(totalQuantity);

    const totalPrice = updatedCart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setFinishPrice(totalPrice || 0);
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

      const totalQuantity = cartProducts.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
      setCountProductForCart(totalQuantity);
    }
  }, [cartProducts, discountInHok]);

  const validateForm = () => {
    if (!name.trim() || !surName.trim() || !phone.trim()) {
      Swal.fire({
        icon: "error",
        title: "Помилка",
        text: "Будь ласка, заповніть усі обов'язкові поля: Ім'я, Прізвище, Телефон.",
      });
      return false;
    }

    if (
      !selectedOption &&
      (!nameOtr.trim() || !surNameOtr.trim() || !phoneOtr.trim())
    ) {
      Swal.fire({
        icon: "error",
        title: "Помилка",
        text: "Будь ласка, заповніть дані отримувача: Ім'я, Прізвище, Телефон.",
      });
      return false;
    }

    if (!cityName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Помилка",
        text: "Будь ласка, введіть місто для доставки.",
      });
      return false;
    }

    if (!selectedDepartment.trim()) {
      Swal.fire({
        icon: "error",
        title: "Помилка",
        text: "Будь ласка, виберіть відділення Нової пошти.",
      });
      return false;
    }

    return true;
  };
  const payParam = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const json = JSON.stringify(cartProducts);

    let us = "";

    if (user) {
      us = user.uid;
    }
    setLoading(true);
    try {
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
      };

      const frankDocRef = doc(db, "orders", uid);
      await setDoc(frankDocRef, newProduct);

      // const apiUrl = "http://localhost:4000/create-order";
      // await axios.post(apiUrl, newProduct);

      const payload = {
        id: uid,
        amount: finishPrice * 100,
        ccy: 980,

        merchantPaymInfo: {
          reference: "84d0070ee4e44667b31371d8f8813947",
          destination: "Оплата товарів час майстрів",
          comment: "Оплата товарів час майстрів",
          customerEmails: [],
          basketOrder: [
            ...cartProducts.map((product) => ({
              name: product.bookName,
              qty: product.quantity,
              sum: product.price * 100,
              icon: product.imageList[0],
              unit: "шт.",
              code: product.ISBN,
            })),
          ],
        },
        webHookUrl: "https://chas-maistriv.com.ua/api/webhook",
        paymentType: "debit",
        saveCardData: {
          saveCard: true,
          walletId: "69f780d841a0434aa535b08821f4822c",
        },
        redirectUrl: "https://chas-maistriv.com.ua/",
        initiationKind: "merchant",
        tds: true,
        newProduct,
      };
      const response = await axios.post(
        "https://chas-maistriv.com.ua/api/create-payment",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            // "X-Token": "mCJEvBVuVEnzrnbdGjjXXxg", // Додайте свій токен
          },
        }
      );
      if (response.data && response.statusText === "OK") {
        // const revBal = response.data.amount + parseInt(currentUser.balance, 10);

        // updateUserBalance(currentUser.uid, revBal);
        // updateUserInvoiceInFirebase(response.data.invoiceId);
        window.location.href = response.data.pageUrl;
      }
      // document.getElementById("liqpay-form").submit();
    } catch (error) {
      console.error("Помилка при додаванні документа:", error);
    }

    localStorage.removeItem("cart");
  };

  useEffect(() => {
    if (currentUs && currentUs.displayName) {
      const [first, last] = currentUs.displayName.split(" ");
      setName(first);
      setSurName(last);
      setPhone(currentUs.phone);
    }

    if (currentUs && typeof currentUs.deliveryCity === "object") {
      setSelectedCity(currentUs.deliveryCity);
      setCityName(currentUs.deliveryCity.Description);
      setSelectedDepartment(currentUs.deliveryDepartment);
      setSearchTerm(currentUs.deliveryDepartment);
      setSelectedCountry("1");
      setSelectedDeliveryMethod("1");
    } else {
      setSelectedCity(null);
      setSearchTerm("");
    }

    // setDeliveryDepartment(currentUs.deliveryDepartment || "");
  }, [currentUs]);
  const handleDepartmentSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    // Filter departments based on search value
    const filtered = departments.filter((department) =>
      department.Description.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredDepartments(filtered);
    setUlVisibleVid(true); // Show dropdown when user starts typing
  };
  const handleInputClick = () => {
    setUlVisibleVid((prev) => !prev); // Toggle visibility
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
            {!currentUs && (
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
            )}
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
                className={css.inputBig}
                type="text"
                placeholder="Ім'я"
                value={name}
                onChange={nameChange}
              />
              {/* <input
                className={css.inputSmall}
                type="text"
                placeholder="По-батькові"
                value={fatherName}
                onChange={fatherNameChange}
              /> */}
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
                  <select
                    className={css.customSelect}
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
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
                              className={css.liInListSitu}
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
                  <select
                    className={css.customSelect}
                    value={selectedDeliveryMethod}
                    onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
                  >
                    <option className={css.customOpin} value="0">
                      Спосіб доставки
                    </option>
                    <option className={css.customOpin} value="1">
                      Нова пошта
                    </option>
                  </select>
                  <img src={arrowImp} className={css.customArrowSelect} />
                </div>
                {/* <div className={css.chousBooksSelectBig}>
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
                </div> */}
                <div className={css.chousBooksSelectBig}>
                  <input
                    type="text"
                    className={css.customSelectInput}
                    placeholder="Введіть номер відділення"
                    value={searchTerm}
                    onChange={handleDepartmentSearch}
                    onClick={handleInputClick} // Show dropdown on input click
                  />
                  {ulVisibleVid && (
                    <ul className={css.ulWrapBigViddilena}>
                      {filteredDepartments.length > 0 ? (
                        filteredDepartments.map((department, index) => (
                          <li
                            key={index}
                            onClick={() => handleDepartmentClick(department)}
                            className={css.liInListSitu}
                          >
                            {department.Description}
                          </li>
                        ))
                      ) : (
                        <li className={css.noResultsItem}>
                          Збігів не знайдено
                        </li>
                      )}
                    </ul>
                  )}
                  <img
                    src={arrowImp}
                    className={css.customArrowSelect}
                    alt="Arrow"
                  />
                </div>
              </div>
            )}
            {whoCust && (
              <>
                <p className={css.labelMi}>Контактні дані отримувача</p>
                <div className={css.wrapUserData}>
                  <input
                    className={css.inputBig}
                    type="text"
                    placeholder="Ім'я"
                    value={nameOtr}
                    onChange={nameChangeOtr}
                  />
                  {/* <input
                    className={css.inputSmall}
                    type="text"
                    placeholder="По-батькові"
                    value={fatherNameOtr}
                    onChange={fatherNameChangeOtr}
                  /> */}
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
            {/* <form
              id="liqpay-form"
              action="https://www.liqpay.ua/api/3/checkout"
              method="POST"
              accept-charset="utf-8"
            >
              <input type="hidden" name="data" value={data} />
              <input type="hidden" name="signature" value={signature} />
            </form> */}
            <button
              type="submit"
              className={css.orderConfirmation}
              onClick={payParam}
            >
              Оформити замовлення
            </button>
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
              <p className={css.slonuInL}>
                Ви можете використати Ваші слони. Загальна кількість слонів{" "}
                <strong>{currentUs && currentUs.elefant}</strong>
              </p>
              <div className={css.promoButton} onClick={handleApplyelefant}>
                Застосувати
              </div>
            </div>
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
      {loading && (
        <div className={css.spinerWrap}>
          <img src={logoForSlidef} className={css.loadingLogo} alt="Loading" />
        </div>
      )}
      <Footer />
    </>
  );
};

export default withUserData(Order);
