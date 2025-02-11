import React, { useState, useEffect } from "react";
import css from "./adm.module.css";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const VotingResults = () => {
  const [ratingData, setRatingData] = useState(null);

  useEffect(() => {
    const fetchRatingData = async () => {
      const docRef = doc(db, "rating", "24ac945b-7109-489a-8901-d3667388f6a0");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRatingData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchRatingData();
  }, []);

  return (
    <div className={css.resultsWrap}>
      {ratingData ? (
        <>
          <div className={css.bookBlock}>
            <h2>{ratingData.firstBook}</h2>
            <img
              src={ratingData.bookFoto}
              alt={ratingData.firstBook}
              className={css.booKsRationf}
            />
            <p>Голоси: {ratingData.firstRating}</p>
          </div>
          <div className={css.bookBlock}>
            <h2>{ratingData.secondBook}</h2>
            <img
              src={ratingData.fotoRozgort}
              alt={ratingData.secondBook}
              className={css.booKsRationf}
            />
            <p>Голоси: {ratingData.secondRating}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VotingResults;
