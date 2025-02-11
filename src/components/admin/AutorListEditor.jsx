// import React, { useState, useEffect } from "react";
// import css from "./adm.module.css";
// import {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";
// import Swal from "sweetalert2";

// const AuthorListEditor = () => {
//   const storage = getStorage();
//   const [authors, setAuthors] = useState([]);
//   const [selectedAuthor, setSelectedAuthor] = useState(null);
//   const [newImage, setNewImage] = useState(null);

//   useEffect(() => {
//     const fetchAuthors = async () => {
//       const authorsCollection = collection(db, "author");
//       const authorsSnapshot = await getDocs(authorsCollection);
//       const authorsData = authorsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setAuthors(authorsData);
//     };

//     fetchAuthors();
//   }, []);

//   const handleUpdateImage = async () => {
//     if (newImage && selectedAuthor) {
//       const imageRef = ref(storage, `authors/${newImage.name}`);
//       const uploadTask = uploadBytesResumable(imageRef, newImage);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           Swal.fire({
//             title: "Uploading...",
//             text: `Upload is ${progress}% done`,
//             icon: "info",
//             showConfirmButton: false,
//           });
//         },
//         (error) => {
//           Swal.fire({
//             title: "Error",
//             text: `Failed to upload image: ${error.message}`,
//             icon: "error",
//             confirmButtonText: "OK",
//           });
//         },
//         async () => {
//           const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
//           const authorRef = doc(db, "author", selectedAuthor.id);
//           await updateDoc(authorRef, { photoURL: imageUrl });
//           Swal.fire({
//             title: "Success",
//             text: "Image updated successfully",
//             icon: "success",
//             confirmButtonText: "OK",
//           });
//           setAuthors((prevAuthors) =>
//             prevAuthors.map((author) =>
//               author.id === selectedAuthor.id
//                 ? { ...author, photoURL: imageUrl }
//                 : author
//             )
//           );
//           setSelectedAuthor((prevAuthor) => ({
//             ...prevAuthor,
//             photoURL: imageUrl,
//           }));
//           setNewImage(null);
//         }
//       );
//     }
//   };

//   const handleDeleteImage = async () => {
//     if (selectedAuthor) {
//       const authorRef = doc(db, "author", selectedAuthor.id);
//       await updateDoc(authorRef, { photoURL: "" });
//       setAuthors((prevAuthors) =>
//         prevAuthors.map((author) =>
//           author.id === selectedAuthor.id ? { ...author, photoURL: "" } : author
//         )
//       );
//       setSelectedAuthor((prevAuthor) => ({ ...prevAuthor, photoURL: "" }));
//       Swal.fire({
//         title: "Success",
//         text: "Image deleted successfully",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const handleSelectAuthor = (author) => {
//     setSelectedAuthor(author);
//     setNewImage(null);
//   };

//   return (
//     <div>
//       <h2>Author List</h2>
//       <ul className={css.ulHer}>
//         {authors.map((author) => (
//           <li key={author.id} className={css.wrapAllPHL}>
//             <h3>{author.name}</h3>
//             {author.photoURL && (
//               <div className={css.wrapHeroF}>
//                 <img src={author.photoURL} alt={`Author ${author.name}`} />
//               </div>
//             )}
//             {selectedAuthor?.id === author.id && (
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setNewImage(e.currentTarget.files[0])}
//                 />
//                 <button onClick={handleUpdateImage}>Update Image</button>
//                 <button onClick={handleDeleteImage}>Delete Image</button>
//               </div>
//             )}
//             <button onClick={() => handleSelectAuthor(author)}>
//               {selectedAuthor?.id === author.id ? "Close" : "Edit"}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AuthorListEditor;
import React, { useState, useEffect } from "react";
import css from "./adm.module.css";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
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

const AuthorListEditor = () => {
  const storage = getStorage();
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorsCollection = collection(db, "author");
      const authorsSnapshot = await getDocs(authorsCollection);
      const authorsData = authorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAuthors(authorsData);
    };

    fetchAuthors();
  }, []);

  const handleUpdateImage = async () => {
    if (newImage && selectedAuthor) {
      const imageRef = ref(storage, `authors/${newImage.name}`);
      const uploadTask = uploadBytesResumable(imageRef, newImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          Swal.fire({
            title: "Uploading...",
            text: `Upload is ${progress}% done`,
            icon: "info",
            showConfirmButton: false,
          });
        },
        (error) => {
          Swal.fire({
            title: "Error",
            text: `Failed to upload image: ${error.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const authorRef = doc(db, "author", selectedAuthor.id);
          await updateDoc(authorRef, { photoURL: imageUrl });
          Swal.fire({
            title: "Success",
            text: "Image updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          setAuthors((prevAuthors) =>
            prevAuthors.map((author) =>
              author.id === selectedAuthor.id
                ? { ...author, photoURL: imageUrl }
                : author
            )
          );
          setSelectedAuthor((prevAuthor) => ({
            ...prevAuthor,
            photoURL: imageUrl,
          }));
          setNewImage(null);
        }
      );
    }
  };

  const handleDeleteImage = async () => {
    if (selectedAuthor && selectedAuthor.photoURL) {
      const imageRef = ref(storage, selectedAuthor.photoURL);
      await deleteObject(imageRef);
      const authorRef = doc(db, "author", selectedAuthor.id);
      await updateDoc(authorRef, { photoURL: "" });
      setAuthors((prevAuthors) =>
        prevAuthors.map((author) =>
          author.id === selectedAuthor.id ? { ...author, photoURL: "" } : author
        )
      );
      setSelectedAuthor((prevAuthor) => ({ ...prevAuthor, photoURL: "" }));
      Swal.fire({
        title: "Success",
        text: "Image deleted successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteAuthor = async () => {
    if (selectedAuthor) {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this author?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (confirmResult.isConfirmed) {
        await deleteDoc(doc(db, "author", selectedAuthor.id));
        if (selectedAuthor.photoURL) {
          const imageRef = ref(storage, selectedAuthor.photoURL);
          await deleteObject(imageRef);
        }
        setAuthors((prevAuthors) =>
          prevAuthors.filter((author) => author.id !== selectedAuthor.id)
        );
        setSelectedAuthor(null);
        Swal.fire("Deleted!", "The author has been deleted.", "success");
      }
    }
  };

  const handleSelectAuthor = (author) => {
    setSelectedAuthor(author);
    setNewImage(null);
  };

  return (
    <div>
      <h2>Author List</h2>
      <ul className={css.ulHer}>
        {authors.map((author) => (
          <li key={author.id} className={css.wrapAllPHL}>
            <h3>{author.name}</h3>
            {author.photoURL && (
              <div className={css.wrapHeroF}>
                <img src={author.photoURL} alt={`Author ${author.name}`} />
              </div>
            )}
            {selectedAuthor?.id === author.id && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImage(e.currentTarget.files[0])}
                />
                <button onClick={handleUpdateImage}>Змінити фото</button>
                <button onClick={handleDeleteImage}>Видалити фото</button>
                <button onClick={handleDeleteAuthor}>Видалити автора</button>
              </div>
            )}
            <button onClick={() => handleSelectAuthor(author)}>
              {selectedAuthor?.id === author.id ? "Закрити" : "Редагувати"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorListEditor;
