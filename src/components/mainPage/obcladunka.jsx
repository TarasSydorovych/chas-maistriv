// import pic1 from "../../img/pic1.png";
// import pic2 from "../../img/pic2.png";
// import { HandySvg } from "handy-svg";
// import iconSrc from "../../svg/likeBook.svg";
// import "./mainPage.css";
// import { auth, db } from "../../firebase";
// import { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   onSnapshot,
//   doc,
//   updateDoc,
//   getDocs,
// } from "firebase/firestore";
// import withFirebaseCollection from "../HOK/withFirebaseCollection";
// import { combineReducers } from "@reduxjs/toolkit";
// const Obcladunka = ({ windowDimensions, data }) => {
//   const [first, setFirst] = useState(false);
//   const [second, setSecond] = useState(false);
//   const [ratings, setRatings] = useState([]);
//   const likepick = async (lab) => {
//     const selectedOption = sessionStorage.getItem("selectedOption");
//     const ratingRef = doc(db, "rating", "24ac945b-7109-489a-8901-d3667388f6a0"); // Замініть 'your_document_id' на ID вашого документа

//     let newFirstRating = parseInt(ratings[0].firstRating);
//     let newSecondRating = parseInt(ratings[0].secondRating);

//     if (selectedOption === "first") {
//       newFirstRating -= 1;
//     } else if (selectedOption === "second") {
//       newSecondRating -= 1;
//     }

//     if (lab === "first") {
//       newFirstRating += 1;
//       setFirst(true);
//       setSecond(false);
//       sessionStorage.setItem("selectedOption", "first");
//     } else if (lab === "second") {
//       newSecondRating += 1;
//       setFirst(false);
//       setSecond(true);
//       sessionStorage.setItem("selectedOption", "second");
//     }

//     await updateDoc(ratingRef, {
//       firstRating: newFirstRating.toString(),
//       secondRating: newSecondRating.toString(),
//     });
//   };

//   // useEffect(() => {
//   //     const ratingsRef = collection(db, 'rating');
//   //     const q = query(ratingsRef);
//   //     console.log('rating', q);
//   //     const unsubscribe = onSnapshot(q, (snapshot) => {
//   //       const updatedRatings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   //       setRatings(updatedRatings);

//   //     });

//   //     // Get selected option from sessionStorage
//   //     const selectedOption = sessionStorage.getItem('selectedOption');
//   //     if (selectedOption === 'first') {
//   //       setFirst(true);
//   //       setSecond(false);
//   //     } else if (selectedOption === 'second') {
//   //       setFirst(false);
//   //       setSecond(true);
//   //     }

//   //     // Cleanup subscription
//   //     return () => {
//   //       unsubscribe();
//   //     };
//   //   }, []);
//   useEffect(() => {}, [data]);
//   useEffect(() => {
//     const fetchRatings = async () => {
//       const ratingsRef = collection(db, "rating");
//       const q = query(ratingsRef);

//       try {
//         const querySnapshot = await getDocs(q);
//         const updatedRatings = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setRatings(updatedRatings);
//       } catch (error) {
//         console.log("Помилка при отриманні даних з колекції rating:", error);
//       }
//     };

//     fetchRatings();

//     // Get selected option from sessionStorage
//     const selectedOption = sessionStorage.getItem("selectedOption");
//     if (selectedOption === "first") {
//       setFirst(true);
//       setSecond(false);
//     } else if (selectedOption === "second") {
//       setFirst(false);
//       setSecond(true);
//     }
//   }, [data]);

