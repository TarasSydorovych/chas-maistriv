import pic1 from "../../img/pic1.png";
import pic2 from "../../img/pic2.png";
import { HandySvg } from "handy-svg";
import iconSrc from "../../svg/likeBook.svg";
import "./mainPage.css";
import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import { combineReducers } from "@reduxjs/toolkit";
const Obcladunka = ({ windowDimensions, data }) => {
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [ratings, setRatings] = useState([]);
  const likepick = async (lab) => {
    const selectedOption = sessionStorage.getItem("selectedOption");
    const ratingRef = doc(db, "rating", "24ac945b-7109-489a-8901-d3667388f6a0"); // Замініть 'your_document_id' на ID вашого документа

    let newFirstRating = parseInt(ratings[0].firstRating);
    let newSecondRating = parseInt(ratings[0].secondRating);

    if (selectedOption === "first") {
      newFirstRating -= 1;
    } else if (selectedOption === "second") {
      newSecondRating -= 1;
    }

    if (lab === "first") {
      newFirstRating += 1;
      setFirst(true);
      setSecond(false);
      sessionStorage.setItem("selectedOption", "first");
    } else if (lab === "second") {
      newSecondRating += 1;
      setFirst(false);
      setSecond(true);
      sessionStorage.setItem("selectedOption", "second");
    }

    await updateDoc(ratingRef, {
      firstRating: newFirstRating.toString(),
      secondRating: newSecondRating.toString(),
    });
  };

  // useEffect(() => {
  //     const ratingsRef = collection(db, 'rating');
  //     const q = query(ratingsRef);
  //     console.log('rating', q);
  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       const updatedRatings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //       setRatings(updatedRatings);

  //     });

  //     // Get selected option from sessionStorage
  //     const selectedOption = sessionStorage.getItem('selectedOption');
  //     if (selectedOption === 'first') {
  //       setFirst(true);
  //       setSecond(false);
  //     } else if (selectedOption === 'second') {
  //       setFirst(false);
  //       setSecond(true);
  //     }

  //     // Cleanup subscription
  //     return () => {
  //       unsubscribe();
  //     };
  //   }, []);
  useEffect(() => {}, [data]);
  useEffect(() => {
    const fetchRatings = async () => {
      const ratingsRef = collection(db, "rating");
      const q = query(ratingsRef);

      try {
        const querySnapshot = await getDocs(q);
        const updatedRatings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRatings(updatedRatings);
      } catch (error) {
        console.log("Помилка при отриманні даних з колекції rating:", error);
      }
    };

    fetchRatings();

    // Get selected option from sessionStorage
    const selectedOption = sessionStorage.getItem("selectedOption");
    if (selectedOption === "first") {
      setFirst(true);
      setSecond(false);
    } else if (selectedOption === "second") {
      setFirst(false);
      setSecond(true);
    }
  }, [data]);

  return (
    <div className="opWrap">
      {data.length > 0 && (
        <div className="obSmallWrap">
          <h1 className="obcladH1">Яка обкладинка вам більше довподоби ?</h1>
          <div className="wrapTwoPic">
            <div className="wrapPicAndIcon">
              <img
                src={data[0].bookFoto}
                className="picOb"
                alt={`${data[0].bookName}`}
              />
              <div
                onClick={() => likepick("first")}
                className={`likeBook ${first ? "selected" : ""}`}
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
                alt={`${data[0].bookName}`}
              />
              <div
                onClick={() => likepick("second")}
                className={`likeBook ${second ? "selected" : ""}`}
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
