import css from './product.module.css'
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {auth, db} from '../../firebase'
import { useNavigate } from 'react-router-dom';

export default function HeroPage({oneProd}) {

   const navigate = useNavigate();
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
      const fetchHeroData = async () => {
        try {
          const heroQuery = query(collection(db, 'hero'), where('name', '==', oneProd.bookHero));
          const querySnapshot = await getDocs(heroQuery);
  
          querySnapshot.forEach((doc) => {
            const heroData = doc.data();
            setHeroData(heroData);
          });
        } catch (error) {
          console.error('Помилка при отриманні документів:', error);
        }
      };
  
      fetchHeroData();
    }, [oneProd.bookHero]);

    return(
       
        <div className={css.heroPageWrap}>
             {heroData &&
         <div className={css.heroPageWrapSmall}>
            <div className={css.heroDesc}>
            "...поспішиш — людей насмішиш. Ось і насмішив... до сліз горючих. Що називається, поїхав би ускач, ан сиди та плач. Але Ілля не плакав. Його батечко змалку вчив, що сльозами горю не допоможеш." «Рало тягаю не задля зарядки, а для порядку...» — любив приказувати він, всаджуючи твердою, як підошва, долонею цвях у кленовий стовбур. . Молитва його була простою: «Господи, помилуй!» . Правда, бити байдики вдавалося не часто, тому що в доброго господаря і каліці знайдеться робота.
            <div className={css.hvistBig}></div>
            </div>
            <button onClick={() => navigate(`/hero/${heroData.uid}`)} className={css.heroButton}>Сторінка героя</button>
         </div>
       
}
        </div>
    
    )
}