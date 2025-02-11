// import { useState } from "react";
// import { doc, updateDoc, arrayUnion } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db } from "../../firebase";
// import Swal from "sweetalert2";
// import css from "./responseForm.module.css";

// export default function AddResponse({ uid }) {
//   const [name, setName] = useState("");
//   const [responseText, setResponseText] = useState("");
//   const [file, setFile] = useState(null);
//   const [isExpert, setIsExpert] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
//       if (!validTypes.includes(selectedFile.type)) {
//         Swal.fire(
//           "Помилка",
//           "Файл має бути зображенням (png, jpeg, jpg, webp).",
//           "error"
//         );
//         return;
//       }
//       if (selectedFile.size > 4 * 1024 * 1024) {
//         Swal.fire("Помилка", "Файл має бути менше 4 МБ.", "error");
//         return;
//       }
//       setFile(selectedFile);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !responseText) {
//       Swal.fire("Помилка", "Заповніть всі поля!", "error");
//       return;
//     }

//     if (localStorage.getItem(`responseAdded-${uid}`)) {
//       Swal.fire("Увага", "Ви вже залишили відгук для цього товару.", "info");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       let photoURL = null;

//       if (file) {
//         const storage = getStorage();
//         const storageRef = ref(storage, `responses/${uid}/${file.name}`);
//         await uploadBytes(storageRef, file);
//         photoURL = await getDownloadURL(storageRef);
//       }

//       const response = {
//         name,
//         text: responseText,
//         photoURL,
//         timestamp: new Date().toISOString(),
//         ...(isExpert ? { visible: false } : {}),
//       };

//       const collectionName = isExpert ? "expertResponse" : "userResponse";

//       const productRef = doc(db, "manuscript", uid);
//       await updateDoc(productRef, {
//         [collectionName]: arrayUnion(response),
//       });

//       localStorage.setItem(`responseAdded-${uid}`, "true");

//       Swal.fire("Успіх", "Ваш відгук успішно доданий!", "success");
//       setName("");
//       setResponseText("");
//       setFile(null);
//       setIsExpert(false);
//     } catch (error) {
//       console.error("Помилка при додаванні відгуку:", error);
//       Swal.fire("Помилка", "Сталася помилка при додаванні відгуку.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form className={css.responseForm} onSubmit={handleSubmit}>
//       <h3 className={css.addRespH}>Додати відгук</h3>
//       <div className={css.wrapVidW}>
//         <label className={css.nameVid} htmlFor="name">
//           Ім'я та Прізвище:
//         </label>
//         <input
//           id="name"
//           type="text"
//           value={name}
//           className={css.inputName}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div className={css.wrapVidW}>
//         <label className={css.nameVid} htmlFor="responseText">
//           Ваш відгук:
//         </label>
//         <textarea
//           id="responseText"
//           className={css.inputVidguk}
//           value={responseText}
//           onChange={(e) => setResponseText(e.target.value)}
//           required
//         />
//       </div>
//       <div className={css.wrapVidW}>
//         <label className={css.nameVid}>Фото (необов'язково):</label>
//         <input
//           id="file"
//           type="file"
//           onChange={handleFileChange}
//           className={css.pictureA}
//         />{" "}
//         <label htmlFor="file" className={css.uploadButton}>
//           Завантажити файл
//         </label>
//       </div>
//       <div className={css.wrapVidWN}>
//         <label className={css.checkLabel}>
//           <input
//             type="checkbox"
//             checked={isExpert}
//             onChange={(e) => setIsExpert(e.target.checked)}
//           />
//           <span></span> {/* Кастомний чекбокс */}
//           Відгук експерта
//         </label>
//       </div>
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className={css.uploadButton}
//       >
//         {isSubmitting ? "Відправка..." : "Додати відгук"}
//       </button>
//     </form>
//   );
// }
import { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import css from "./responseForm.module.css";
import withUserData from "../HOK/withUserData";

function AddResponse({ uid }) {
  const [user, setUser] = useState(null);
  const [usetFrom, setUserFrom] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [isExpert, setIsExpert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserFrom(currentUser);
      } else {
        setUserFrom(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const usersRef = collection(db, "users");
      if (usetFrom) {
        const q = query(usersRef, where("uid", "==", usetFrom.uid));
        try {
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              console.log("querySnapshot", userData);

              setUser(userData);
            });
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Помилка під час отримання даних:", error);
        }
      }
    };

    fetchUser();
  }, [usetFrom]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!responseText) {
      Swal.fire("Помилка", "Введіть текст відгуку!", "error");
      return;
    }

    if (localStorage.getItem(`responseAdded-${uid}`)) {
      Swal.fire("Увага", "Ви вже залишили відгук для цього товару.", "info");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = {
        name: user.displayName,
        text: responseText,
        photoURL: user.photo || "",
        timestamp: new Date().toISOString(),
        ...(isExpert ? { visible: false } : {}),
      };

      const collectionName = isExpert ? "expertResponse" : "userResponse";

      const productRef = doc(db, "manuscript", uid);
      await updateDoc(productRef, {
        [collectionName]: arrayUnion(response),
      });

      localStorage.setItem(`responseAdded-${uid}`, "true");

      Swal.fire("Успіх", "Ваш відгук успішно доданий!", "success");
      setResponseText("");
      setIsExpert(false);
    } catch (error) {
      console.error("Помилка при додаванні відгуку:", error);
      Swal.fire("Помилка", "Сталася помилка при додаванні відгуку.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <p className={css.authMessage}>
        Увійдіть або зареєструйтесь, щоб залишити відгук.
      </p>
    );
  }

  return (
    <form className={css.responseForm} onSubmit={handleSubmit}>
      <h3 className={css.addRespH}>Додати відгук</h3>
      <div className={css.wrapVidW}>
        <label className={css.nameVid} htmlFor="responseText">
          Ваш відгук:
        </label>
        <textarea
          id="responseText"
          className={css.inputVidguk}
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          required
        />
      </div>
      <div className={css.wrapVidWN}>
        <label className={css.checkLabel}>
          <input
            type="checkbox"
            checked={isExpert}
            onChange={(e) => setIsExpert(e.target.checked)}
          />
          <span></span> {/* Кастомний чекбокс */}
          Відгук експерта
        </label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={css.uploadButton}
      >
        {isSubmitting ? "Відправка..." : "Додати відгук"}
      </button>
    </form>
  );
}

export default AddResponse;
