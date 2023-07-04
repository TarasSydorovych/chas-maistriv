import './productStyle.css'
import ProductPic  from '../../../img/smaPicCart.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/likeSvgSale.svg';
import iconSrcCard from '../../../svg/shapCartSale.svg';
import { useState, useEffect } from 'react';
import addToCart from '../../../function/addToCard'
import { Link } from 'react-router-dom';

export default function SmallProductCartSale({el}) {
    const [liked, setLiked] = useState(false);
    
    
    useEffect(() => {
        // Отримуємо дані з localStorage
        const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    
        // Перевіряємо, чи товар є в масиві подобається
        const isLiked = likedProducts.some(product => product.uid === el.uid);
    
        // Встановлюємо відповідний стан liked
        setLiked(isLiked);
      }, []);
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
        <div className='smallProductWrap'>
            <img src={el.imageList[0]} className="productPicSmall"/>
            <div className='prodPricLikeCart'>

            <div className='prdeProdPricingCartSale'>
            <div className='prdeProdPricingRotateCart'>
            
            <p className='salePriceCartSale'>{el.price}</p>
            <p className='fullPriceCartG'>грн</p>
            </div>
           </div>
           <div className='likeCardWrapSmall'>
<div  className={`likeProductSmallSale${liked ? 'Click' : ''}`} onClick={handleLike}>
<HandySvg 
                    src={iconSrc}
                    width="34"
        height="31"
                    />
</div>
<div className='likeProductSmallSale' onClick={() => addToCart(el.uid)}>
<HandySvg 
                    src={iconSrcCard}
                    width="28.33"
        height="28.33"
                    />
</div>
</div>
            </div>
    <h2 className='smallProdName'>
    <Link className='smallProdName' to={`/product/${el.uid}`}>
    {el.bookName}
    </Link>
    </h2>



    <div className='autorInformCart'>
                <div className='autorInformSectionCart'>
                    <p>Автор:&nbsp;</p><h4>{el.textAutor}</h4>
                </div>
                <div className='autorInformSectionCart'>
                    <p>Художник:&nbsp;</p><h4>{el.bDesign}</h4>
                </div>
            </div>
            <p className='descriptionBooksCart'>{el.descriptionSe}
</p>

        </div>
    )
}