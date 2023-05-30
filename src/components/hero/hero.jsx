import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import css from './hero.module.css'
import { collection, query, where, getDocs } from 'firebase/firestore';
import arrowImp from '../../img/arrowDownPick.png'
import authPic from '../../img/illa.png'
import arrowLeft from '../../img/arrowInHerpLeft.png'
import arrowRight from '../../img/arrowInHeroRight.png'
import autorPic from '../../img/productAutorPic.png'
import { useState, useEffect } from "react";

import ProductForHero from "./productForHero";
import YouTube from 'react-youtube';
import kurluk from '../../img/kurluk.png'
import LitShow from "../standartComponent/litShow/litShow";
import { Link, useNavigate } from 'react-router-dom';
import {auth, db} from '../../firebase'
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";
export default function HeroPage() {

    const [heroes, setHeroes] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const heroesPerPage = 6;
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedHero, setSelectedHero] = useState(null);
    const handleClickLeft = () => {
        setStartIndex((prevIndex) => Math.max(0, prevIndex - heroesPerPage));
      };
    
      const handleClickRight = () => {
        const maxIndex = Math.max(0, heroes.length - heroesPerPage);
        setStartIndex((prevIndex) => Math.min(maxIndex, prevIndex + heroesPerPage));
      };
    useEffect(() => {
        console.log('heroes',heroes);
        const fetchHeroes = async () => {
          try {
            const heroesRef = collection(db, 'hero');
            const querySnapshot = await getDocs(heroesRef);
    
            const heroData = [];
            querySnapshot.forEach((doc) => {
              heroData.push(doc.data());
            });
            
            setHeroes(heroData);
            setSelectedHero(heroData[0])
            console.log('selectedHero',selectedHero)
          } catch (error) {
            console.error('Помилка при отриманні документів:', error);
          }
        };
    
        fetchHeroes();
      }, []);
      useEffect(() => {
        const fetchProduct = async () => {
          try {
            const productQuery = query(
              collection(db, 'product'),
              where('bookHero', '==', selectedHero.name)
            );
            const querySnapshot = await getDocs(productQuery);
            
            if (!querySnapshot.empty) {
              const productData = querySnapshot.docs[0].data();
              setProduct(productData);
              
            } else {
              // Обробка випадку, коли товар не знайдено
              setProduct(null);
            }
          } catch (error) {
            console.error('Помилка при отриманні даних продукту:', error);
          }
        };
    
        if (selectedHero && selectedHero.name) {
          fetchProduct();
        } else {
          // Обробка випадку, коли selectedHero ще не встановлено або його значення некоректне
          setProduct(null);
        }
      }, [selectedHero]);
      const handleHeroClick = (hero) => {
        setSelectedHero(hero);
      };
      useEffect(() => {
        console.log('selectedHero', selectedHero);
        console.log('selectedHero', product);
      }, [selectedHero, product]);



      const goToBook = () => {
        console.log('product',product)
        navigate(`/product/${product.uid}`)
      }

    return(
        <div>
            <Header/>
            <div className={css.allBooksWrap}>
                <div className={css.allHero}>
                    <p className={css.yourPerfectHero}>Ваші улюблені герої книг<br/><span className={css.yourPerfectHeroSpan}>переймай найкраще від улюблених персонажів</span></p>
                    <div className={css.ageWrap}>
                        <p className={css.children}>Дитині</p>
                        <div className={css.chousBooksSelect}>
  <select className={css.customSelect} >
    <option className={css.customOpin} value="0">10 років</option>
    <option className={css.customOpin} value="1">8 років</option>
   
  </select>
  <img src={arrowImp} className={css.customArrowSelect} />
</div>
                    </div>
                </div>


                <div className={css.autorListSmal}>
                {heroes
          .slice(startIndex, startIndex + heroesPerPage)
          .map((hero) => (
                <div onClick={() => handleHeroClick(hero)} className={css.imgAutorWrapSmall}>
           
           <img src={hero.foto} className={css.imgAutorSmall}/>
           <p className={css.autorNameM}>{hero.name}</p>
           </div>
          ))}
           
           
</div>
<div className={css.arrowWrap}>
                <img src={arrowLeft} onClick={handleClickLeft} className={css.arrowLeftSt}/>
                <img src={arrowRight} onClick={handleClickRight} className={css.arrowRightSt}/>
            </div>
            </div>
            {/* наступний пункт велике фото героя + опис */}
{selectedHero &&
          <div className={css.wrapHeroBigFoto}>
<div className={css.wrapHeroBigFotoTwo}>
<div className={css.imgAutorWrapBig}>
                   <img src={authPic} className={css.imgAutorBig}/>
                   </div>
           <div className={css.descHeroOP}>
            <h1 className={css.heroName}>{selectedHero.name}</h1>
            <div className={css.descrWithDot}>
<div className={css.dot}></div>
<p className={css.dotP}>{selectedHero.descOne}</p>
            </div>
            <div className={css.descrWithDot}>
            <div className={css.dot}></div>
            <p className={css.dotP}>{selectedHero.descSecond}</p>
            </div>
            <p className={css.whatBook}>герой книги {selectedHero.autor}&nbsp; {selectedHero.book}</p>
            <button onClick={goToBook} className={css.buttonHeroo}>Перейти до книги</button>
          </div>
</div>
{/* жовтий блок */}
<div className={css.yellowFitchWrap}>
    <p className={css.yellowFitchWrapP}>{selectedHero.autorAboutHero}</p>
<div className={css.hvist}></div>
</div>
{/* блок автора */}

<div className={css.comentAutorWrap}>
<div className={css.autorPicWrap}>
<div className={css.autorPic}>
<div className={css.autorPicRotate}>
<img src={autorPic} />

</div>
</div>
<h3 className={css.autorNameInComment}>
Автор про героя<br/><span className={css.autorNameInCommentSpan}>{selectedHero.autor}</span> 
</h3>
</div>
<div className={css.commentAndMoreWrapp}>
<p className={css.comment}>{selectedHero.autorAboutHero}</p>
<h3 className={css.moreBooks}>Ще книги автора</h3>

</div>



                </div>
{/* закінчення блок автора */}
{/* блок історії */}
<div className={css.historiCreateBlock}>
    <h3 className={css.hictoryH3}>Історія створення</h3>
    <p className={css.hictoryP}>
    {selectedHero.history}
    </p>
</div>
{/* блок інтервю */}
<div className={css.blockInturv}>
    <div className={css.blockInturvSmall}>
<h3 className={css.inturvH3}>Інтерв’ю з героєм</h3>
<p className={css.inturvP}>
{selectedHero.internOne}
    </p>
    <p className={css.inturvP}>
    {selectedHero.internSecond}
    </p>
    </div>
</div>

          </div>
          }

{/* блок товарів */}
          <div className={css.theSameBooksWrap}>
            <div className={css.theSameBooksWrapSmall}>
                <h4 className={css.theSameH4}>Схожі книги</h4>
                <div className={css.smallBookLikeWrap}>
                <ProductForHero/>
                <ProductForHero/>
                <ProductForHero/>
                </div>
            </div>
          </div>
          {/* блок товарів */}
          {/* блок відео */}
          <div className={css.videoBlockWrap}>
            <div className={css.videoBlockWrapSmall}>
                <h4 className={css.seeBook}>Огляд книги</h4>
                <div className={css.video}>
                {selectedHero &&
<YouTube videoId={selectedHero.video} opts={{ width: '1193.03px', height: '714.56px' }} />
}
</div>
            </div>
          </div>
          {/* блок відео */}
          {/* блок умови проведення */}
         <LitShow/>
          
            <Footer/>
        </div>
    )
}