//   return (
//     <div className="opWrap">
//       {data.length > 0 && (
//         <div className="obSmallWrap">
//           <h1 className="obcladH1">Яка обкладинка вам більше довподоби ?</h1>
//           <div className="wrapTwoPic">
//             <div className="wrapPicAndIcon">
//               <img
//                 src={data[0].bookFoto}
//                 className="picOb"
//                 alt={`${data[0].bookName}`}
//               />
//               <div
//                 onClick={() => likepick("first")}
//                 className={`likeBook ${first ? "selected" : ""}`}
//               >
//                 <HandySvg
//                   src={iconSrc}
//                   className="likeBookIcon"
//                   width="50"
//                   height="40"
//                 />
//               </div>
//             </div>
//             <div className="wrapPicAndIcon">
//               <img
//                 src={data[0].fotoRozgort}
//                 className="picOb"
//                 alt={`${data[0].bookName}`}
//               />
//               <div
//                 onClick={() => likepick("second")}
//                 className={`likeBook ${second ? "selected" : ""}`}
//               >
//                 <HandySvg
//                   src={iconSrc}
//                   className="likeBookIcon"
//                   width="50"
//                   height="40"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default withFirebaseCollection("rating")(Obcladunka);
import { useState, useEffect } from "react";
import { HandySvg } from "handy-svg";
import { doc, updateDoc, collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import iconSrc from "../../svg/likeBook.svg";
import "./mainPage.css";

const DOCUMENT_ID = "24ac945b-7109-489a-8901-d3667388f6a0";

const Obcladunka = ({ data }) => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [ratings, setRatings] = useState({
    firstRating: "0",
    secondRating: "0",
  });

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsRef = collection(db, "rating");
        const q = query(ratingsRef);
        const querySnapshot = await getDocs(q);

        const ratingData = querySnapshot.docs
          .find((doc) => doc.id === DOCUMENT_ID)
          ?.data();

        if (ratingData) {
          setRatings({
            firstRating: parseInt(ratingData.firstRating || "0"),
            secondRating: parseInt(ratingData.secondRating || "0"),
          });
        }

        // Отримуємо вибір з localStorage
        const storedVote = localStorage.getItem("selectedVote");
        if (storedVote) {
          setSelectedVote(storedVote);
        }
      } catch (error) {
        console.error("Помилка при отриманні рейтингу:", error);
      }
    };

    fetchRatings();
  }, []);

  const likepick = async (choice) => {
    if (selectedVote === choice) {
      console.log("Ви вже голосували за цю картинку!");
      return;
    }

    const ratingRef = doc(db, "rating", DOCUMENT_ID);
    let { firstRating, secondRating } = ratings;

    // Віднімаємо голос від попереднього вибору
    if (selectedVote === "first") {
      firstRating = Math.max(0, firstRating - 1);
    } else if (selectedVote === "second") {
      secondRating = Math.max(0, secondRating - 1);
    }

    // Додаємо голос до нового вибору
    if (choice === "first") {
      firstRating += 1;
    } else if (choice === "second") {
      secondRating += 1;
    }

    setRatings({ firstRating, secondRating });
    setSelectedVote(choice);
    localStorage.setItem("selectedVote", choice);

    await updateDoc(ratingRef, {
      firstRating: firstRating.toString(),
      secondRating: secondRating.toString(),
    });
  };

  return (
    <div className="opWrap">
      {data.length > 0 && (
        <div className="obSmallWrap">
          <h1 className="obcladH1">Яка обкладинка вам більше до вподоби?</h1>
          <div className="wrapTwoPic">
            <div className="wrapPicAndIcon">
              <img
                src={data[0].bookFoto}
                className="picOb"
                alt={data[0].bookName}
              />
              <div
                onClick={() => likepick("first")}
                className={`likeBook ${
                  selectedVote === "first" ? "selected" : ""
                }`}
              >
                <HandySvg
                  src={iconSrc}
                  className="likeBookIcon"
                  width="50"
                  height="40"
                />
              </div>
            </div>
            <div className="wrapPicAndIcon">
              <img
                src={data[0].fotoRozgort}
                className="picOb"
                alt={data[0].bookName}
              />
              <div
                onClick={() => likepick("second")}
                className={`likeBook ${
                  selectedVote === "second" ? "selected" : ""
                }`}
              >
                <HandySvg
                  src={iconSrc}
                  className="likeBookIcon"
                  width="50"
                  height="40"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withFirebaseCollection("rating")(Obcladunka);
