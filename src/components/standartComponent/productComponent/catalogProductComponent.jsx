import './productStyle.css'
import pic from '../../../img/pictureBigProdCat.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/smallProductLike.svg';
import iconSrcCard from '../../../svg/smallProductCard.svg';
import {Link} from 'react-router-dom'
import addToCart from '../../../function/addToCard'

export default function CatalogProductComponent({el, index, setVisitedProducts, visitedProducts}) {
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
                <h1 className='bookTitleBigProd' onClick={() => handleProductClick(el.uid)}><Link className='bookTitleBigProd' to={`/product/${el.uid}`}> {el.bookName}</Link></h1>
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

                <div className='prodPricLikeCartBigProd'>

<div className='prdeProdPricingCartBigProd'>
<div className='prdeProdPricingRotateCart'>
<p className='salePriceCartBigProd'>{el.price}</p>
<p className='fullPriceCartBigProd'>грн</p>
</div>
</div>
<div className='likeCardWrapSmall'>
<div className='likeProductBig'>
<HandySvg 
        src={iconSrc}
        width="34"
height="31"
        />
</div>
<div className='likeProductBig' onClick={() => addToCart(el.uid)}>
<HandySvg 
        src={iconSrcCard}
        width="28.33"
height="28.33"
        />
</div>
</div>
</div>
            </div>

        </div>
    )
}