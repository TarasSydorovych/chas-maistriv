import css from "./product.module.css";
import hero from "../../img/hero.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
export default function Hero({ oneProd }) {
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
    <div className={css.heroWrapp}>
      {oneProd && oneProd.heroFoto && (
        <div className={css.heroPicRo}>
          <div className={css.heroPicRoteta}>
            <img src={oneProd.heroFoto} className={css.theSameHeroPic} />
          </div>
        </div>
      )}
      {oneProd && !oneProd.heroFoto && (
        <div className={css.heroPicRo}>
          <div className={css.heroPicRoteta}>
            <img src={hero} className={css.theSameHeroPic} />
          </div>
        </div>
      )}
      {/* <div className={css.heroPicRo}>
        <div className={css.heroPicRoteta}>
          <img src={hero} />
        </div>
      </div> */}

      <div className={css.wrapHeroText}>
        <h1 className={css.wrapHeroTextH1}>{oneProd.heroLabelText}</h1>
        <p className={css.wrapHeroTextP}>{oneProd.heroParagrafText}</p>
        <button
          onClick={() => navigate(`/hero/${heroData.uid}`)}
          className={css.heroButton}
        >
          Сторінка героя
        </button>
      </div>
    </div>
  );
}
