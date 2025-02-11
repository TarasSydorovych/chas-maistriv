import css from "./hero.module.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import transliterate from "../../function/transliterate";
import { Link } from "react-router-dom";
export default function OneHero({
  heroesList,
  handleHeroClick,
  startIndex,
  heroesPerPage,
  hero,
  selectedHero,
}) {
  const [matchingBook, setMatchingBook] = useState(null);

  useEffect(() => {
    const fetchMatchingBook = async () => {
      const productsRef = collection(db, "product");
      const q = query(productsRef, where("bookName", "==", hero.book));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Зберігаємо перший знайдений документ, якщо є збіг
        setMatchingBook(querySnapshot.docs[0].data());
      }
    };

    fetchMatchingBook();
  }, [hero.book]);

  return (
    <div
      onClick={() => handleHeroClick(hero)}
      className={css.imgAutorWrapSmall}
    >
      <img
        src={hero.foto}
        className={`${css.imgAutorSmall} ${
          selectedHero && selectedHero.uid === hero.uid
            ? css.selectedHeroImage
            : ""
        }`}
      />
      <p className={css.autorNameM}>{hero.name}</p>
      {matchingBook && matchingBook.bookName && (
        <Link
          to={`/product/${transliterate(matchingBook.bookName)}`}
          className={css.autorNameMSma}
        >
          Герой книги:&nbsp;{hero.book}
        </Link>
      )}
      {!matchingBook && (
        <p className={css.autorNameMSma}>Герой книги:&nbsp;{hero.book}</p>
      )}
      <p className={css.autorNameMbigCol}>{hero.descSecond}</p>
    </div>
  );
}
