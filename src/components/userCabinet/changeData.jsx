// import css from "./userCabinet.module.css";
// import { useEffect, useState } from "react";
// import { useRef } from "react";
// import iconSrc from "../../svg/xCardIcon.svg";
// import { HandySvg } from "handy-svg";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import { auth, db } from "../../firebase";
// import {
//   doc,
//   setDoc,
//   addDoc,
//   collection,
//   serverTimestamp,
//   updateDoc,
// } from "firebase/firestore";
// import Swal from "sweetalert2";
// export default function ChangeData({
//   scrollHeight,
//   realUser,
//   setCheSetinings,
//   setRealUser,
// }) {
//   const productBigWrapRef = useRef(null);
//   const [name, setName] = useState(realUser.displayName);
//   const [email, setEmail] = useState(realUser.email);
//   const [tgId, setTgId] = useState(realUser.telegramId);
//   const [phone, setPhone] = useState(realUser.phone);
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     const productBigWrapElement = productBigWrapRef.current;
//     if (productBigWrapElement) {
//       productBigWrapElement.style.top = `${scrollHeight}px`;
//     }
//   }, [productBigWrapRef]);
//   const closeSet = () => {
//     setCheSetinings(false);
//   };

//   const showSuccessPopup = () => {
//     Swal.fire({
//       title: "Дані успішно оновлено!",
//       icon: "success",
//       showConfirmButton: false,
//       timer: 1000,
//     }).then(() => {
//       setCheSetinings(false);
//     });
//   };

//   const changeDataFunc = async () => {
//     if (file) {
//       // Якщо файл існує, тоді завантажуємо його в Firebase Storage
//       try {
//         const storage = getStorage();
//         const storageRef = ref(storage, `users/${realUser.uid}/profile-photo`);
//         const uploadTask = uploadBytesResumable(storageRef, file);

//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             // Відстежування процесу завантаження (необов'язково)
//           },
//           (error) => {
//             // Помилка під час завантаження (необов'язково)
//             console.error("Помилка завантаження файлу:", error);
//           },
//           async () => {
//             // Завантаження завершено успішно
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             // Тепер ми маємо отримати URL завантаженого файлу

//             // Тепер оновимо дані в Firestore з отриманим URL
//             const frankDocRef = doc(db, "users", realUser.uid);

//             try {
//               await updateDoc(frankDocRef, {
//                 photo: downloadURL, // Оновлюємо поле photo з URL зображення
//                 displayName: name, // Оновлюємо поле displayName
//                 email: email, // Оновлюємо поле email
//                 telegramId: tgId, // Оновлюємо поле telegramId
//                 phone: phone, // Оновлюємо поле phone
//               });
//               setRealUser((prevState) => ({
//                 ...prevState,
//                 photo: downloadURL,
//                 displayName: name,
//                 email: email,
//                 telegramId: tgId,
//                 phone: phone,
//               }));
//               showSuccessPopup();
//             } catch (error) {
//               console.error("Помилка оновлення даних в Firestore:", error);
//             }
//           }
//         );
//       } catch (error) {
//         console.error(
//           "Помилка завантаження зображення в Firebase Storage:",
//           error
//         );
//       }
//     } else {
//       // Якщо файлу немає, тоді просто оновлюємо інші дані в Firestore

//       const frankDocRef = doc(db, "users", realUser.uid);

//       try {
//         await updateDoc(frankDocRef, {
//           displayName: name, // Оновлюємо поле displayName
//           email: email, // Оновлюємо поле email
//           telegramId: tgId, // Оновлюємо поле telegramId
//           phone: phone, // Оновлюємо поле phone
//         });
//         setRealUser((prevState) => ({
//           ...prevState,
//           displayName: name,
//           email: email,
//           telegramId: tgId,
//           phone: phone,
//         }));
//         showSuccessPopup();
//       } catch (error) {
//         console.error("Помилка оновлення даних в Firestore:", error);
//       }
//     }
//   };

