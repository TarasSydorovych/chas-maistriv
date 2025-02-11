// import React, { useState, useEffect } from "react";
// import css from "../admin/adm.module.css";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
//   deleteObject,
// } from "firebase/storage";
// import {
//   collection,
//   doc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../../firebase";
// import Swal from "sweetalert2";

// const HeroListEditor = () => {
//   const storage = getStorage();
//   const [heroes, setHeroes] = useState([]);
//   const [selectedHero, setSelectedHero] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [newImage, setNewImage] = useState(null);

//   const objList = [
//     { name: "Ім'я", transliter: "name" },
//     { name: "Опис 1", transliter: "descOne" },
//     { name: "Опис 2", transliter: "descSecond" },
//     { name: "Герой", transliter: "autor" },
//     { name: "Книга", transliter: "book" },
//     { name: "Малий опис", transliter: "smallDesc" },
//     { name: "Автор про героя", transliter: "autorAboutHero" },
//     { name: "Історія створення", transliter: "history" },
//     { name: "Інтервю 1", transliter: "internOne" },
//     { name: "Інтервю 2", transliter: "internSecond" },
//     { name: "Відео", transliter: "video" },
//     { name: "Фото", transliter: "foto" },
//     { name: "Вікова група", transliter: "yearGroup" },
//   ];

//   useEffect(() => {
//     const fetchHeroes = async () => {
//       const heroesCollection = collection(db, "hero");
//       const heroesSnapshot = await getDocs(heroesCollection);
//       const heroesData = heroesSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setHeroes(heroesData);
//     };

//     fetchHeroes();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "foto" && files.length > 0) {
//       setNewImage(files[0]);
//     } else {
//       setFormData((prevState) => ({ ...prevState, [name]: value }));
//     }
//   };

//   const handleHeroClick = (hero) => {
//     setSelectedHero(hero);
//     setFormData(hero);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       Swal.fire({
//         title: "Updating...",
//         html: "Please wait... <b></b>",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       if (newImage) {
//         const storageRef = ref(storage, `images/${newImage.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, newImage);

//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             Swal.getHtmlContainer().querySelector(
//               "b"
//             ).textContent = `${progress.toFixed(2)}%`;
//             console.log("progress", progress);
//           },
//           (error) => {
//             console.log("error uploading file", error);
//             Swal.fire({
//               title: "Error!",
//               text: "Failed to upload file.",
//               icon: "error",
//               confirmButtonText: "OK",
//             });
//           },
//           async () => {
//             const downloadURL = await getDownloadURL(storageRef);
//             formData.foto = downloadURL;

//             const heroRef = doc(db, "hero", selectedHero.id);
//             await updateDoc(heroRef, {
//               ...formData,
//             });

//             setHeroes((prevHeroes) =>
//               prevHeroes.map((hero) =>
//                 hero.id === selectedHero.id ? { ...hero, ...formData } : hero
//               )
//             );

//             Swal.fire({
//               title: "Success!",
//               text: "Hero updated successfully.",
//               icon: "success",
//               confirmButtonText: "OK",
//             });
//           }
//         );
//       } else {
//         const heroRef = doc(db, "hero", selectedHero.id);
//         await updateDoc(heroRef, {
//           ...formData,
//         });

//         setHeroes((prevHeroes) =>
//           prevHeroes.map((hero) =>
//             hero.id === selectedHero.id ? { ...hero, ...formData } : hero
//           )
//         );

//         Swal.fire({
//           title: "Success!",
//           text: "Hero updated successfully.",
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//       }
//     } catch (error) {
//       console.log("Error updating hero:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to update hero.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const handleDeleteHero = async (hero) => {
//     try {
//       await deleteDoc(doc(db, "hero", hero.id));

//       if (hero.foto) {
//         const imageRef = ref(storage, hero.foto);
//         await deleteObject(imageRef);
//       }

//       setHeroes((prevHeroes) => prevHeroes.filter((h) => h.id !== hero.id));

//       Swal.fire({
//         title: "Success!",
//         text: "Hero deleted successfully.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     } catch (error) {
//       console.log("Error deleting hero:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to delete hero.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   return (
//     <div className={css.WrapAdm}>
//       <h2>Hero List</h2>
//       <ul className={css.ulWrapPic}>
//         {heroes.map((hero) => (
//           <li key={hero.id} className={css.liWrapPic}>
//             <h3>{hero.name}</h3>
//             <button onClick={() => handleHeroClick(hero)}>Редагувати</button>
//             <button onClick={() => handleDeleteHero(hero)}>Видалити</button>
//           </li>
//         ))}
//       </ul>
//       {selectedHero && (
//         <form onSubmit={handleFormSubmit}>
//           {objList.map((el, index) => {
//             if (el.transliter === "foto") {
//               return (
//                 <div key={index} className={css.wrapSmallList}>
//                   <p className={css.paramBooks}>{el.name}</p>
//                   <input
//                     type="file"
//                     name={el.transliter}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               );
//             } else {
//               return (
//                 <div key={index} className={css.wrapSmallList}>
//                   <p className={css.paramBooks}>{el.name}</p>
//                   <input
//                     type="text"
//                     name={el.transliter}
//                     value={formData[el.transliter] || ""}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               );
//             }
//           })}
//           <button type="submit">Update Hero</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default HeroListEditor;
import React, { useState, useEffect } from "react";
import css from "../admin/adm.module.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";

