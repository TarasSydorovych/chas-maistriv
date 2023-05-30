import css from './product.module.css'
import icon from '../../img/productPageImg.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/smallProductLike.svg';
import iconSrcCard from '../../svg/smallProductCard.svg';
import audio from '../../svg/audioSvg.svg'
import arrow from '../../img/arrowToSvg.png'
import autorPic from '../../img/productAutorPic.png'
import addToCart from '../../function/addToCard'
import { useState, useEffect } from 'react';
export default function ProductPageTitle({oneProd}) {
        const [liked, setLiked] = useState(false);
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

    return(
        <div className={css.productPageTitleWrap}>
             <div className={css.productPicWrap}>
                <div className={css.imgWrap}>
<img src={oneProd.bookFoto} className={css.icon}/>
<div className={css.new}>Новинка</div>
<div className={css.laureat}>Лауреат Корнійчуковської премії</div>
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
             <div className={css.productTitleWrap}>
                <h1 className={css.nameBook}>{oneProd.bookName}</h1>
                <div className={css.wrapHud}>
                <p className={css.autor}>Автор:&nbsp;<span className={css.autorNameSpan}>{oneProd.textAutor} &nbsp;</span><span className={css.autorDesc}>- мега-мозок, християнин, знаток теорії літератури, майстер слова</span></p>
                <p className={css.autor}>Художник:&nbsp;<span className={css.autorNameSpan}>{oneProd.picWriter}&nbsp;</span><span className={css.autorDesc}>- майстер іллюстрації, реаліст, графік, захоплюється історією</span></p>
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
Коментар автора<br/><span className={css.autorNameInCommentSpan}>{oneProd.textAutor}</span> 
</h3>
</div>
<div className={css.commentAndMoreWrapp}>
<p className={css.comment}>Ця книга пренесе у ваш дім диво перед зимовими святами. Лови мудрість книги! Герої допоможуть</p>
<h3 className={css.moreBooks}>Ще книги автора</h3>

</div>



                </div>


             </div>
        </div>
    )
}