//   return (
//     <div className={css.changeDataWrap}>
//       <div className={css.changeDataWrapSmall}>
//         <div className={css.nameCountWrap}>
//           <h2 className={css.countH2}>Особиста інформація</h2>
//           <HandySvg
//             src={iconSrc}
//             width="28"
//             className={css.countSvg}
//             height="28"
//             onClick={closeSet}
//           />
//         </div>
//         <div className={css.inputWrapCard}>
//           <div className={css.wrapInput}>
//             <p className={css.inputChangeName}>Ім'я</p>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className={css.wrapInput}>
//             <p className={css.inputChangeName}>Email</p>
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className={css.wrapInput}>
//             <p className={css.inputChangeName}>Телеграм ID</p>
//             <input
//               type="text"
//               value={tgId}
//               onChange={(e) => setTgId(e.target.value)}
//             />
//           </div>
//           <div className={css.wrapInput}>
//             <p className={css.inputChangeName}>Телефон</p>
//             <input
//               type="phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>
//           <div className={css.wrapInput}>
//             <p className={css.inputChangeName}>Фото</p>
//             <input
//               type="file"
//               id="file"
//               onChange={(e) => setFile(e.target.files[0])}
//               className={css.inputTypesK}
//             />
//           </div>
//         </div>
//         <button onClick={changeDataFunc} className={css.likeButtonChange}>
//           Обновити данні
//         </button>
//       </div>
//     </div>
//   );
// }
import css from "./userCabinet.module.css";
import { useEffect, useState, useRef } from "react";
import iconSrc from "../../svg/xCardIcon.svg";
import { HandySvg } from "handy-svg";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth, db } from "../../firebase";
import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import fetchDepartments from "../../function/fetchDepartments";

