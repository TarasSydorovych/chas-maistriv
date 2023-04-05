import './productStyle.css'
import pic from '../../../img/pictureBigProdCat.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/smallProductLike.svg';
import iconSrcCard from '../../../svg/smallProductCard.svg';



export default function CatalogProductComponent() {




    return(
        <div className='productBigInCatWrap'>
            <div className='productBigPicture'>
                <div className='productBigPictureImgWrap'>
            <img src={pic} className="productBigPictureImg"/>
            <div className='topBooksMonthLabel'>ТОП місяця</div>
            <div className='topBooksYersLabel'>Книга року</div>
            <div className='newBooksLabel'>Новинка</div>
            </div>
            </div>
            <div className='productBigDescription'>
                <div className='autorAndHud'>
                    <p className='autorAndHudP'>
                    Автор: <span className='autorAndHudPSpan'>Кириченко В.</span>
                    </p>
                    <p className='autorAndHudP'>
                    Художник: <span className='autorAndHudPSpan'>Кириченко В.</span>
                    </p>
                </div>
                <h1 className='bookTitleBigProd'>Дивні пригоди дивної вчительки 2</h1>
                <div className='pawerWrapBlock'>
                <p className='power'>
                    Сила
                </p>
                <p className='powerDescripProdBig'>
                Ця книга пренесе у ваш дім диво перед святом Миколая.
                </p>
            <br/>
                <p className='powerDescripProdBig'>
                Дітям дуже цікаво дізнатись хто такий Миколай і чому він всім дарить подарунки. Дітям дуже цікаво дізнатись хто такий Миколай і чому він всім дарить подарунки.
                </p>
                </div>
                <div className='ageLanguageWrapBlock'>
                <p className='ageLanguagePBigProd'>
                Вік: 4 - 8 років
                </p>
                <p className='ageLanguagePBigProd'>
                Мова: українська, російська 
                </p>
                <p className='ageLanguagePBigProd'>
                Жанр: короткі оповідання
                </p>
                <p className='ageLanguagePBigProd'>
                Призначення: святкова/створює традиції/створює образи/ для еволюції душі
                </p>
                </div>

                <div className='prodPricLikeCartBigProd'>

<div className='prdeProdPricingCartBigProd'>
<div className='prdeProdPricingRotateCart'>
<p className='salePriceCartBigProd'>203</p>
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
<div className='likeProductBig'>
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