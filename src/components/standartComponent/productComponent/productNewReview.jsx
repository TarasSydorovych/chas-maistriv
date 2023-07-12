import  './productStyle.css'
import ProductPic  from '../../../img/smaPicCart.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/howSay.svg';
import iconSrcCard from '../../../svg/cardHowSay.svg';
import {Link, NavLink } from 'react-router-dom'


export default function ProductNewReview({el, setAddressChanged}) {



    return(
        <div className='smallProductWrap'>
        <img src={el.imageList[0]} className="productPicSmall"/>
        <div className='prodPricLikeCart'>

        <div className='prdeProdPricingCatalogSale'>
        <div className='prdeProdPricingRotateCart'>
        
        <p className='salePriceCartSale'>{el.price}</p>
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
    <NavLink   className='smallProdNameSaleYouLike' to={`/product/${el.uid}`} onClick={() => setAddressChanged(true)}>
{el.bookName}
</NavLink>
</h2>



<div className='autorInformCart'>
            <div className='autorInformSectionCart'>
                <p className='porodForCatP'> Автор:&nbsp;<span className='porodForCatPSpan'>{el.autorIdea}</span></p>
            </div>
            <div className='autorInformSectionCart'>
                <p className='porodForCatP'>Художник:&nbsp;<span className='porodForCatPSpan'>{el.bDesign}</span></p>
            </div>
        </div>
     

    </div>
    )
}