import css from './product.module.css'
import icon from '../../img/productPageImg.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/smallProductLike.svg';
import React from 'react';
import iconSrcCard from '../../svg/smallProductCard.svg';
import audio from '../../svg/audioSvg.svg'
import { useMediaQuery } from 'react-responsive';
import { useSwipeable } from 'react-swipeable';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import arrow from '../../img/arrowToSvg.png'
import autorPic from '../../img/productAutorPic.png'
import addToCart from '../../function/addToCard'
import { PhotoProvider, PhotoSlider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {auth, db} from '../../firebase'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useState, useEffect } from 'react';
import ead from '../../img/ease.png'
import hearing from '../../img/hearing.png'
import bookPNG from '../../img/bookPNG.png'

import { Link } from 'react-router-dom';
import MusicPop from '../popUp/musicPop';
export default function ProductPageTitle({oneProd}) {
        const [liked, setLiked] = useState(false);
        const [heroData, setHeroData] = useState(null);
        const [photoViewerOpen, setPhotoViewerOpen] = useState(false);
        const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
              const [currentIndex, setCurrentIndex] = useState(0);
              const [showPlayer, setShowPlayer] = useState(false);
        const isMobile = useMediaQuery({ maxWidth: 767 });
        const handleClick = () => {
          setShowPlayer(!showPlayer);
        };
  useEffect(() => {
        const fetchHeroData = async () => {
          try {
            const heroQuery = query(collection(db, 'author'), where('name', '==', oneProd.textAutor));
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
        useEffect(() => {
                // Отримуємо дані з localStorage
                const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
            
                // Перевіряємо, чи товар є в масиві подобається
                const isLiked = likedProducts.some(product => product.uid === oneProd.uid);
            
                // Встановлюємо відповідний стан liked
                setLiked(isLiked);
              }, []);
              const handleLike = () => {
                // Отримуємо дані з localStorage
                let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
            
                if (!liked) {
                  // Додаємо товар до масиву подобається
                  
                  likedProducts.push(oneProd);
                } else {
                  // Видаляємо товар з масиву подобається
                  const updatedLikedProducts = likedProducts.filter(product => product.uid !== oneProd.uid);
                  likedProducts = updatedLikedProducts;
                }
            
                // Зберігаємо оновлений масив у localStorage
                localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
            
                // Змінюємо стан liked
                setLiked(!liked);
              };
              const openPhotoViewer = (index) => {
                setSelectedPhotoIndex(index);
                setPhotoViewerOpen(true);
              };
            
              const closePhotoViewer = () => {
                setPhotoViewerOpen(false);
              };
            
              // Форматування фотографій для використання в React Image Gallery
              const formattedPhotos = oneProd.imageList.map((photo) => ({
                original: photo,
                thumbnail: photo,
              }));
              const images = oneProd.imageList.map(image => ({
                original: image, // Велике зображення
                thumbnail: image, // Мініатюра зображення
              }));
              const handleSwipe = (direction) => {
                if (direction === 'left') {
                  setCurrentIndex((prevIndex) => (prevIndex + 1) % oneProd.imageList.length);
                } else if (direction === 'right') {
                  setCurrentIndex((prevIndex) => (prevIndex - 1 + oneProd.imageList.length) % oneProd.imageList.length);
                }
              };
            

    return(
        <div className={css.productPageTitleWrap}>
             <div className={css.productPicWrap}>
             <div className={css.imgWrap}>
             {/*renderGallery()*/}
            <PhotoProvider
             speed={() => 800}
  easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}

  toolbarRender={({ rotate, onRotate }) => {
    return <svg className="PhotoView-Slider__toolbarIcon" onClick={() => onRotate(rotate + 90)} />;
  }}
>
  {oneProd.imageList.map((item, index) => (
    <PhotoView key={index} src={item}>
      {index < 1 ? <img src={item} alt="" className={css.icon}/> : undefined}
    
    </PhotoView>
   
  ))}
   
</PhotoProvider>
          {/* Використання React Image Gallery 
          <ImageGallery
            items={formattedPhotos}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={true}
            onSlide={(_, index) => setSelectedPhotoIndex(index)}
            startIndex={selectedPhotoIndex}
          />
*/}
           <div className={css.insWrap}>
      <div className={css.insWrpaimg}>
        <img src={ead} alt="ins" />
        <img src={ead} alt="ins" />
      </div>
      <p className={css.insaidP}>INSAID</p>
    </div>
    <div className={css.insWrapHE} onClick={handleClick}>
      
        <img src={hearing} alt="ins" />
        
     
      <p className={css.insaidP}>LISTEN</p>
    </div>
    {showPlayer &&
      <MusicPop oneProd={oneProd.audio}/>
     }
   
    <a href={oneProd.pdf} target="_blanck">
    <div className={css.insWrapHER} >
      
        <img src={bookPNG} alt="ins" />
        
     
      <p className={css.insaidP}>READ</p>
    </div>
    </a>
   
          {oneProd.novunka === 'true' && <div className={css.new}>Новинка</div>}
          {oneProd.laureat === 'true' && <div className={css.laureat}>Лауреат Корнійчуковської премії</div>}
        </div>
<div className={css.iconWithPrice}>

<div className={css.rombWrap}>
<div className={css.rombWrapRotate}>
<p className='salePriceCartBigProd'>{oneProd.price}</p>
<p className='fullPriceCartBigProd'>грн</p>
</div>
</div>
<div className={css.wrapIconAu}>
<div className={`likeProductBig${liked ? 'Click' : ''}`} onClick={handleLike}>
<HandySvg 
        src={iconSrc}
        width="34"
height="31"
        />
</div>
<div className='likeProductBig' onClick={() => addToCart(oneProd.uid)}>
<HandySvg 
        src={iconSrcCard}
        width="28.33"
height="28.33"
        />
</div>
<div className={css.audioBook}>
<HandySvg 
        src={audio}
        width="36.24"
height="28"
        />
        
        <img src={arrow} />
</div>

</div>
</div>

             </div>
             {oneProd && heroData &&
             <div className={css.productTitleWrap}>
                <h1 className={css.nameBook}>{oneProd.bookName}</h1>
                <div className={css.wrapHud}>
                <p className={css.autor}>Автор:&nbsp;<span className={css.autorNameSpan}><Link className={css.autorNameSpan} to={`/author/${heroData.uid}`}>{oneProd.textAutor} </Link>&nbsp;</span><span className={css.autorDesc}>- {oneProd.shortAboutAuth}</span></p>
                <p className={css.autor}>Художник:&nbsp;<span className={css.autorNameSpan}>{oneProd.picWriter}&nbsp;</span><span className={css.autorDesc}> - {oneProd.shortAboutDesig}</span></p>
                </div>
               <div className={css.powerWrap}>
                <p className={css.power}>Сила</p>
                <p className={css.powerDesc}>{oneProd.bookPower}
                
                </p>
                <br/>
                </div>
               <p className={css.opusBook}> {oneProd.descriptionSe}</p>
                
                <div className={css.comentAutorWrap}>
<div className={css.autorPicWrap}>
<div className={css.autorPic}>
<div className={css.autorPicRotate}>
<img src={autorPic} />

</div>
</div>
<h3 className={css.autorNameInComment}>
Коментар автора<br/><span className={css.autorNameInCommentSpan}><Link className={css.autorNameInCommentSpan} to={`/author/${heroData.uid}`}>{oneProd.textAutor}</Link></span> 
</h3>
</div>
<div className={css.commentAndMoreWrapp}>
<p className={css.comment}>Ця книга пренесе у ваш дім диво перед зимовими святами. Лови мудрість книги! Герої допоможуть</p>
<h3 className={css.moreBooks}><Link className={css.moreBooks} to='/catalog'>Ще книги автора</Link> </h3>

</div>



                </div>


             </div>
             }
              {photoViewerOpen && (
        <div className={css.photoViewer}>
          {/* Відображення фотографій у переглядачі */}
          <ImageGallery
            items={formattedPhotos}
            showThumbnails={true}
            showFullscreenButton={true}
            showPlayButton={false}
            showNav={true}
            onSlide={(_, index) => setSelectedPhotoIndex(index)}
            startIndex={selectedPhotoIndex}
          />

          <button className={css.closeButton} onClick={closePhotoViewer}>
            Закрити
          </button>
        </div>
      )}

        </div>
    )
}