export default function ChangeData({
  scrollHeight,
  realUser,
  setCheSetinings,
  setRealUser,
}) {
  const productBigWrapRef = useRef(null);

  // Основні дані користувача
  const [name, setName] = useState(realUser.displayName || "");
  const [email, setEmail] = useState(realUser.email || "");
  const [tgId, setTgId] = useState(realUser.telegramId || "");
  const [phone, setPhone] = useState(realUser.phone || "");
  const [file, setFile] = useState(null);
  console.log("realUser", realUser);

  // Дані доставки Нової Пошти
  // Ми використовуємо окремий стан для збереження повного об’єкта міста
  const [selectedCity, setSelectedCity] = useState(
    typeof realUser.deliveryCity === "object" ? realUser.deliveryCity : null
  );
  // Якщо раніше збережено тільки назву, можна її конвертувати
  const [searchTerm, setSearchTerm] = useState(
    typeof realUser.deliveryCity === "object"
      ? realUser.deliveryCity.Description
      : realUser.deliveryCity || ""
  );
  // Для відділення – поки зберігаємо лише назву
  const [deliveryDepartment, setDeliveryDepartment] = useState(
    realUser.deliveryDepartment || ""
  );

  // Стан для роботи з API Нової Пошти
  const [novaPoshtaKey, setNovaPoshtaKey] = useState("");
  const [cities, setCities] = useState([]);
  const [ulVisible, setUlVisible] = useState(false);
  const [departments, setDepartments] = useState([]);

  // Встановлення позиції попапа
  useEffect(() => {
    const el = productBigWrapRef.current;
    if (el) {
      el.style.top = `${scrollHeight}px`;
    }
  }, [scrollHeight]);

  // Завантаження ключа Нової Пошти з Firestore
  useEffect(() => {
    const fetchNovaPoshtaKey = async () => {
      try {
        const keyDocRef = doc(db, "novapost", "novaPoshtaData");
        const keyDocSnap = await getDoc(keyDocRef);
        if (keyDocSnap.exists()) {
          setNovaPoshtaKey(keyDocSnap.data().key || "");
        } else {
          console.log("Документ з ключем Нової Пошти не знайдено.");
        }
      } catch (error) {
        console.error("Помилка завантаження ключа Нової Пошти:", error);
      }
    };
    fetchNovaPoshtaKey();
  }, []);

  // Оновлення станів при зміні realUser (якщо дані вже збережені)
  useEffect(() => {
    setName(realUser.displayName || "");
    setEmail(realUser.email || "");
    setTgId(realUser.telegramId || "");
    setPhone(realUser.phone || "");
    if (typeof realUser.deliveryCity === "object") {
      setSelectedCity(realUser.deliveryCity);
      setSearchTerm(realUser.deliveryCity.Description);
    } else {
      setSelectedCity(null);
      setSearchTerm(realUser.deliveryCity || "");
    }
    setDeliveryDepartment(realUser.deliveryDepartment || "");
  }, [realUser]);

  const closeSet = () => {
    setCheSetinings(false);
  };
  console.log("DeliveryDepartment", deliveryDepartment);

  const showSuccessPopup = () => {
    Swal.fire({
      title: "Дані успішно оновлено!",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    }).then(() => setCheSetinings(false));
  };

  // Функція збереження даних користувача (включаючи фото та дані доставки)
  const changeDataFunc = async () => {
    const userDocRef = doc(db, "users", realUser.uid);

    if (file) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `users/${realUser.uid}/profile-photo`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Можна відстежувати процес завантаження, якщо потрібно
          },
          (error) => {
            console.error("Помилка завантаження файлу:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            try {
              await updateDoc(userDocRef, {
                photo: downloadURL,
                displayName: name,
                email: email,
                telegramId: tgId,
                phone: phone,
                deliveryCity: selectedCity, // зберігаємо повний об’єкт
                deliveryDepartment: deliveryDepartment,
                updatedAt: serverTimestamp(),
              });
              setRealUser((prev) => ({
                ...prev,
                photo: downloadURL,
                displayName: name,
                email: email,
                telegramId: tgId,
                phone: phone,
                deliveryCity: selectedCity,
                deliveryDepartment: deliveryDepartment,
              }));
              showSuccessPopup();
            } catch (error) {
              console.error("Помилка оновлення даних в Firestore:", error);
            }
          }
        );
      } catch (error) {
        console.error(
          "Помилка завантаження зображення в Firebase Storage:",
          error
        );
      }
    } else {
      try {
        await updateDoc(userDocRef, {
          displayName: name,
          email: email,
          telegramId: tgId,
          phone: phone,
          deliveryCity: selectedCity, // зберігаємо повний об’єкт
          deliveryDepartment: deliveryDepartment,
          updatedAt: serverTimestamp(),
        });
        setRealUser((prev) => ({
          ...prev,
          displayName: name,
          email: email,
          telegramId: tgId,
          phone: phone,
          deliveryCity: selectedCity,
          deliveryDepartment: deliveryDepartment,
        }));
        showSuccessPopup();
      } catch (error) {
        console.error("Помилка оновлення даних в Firestore:", error);
      }
    }
  };

  // Функція пошуку міст через API Нової Пошти
  const handleCityInputChange = async (event) => {
    const inputVal = event.target.value;
    setSearchTerm(inputVal);
    setUlVisible(true);

    if (!novaPoshtaKey) {
      console.error("Ключ Нової Пошти не завантажено");
      return;
    }

    try {
      const apiUrl = "https://api.novaposhta.ua/v2.0/json/";
      const requestData = {
        apiKey: novaPoshtaKey,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          FindByString: inputVal,
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      const citiesList = data.data || [];
      setCities(citiesList);
    } catch (error) {
      console.error("Error searching cities:", error);
    }
  };

  // Функція обробки вибору міста з випадаючого списку
  const handleCityClick = async (city) => {
    console.log("city", city);
    // Зберігаємо повний об’єкт міста
    setSelectedCity(city);
    setSearchTerm(city.Description);
    setUlVisible(false);
    // Завантаження списку відділень для обраного міста
    try {
      const depts = await fetchDepartments(city.Ref);
      setDepartments(depts);
    } catch (error) {
      console.error("Помилка завантаження відділень:", error);
      setDepartments([]);
    }
  };
  useEffect(() => {
    const loadDepartments = async () => {
      if (selectedCity && selectedCity.Ref) {
        try {
          const depts = await fetchDepartments(selectedCity.Ref);
          setDepartments(depts);
        } catch (error) {
          console.error("Помилка завантаження відділень:", error);
        }
      }
    };

    loadDepartments();
  }, [selectedCity]);
  return (
    <div className={css.changeDataWrap} ref={productBigWrapRef}>
      <div className={css.changeDataWrapSmall}>
        <div className={css.nameCountWrap}>
          <h2 className={css.countH2}>Особиста інформація</h2>
          <HandySvg
            src={iconSrc}
            width="28"
            height="28"
            className={css.countSvg}
            onClick={closeSet}
          />
        </div>
        <div className={css.inputWrapCard}>
          {/* Основні дані користувача */}
          <div className={css.wrapInput}>
            <p className={css.inputChangeName}>Ім'я</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={css.inputId}
            />
          </div>
          <div className={css.wrapInput}>
            <p className={css.inputChangeName}>Email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={css.inputId}
            />
          </div>
          <div className={css.wrapInput}>
            <p className={css.inputChangeName}>Телеграм ID</p>
            <input
              type="text"
              value={tgId}
              onChange={(e) => setTgId(e.target.value)}
              className={css.inputId}
            />
          </div>
          <div className={css.wrapInput}>
            <p className={css.inputChangeName}>Телефон</p>
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={css.inputId}
            />
          </div>
          <div className={css.wrapInput}>
            <p className={css.inputChangeName}>Фото</p>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className={css.inputTypesK}
            />
          </div>

          {/* Секція для даних доставки (Нова Пошта) */}
          <div className={css.deliverySection}>
            <h3 className={css.sectionTitle}>Адреса доставки (Нова Пошта)</h3>
            <div className={css.wrapInput}>
              <p className={css.inputChangeName}>Місто доставки</p>
              <input
                type="text"
                placeholder="Введіть місто"
                value={searchTerm}
                onChange={handleCityInputChange}
                className={css.inputId}
              />
              {ulVisible && cities.length > 0 && (
                <ul className={css.dropdownList}>
                  {cities.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => handleCityClick(city)}
                      className={css.dropdownItem}
                    >
                      {city.SettlementTypeDescription}, {city.Description},{" "}
                      {city.AreaDescription}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={css.wrapInput}>
              <p className={css.inputChangeName}>Відділення Нової Пошти</p>
              {/* <select
                className={css.inputId}
                value={deliveryDepartment}
                onChange={(e) => setDeliveryDepartment(e.target.value)}
              >
                <option value="">Оберіть відділення</option>
                {departments && departments.length > 0 ? (
                  departments.map((dept, index) => (
                    <option key={index} value={dept.Description}>
                      {dept.Description}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Відділень не знайдено
                  </option>
                )}
              </select> */}
              <select
                className={css.inputId}
                value={deliveryDepartment}
                onChange={(e) => setDeliveryDepartment(e.target.value)}
              >
                {deliveryDepartment ? (
                  <option value={deliveryDepartment}>
                    {deliveryDepartment}
                  </option>
                ) : (
                  <option value="">Оберіть відділення</option>
                )}

                {departments && departments.length > 0 ? (
                  departments.map((dept, index) => (
                    <option key={index} value={dept.Description}>
                      {dept.Description}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Відділень не знайдено
                  </option>
                )}
              </select>
            </div>
          </div>
        </div>
        <button onClick={changeDataFunc} className={css.likeButtonChange}>
          Оновити дані
        </button>
      </div>
    </div>
  );
}