const HeroListEditor = () => {
  const storage = getStorage();
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [formData, setFormData] = useState({});
  const [newImage, setNewImage] = useState(null);

  const objList = [
    { name: "Ім'я", transliter: "name" },
    { name: "Опис 1", transliter: "descOne" },
    { name: "Опис 2", transliter: "descSecond" },
    { name: "Автор", transliter: "autor" },
    { name: "Книга", transliter: "book" },
    { name: "Малий опис", transliter: "smallDesc" },

    { name: "Автор про героя", transliter: "autorAboutHero" },
    { name: "Історія створення", transliter: "history" },
    { name: "Інтервю 1", transliter: "internOne" },
    { name: "Інтервю 2", transliter: "internSecond" },
    { name: "Відео", transliter: "video" },
    { name: "Фото", transliter: "foto" },
    { name: "Вікова група", transliter: "yearGroup" },
  ];

  useEffect(() => {
    const fetchHeroes = async () => {
      const heroesCollection = collection(db, "hero");
      const heroesSnapshot = await getDocs(heroesCollection);
      const heroesData = heroesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHeroes(heroesData);
    };

    fetchHeroes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto" && files.length > 0) {
      setNewImage(files[0]);
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleHeroClick = (hero) => {
    setSelectedHero(hero);
    setFormData(hero);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      Swal.fire({
        title: "Updating...",
        html: "Please wait... <b></b>",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      if (newImage) {
        const storageRef = ref(storage, `images/${newImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, newImage);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            Swal.getHtmlContainer().querySelector(
              "b"
            ).textContent = `${progress.toFixed(2)}%`;
            console.log("progress", progress);
          },
          (error) => {
            console.log("error uploading file", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to upload file.",
              icon: "error",
              confirmButtonText: "OK",
            });
          },
          async () => {
            const downloadURL = await getDownloadURL(storageRef);
            formData.foto = downloadURL;

            const heroRef = doc(db, "hero", selectedHero.id);
            await updateDoc(heroRef, {
              ...formData,
            });

            setHeroes((prevHeroes) =>
              prevHeroes.map((hero) =>
                hero.id === selectedHero.id ? { ...hero, ...formData } : hero
              )
            );

            Swal.fire({
              title: "Success!",
              text: "Hero updated successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        );
      } else {
        const heroRef = doc(db, "hero", selectedHero.id);
        await updateDoc(heroRef, {
          ...formData,
        });

        setHeroes((prevHeroes) =>
          prevHeroes.map((hero) =>
            hero.id === selectedHero.id ? { ...hero, ...formData } : hero
          )
        );

        Swal.fire({
          title: "Success!",
          text: "Hero updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.log("Error updating hero:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update hero.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteHero = async (hero) => {
    try {
      await deleteDoc(doc(db, "hero", hero.id));

      if (hero.foto) {
        const imageRef = ref(storage, hero.foto);
        await deleteObject(imageRef);
      }

      setHeroes((prevHeroes) => prevHeroes.filter((h) => h.id !== hero.id));

      Swal.fire({
        title: "Success!",
        text: "Hero deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log("Error deleting hero:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete hero.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className={css.WrapAdmHero}>
      <h2>Список Героїв</h2>
      <ul className={css.ulWrapPic}>
        {heroes.map((hero) => (
          <li key={hero.id} className={css.liWrap}>
            <div className={css.wrapNameInHero}>
              <h3>{hero.name}</h3>
              <button
                onClick={() => handleHeroClick(hero)}
                className={css.redButAdm}
              >
                Редагувати
              </button>
              <button onClick={() => handleDeleteHero(hero)}>Видалити</button>
            </div>
            {selectedHero && selectedHero.id === hero.id && (
              <form onSubmit={handleFormSubmit}>
                {objList.map((el, index) => {
                  if (el.transliter === "foto") {
                    return (
                      <div key={index} className={css.wrapSmallList}>
                        <p className={css.paramBooks}>{el.name}</p>
                        <input
                          type="file"
                          name={el.transliter}
                          onChange={handleInputChange}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className={css.wrapSmallList}>
                        <p className={css.paramBooks}>{el.name}</p>
                        <input
                          type="text"
                          name={el.transliter}
                          value={formData[el.transliter] || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    );
                  }
                })}
                <button type="submit">Застосувати зміни</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroListEditor;
