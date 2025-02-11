import css from "./product.module.css";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function HeroPage({ oneProd }) {
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const heroQuery = query(
          collection(db, "hero"),
          where("name", "==", oneProd.bookHero)
        );
        const querySnapshot = await getDocs(heroQuery);

        querySnapshot.forEach((doc) => {
          const heroData = doc.data();

          setHeroData(heroData);
        });
      } catch (error) {
        console.error("Помилка при отриманні документів:", error);
      }
    };

    fetchHeroData();
  }, [oneProd.bookHero]);

  return (
    <div className={css.heroPageWrap}>
      {oneProd && oneProd.bookChu && (
        <div className={css.heroPageWrapSmall}>
          <div className={css.heroDesc}>
            <div className={css.someWrap}>{oneProd.bookChu}</div>
            <div className={css.hvistBig}></div>
          </div>
          {/* <button
            onClick={() => navigate(`/hero/${heroData.uid}`)}
            className={css.heroButton}
          >
            Сторінка героя
          </button> */}
        </div>
      )}
    </div>
  );
}
