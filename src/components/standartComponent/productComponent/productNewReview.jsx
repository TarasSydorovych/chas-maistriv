import  './productStyle.css'
import ProductPic  from '../../../img/smaPicCart.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/howSay.svg';
import iconSrcCard from '../../../svg/cardHowSay.svg';



export default function ProductNewReview() {



    return(
        <div className='smallProductWrap'>
        <img src={ProductPic} className="productPicSmall"/>
        <div className='prodPricLikeCart'>

        <div className='prdeProdPricingCatalogSale'>
        <div className='prdeProdPricingRotateCart'>
        
        <p className='salePriceCartSale'>203</p>
        <p className='fullPriceCart'>грн</p>
        </div>
       </div>
       <div className='likeCardWrapSmall'>
<div className='likeProductSmallCatalog'>
<HandySvg 
                src={iconSrc}
                width="34"
    height="31"
                />
</div>
<div className='likeProductSmallCatalog'>
<HandySvg 
                src={iconSrcCard}
                width="28.33"
    height="28.33"
                />
</div>
</div>
        </div>
<h2 className='smallProdNameSaleYouLike'>
Дивні пригоди (не) дивної
</h2>



<div className='autorInformCart'>
            <div className='autorInformSectionCart'>
                <p className='porodForCatP'> Автор:&nbsp;<span className='porodForCatPSpan'>Стів Річардсон, Клемент Кларк Мур</span></p>
            </div>
            <div className='autorInformSectionCart'>
                <p className='porodForCatP'>Художник:&nbsp;<span className='porodForCatPSpan'>Кріс Данн</span></p>
            </div>
        </div>
     

    </div>
    )
}