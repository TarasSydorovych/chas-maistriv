// import css from "./foreignRights.module.css";
// import photoForForeight from "../../img/photoForForeight.png";
// const Banner = () => {
//   return (
//     <div className={css.wrapBanner}>
//       <div className={css.wrapFirstTextIn}>
//         <p className={css.mainP}>CHAS MAISTRIV Publishing House since 1999</p>
//         <p className={css.descPBanner}>
//           Our mission is to create innovative books for children as part of the
//           environment of love, that special setting where children are helped to
//           form knowledge, intelligence, wisdom, and culture – resulting in a
//           unique HUMAN PERSON. Children are people, yet small now, but who will
//           very soon be shaping the future of mankind. Every day we learn, grow
//           in wisdom, open ourselves to life itself, giving us a love to create
//           books which are needed in the world now.
//           <br />
//           <span className={css.spanDescBanner}>
//             Location: Kyiv, UKRAINE
//             <br /> Year established: 1999
//             <br /> Focus: literature for children, textbooks, popular science,
//             educational literature
//           </span>
//         </p>
//         <div className={css.buttonRight}>Rights Guide</div>
//       </div>
//       <img src={photoForForeight} className={css.photoForForeight} alt="Фото" />
//     </div>
//   );
// };
// export default Banner;
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import css from "./foreignRights.module.css";
import photoForForeight from "../../img/photoForForeight.png";

const Banner = () => {
  const [link, setLink] = useState(""); // Посилання з Firebase
  const [loading, setLoading] = useState(true);
  const documentId = "uniqueForeignRight"; // ID документа

  useEffect(() => {
    const fetchForeignRightLink = async () => {
      try {
        const docRef = doc(db, "foreignRights", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLink(docSnap.data().link || ""); // Отримання посилання
        } else {
          console.error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching link:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForeignRightLink();
  }, []);

  if (loading) {
    return <div>Loading banner...</div>;
  }

  return (
    <div className={css.wrapBanner}>
      <div className={css.wrapFirstTextIn}>
        <p className={css.mainP}>CHAS MAISTRIV Publishing House since 1999</p>
        <p className={css.descPBanner}>
          Our mission is to create innovative books for children as part of the
          environment of love, that special setting where children are helped to
          form knowledge, intelligence, wisdom, and culture – resulting in a
          unique HUMAN PERSON. Children are people, yet small now, but who will
          very soon be shaping the future of mankind. Every day we learn, grow
          in wisdom, open ourselves to life itself, giving us a love to create
          books which are needed in the world now.
          <br />
          <span className={css.spanDescBanner}>
            Location: Kyiv, UKRAINE
            <br /> Year established: 1999
            <br /> Focus: literature for children, textbooks, popular science,
            educational literature
          </span>
        </p>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={css.buttonRight}
          >
            Rights Guide
          </a>
        ) : (
          <div className={css.buttonRightDisabled}>
            No Rights Guide Available
          </div>
        )}
      </div>
      <img src={photoForForeight} className={css.photoForForeight} alt="Фото" />
    </div>
  );
};

export default Banner;
