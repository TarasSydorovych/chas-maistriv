import css from './hero.module.css'
import ProductPic  from '../../img/smaPicCart.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/smallProductLike.svg';
import iconSrcCard from '../../svg/smallProductCard.svg';
import addToCart from '../../function/addToCard'
import { useState } from 'react';

export default function ProductForHero({el}) {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        // Отримуємо дані з localStorage
        let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    
        if (!liked) {
          // Додаємо товар до масиву подобається
          
          likedProducts.push(el);
        } else {
          // Видаляємо товар з масиву подобається
          const updatedLikedProducts = likedProducts.filter(product => product.uid !== el.uid);
          likedProducts = updatedLikedProducts;
        }
    
        // Зберігаємо оновлений масив у localStorage
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    
        // Змінюємо стан liked
        setLiked(!liked);
      };


    return(
        <div className={css.smallProductWrap}>
        <img src={el.imageList[0]} className={css.productPicSmall}/>
        <div className={css.prodPricLikeCart}>

        <div className={css.prdeProdPricingCart}>
        <div className={css.prdeProdPricingRotateCart}>
        
        <p className={css.salePriceCart}>{el.price}</p>
        <p className={css.fullPriceCart}>грн</p>
        </div>
       </div>
       <div className={css.likeCardWrapSmall}>
       <div className={`${css.likeProductSmall} ${liked ? css.likeProductSmallClick : ''}`} onClick={handleLike}>
<HandySvg 
                src={iconSrc}
                width="34"
    height="31"
                />
</div>
<div className={css.likeProductSmall} onClick={() => addToCart(el.uid)}>
<HandySvg 
                src={iconSrcCard}
                width="28.33"
    height="28.33"
                />
</div>
</div>
        </div>
<h2 className={css.smallProdName}>
{el.bookName}
</h2>



<div className={css.autorInformCart}>
            <div className={css.autorInformSectionCart}>
                <p className={css.pLikeP}>Автор:&nbsp;</p><h4 className={css.h4LikeP}>{el.textAutor}</h4>
            </div>
            <div className={css.autorInformSectionCart}>
                <p className={css.pLikeP}>Художник:&nbsp;</p><h4 className={css.h4LikeP}>{el.picWriter}</h4>
            </div>
        </div>
   

    </div>
    )
}