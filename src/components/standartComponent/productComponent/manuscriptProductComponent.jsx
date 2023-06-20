import './productStyle.css'
import pic from '../../../img/pictureBigProdCat.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/smallProductLike.svg';
import iconSrcCard from '../../../svg/smallProductCard.svg';
import {Link} from 'react-router-dom'
import css from '../../catalogMan/catalog.module.css'
import addToCart from '../../../function/addToCard'
import { useState, useEffect } from 'react';
export default function ManuscriptProductComponent({el, index, setVisitedProducts, visitedProducts}) {
    const handleProductClick = (product) => {
        const productId = product;
        // перевіряємо, чи ідентифікатор продукту вже зберігається в масиві visitedProducts
        if (!visitedProducts.includes(productId)) {
          const newVisitedProducts = [...visitedProducts, productId];
          setVisitedProducts(newVisitedProducts);
          // зберігаємо список відвіданих продуктів в localStorage
          localStorage.setItem('visitedProducts', JSON.stringify(newVisitedProducts));
        }
      };
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
        <div className='productBigInCatWrap'>
            <div className='productBigPicture'>
                <div className='productBigPictureImgWrap'>
            <img src={el.bookFoto} className="productBigPictureImg"/>
            <div className='topBooksMonthLabel'>ТОП місяця</div>
            <div className='topBooksYersLabel'>Книга року</div>
            <div className='newBooksLabel'>Новинка</div>
            </div>
            </div>
            <div className='productBigDescription'>
                <div className='autorAndHud'>
                    <p className='autorAndHudP'>
                    Автор: <span className='autorAndHudPSpan'>{el.autorIdea}</span>
                    </p>
                    <p className='autorAndHudP'>
                    Художник: <span className='autorAndHudPSpan'>{el.picWriter}</span>
                    </p>
                </div>
                <h1 className='bookTitleBigProd' onClick={() => handleProductClick(el.uid)}><Link className='bookTitleBigProd' to={`/manuscript/${el.uid}`}> {el.bookName}</Link></h1>
                <div className='pawerWrapBlock'>
                <p className='power'>
                    Сила
                </p>
                <p className='powerDescripProdBig'>
                {el.bookPower}
                </p>
            <br/>
                <p className='powerDescripProdBig'>
                {el.smallDesc}
                </p>
                </div>
                <div className='ageLanguageWrapBlock'>
                <p className='ageLanguagePBigProd'>
                Вік: {el.yearGroup}
                </p>
                <p className='ageLanguagePBigProd'>
                Мова: {el.bookLanguage}
                </p>
                <p className='ageLanguagePBigProd'>
                Жанр: {el.ganr}
                </p>
                <p className='ageLanguagePBigProd'>
                Призначення: {el.forWho}
                </p>
                </div>

                
<button className={css.buttonToManuscript}>Читати</button>

            </div>

        </div>
    )
}