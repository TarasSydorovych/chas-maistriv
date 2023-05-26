import css from './hero.module.css'
import ProductPic  from '../../img/smaPicCart.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/smallProductLike.svg';
import iconSrcCard from '../../svg/smallProductCard.svg';




export default function ProductForHero() {





    return(
        <div className={css.smallProductWrap}>
        <img src={ProductPic} className={css.productPicSmall}/>
        <div className={css.prodPricLikeCart}>

        <div className={css.prdeProdPricingCart}>
        <div className={css.prdeProdPricingRotateCart}>
        
        <p className={css.salePriceCart}>203</p>
        <p className={css.fullPriceCart}>грн</p>
        </div>
       </div>
       <div className={css.likeCardWrapSmall}>
<div className={css.likeProductSmall}>
<HandySvg 
                src={iconSrc}
                width="34"
    height="31"
                />
</div>
<div className={css.likeProductSmall}>
<HandySvg 
                src={iconSrcCard}
                width="28.33"
    height="28.33"
                />
</div>
</div>
        </div>
<h2 className={css.smallProdName}>
Дивні пригоди (не) дивної
</h2>



<div className={css.autorInformCart}>
            <div className={css.autorInformSectionCart}>
                <p className={css.pLikeP}>Автор:&nbsp;</p><h4 className={css.h4LikeP}>Стів Річардсон, Клемент Кларк Мур</h4>
            </div>
            <div className={css.autorInformSectionCart}>
                <p className={css.pLikeP}>Художник:&nbsp;</p><h4 className={css.h4LikeP}>Кріс Данн</h4>
            </div>
        </div>
   

    </div>
    )
}