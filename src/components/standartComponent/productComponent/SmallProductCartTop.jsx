import './productStyle.css'
import ProductPic  from '../../../img/smaPicCart.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/likeSvgSale.svg';
import iconSrcCard from '../../../svg/shapCartSale.svg';

export default function SmallProductCartTop() {




    return(
        <div className='smallProductWrap'>
            <img src={ProductPic} className="productPicSmall"/>
            <div className='prodPricLikeCart'>

            <div className='prdeProdPricingCartTop'>
            <div className='prdeProdPricingRotateCart'>
            
            <p className='salePriceCartSale'>203</p>
            <p className='fullPriceCart'>грн</p>
            </div>
           </div>
           <div className='likeCardWrapSmall'>
<div className='likeProductSmallSale'>
<HandySvg 
                    src={iconSrc}
                    width="34"
        height="31"
                    />
</div>
<div className='likeProductSmallSale'>
<HandySvg 
                    src={iconSrcCard}
                    width="28.33"
        height="28.33"
                    />
</div>
</div>
            </div>
    <h2 className='smallProdNameSale'>
    Дивні пригоди (не) дивної
    </h2>



    <div className='autorInformCart'>
                <div className='autorInformSectionCart'>
                    <p>Автор:&nbsp;</p><h4>Стів Річардсон, Клемент Кларк Мур</h4>
                </div>
                <div className='autorInformSectionCart'>
                    <p>Художник:&nbsp;</p><h4>Кріс Данн</h4>
                </div>
            </div>
            <p className='descriptionBooksCart'>Збірка кумедних історій про (не)дивну вчительку викликає усмішку і навіть в гомеопатичних дозах руйнує стереотипи. Тамарочку Павлівну вже люблять 200 учнів, 30 колег, 22 родичі, чоловік-офіцер і кішка Мурка. Її — харизматичну і незвичайну — полюбите і ви.
</p>

        </div>
    )
}