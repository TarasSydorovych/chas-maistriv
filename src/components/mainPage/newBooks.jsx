import './mainPage.css'
import pictureBook from '../../img/newBooks.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/arrowLeft.svg';
import arrow from '../../svg/arrow.svg';
import iconSrcWhite from '../../svg/smallProductLike.svg';
import iconSrcCardWhite from '../../svg/smallProductCard.svg';
import iconSrcn from '../../svg/likeSvgSale.svg';
import iconSrcCard from '../../svg/shapCartSale.svg';

export default function NewBooks() {



    return(
        <div className='newBooksWrapBlock'>
            <div className='yellowBorderWrap'>
                <div className='imgPictureBox'>
                <img src={pictureBook}/>
                <div className='markerNew'>
                    Новеньке
                </div>
                </div>
                <HandySvg 
                className="arrowLeft"
                    src={iconSrc}
                    width="42"
        height="40"
                    />
            </div>
            <div className='blueBorderWrap'>



            <div className="infoPredProdagNewBooks">
           
            <h1 className='nameBooksNewBooks'>Новинки</h1>
            <h2 className='nameBooksNew'>У вечір святковий</h2>
            <div className='autorInformNew'>
                <div className='autorInformSection'>
                    <p>Автор:&nbsp;</p><h4>Стів Річардсон, Клемент Кларк Мур</h4>
                </div>
                <div className='autorInformSection'>
                    <p>Вік:&nbsp;</p><h4>10+</h4>
                </div>
                <div className='autorInformSection'>
                    <p>Художник:&nbsp;</p><h4>Кріс Данн</h4>
                </div>
            </div>
            <p className='descriptionBooksNew'>Під час зимових свят у кожній оселі, де є діти, таємничим чином з’являються подарунки. Звідки ж вони беруться? Ця книжка може стати першим поясненням такої дивовижної події для маленьких чомучок, бо...Передусім це переказ знаменитого вірша Клемента Кларка Мура «Ніч проти Різдва». Саме в цьому творі Санта-Клаус уперше постав таким, яким його знає і любить увесь англомовний світ. Маленький вірш справив величезний вплив на святкові традиції — і це справжня дивовижа. Друга дивовижа — атмосферні малюнки Кріса Данна. Третя дивовижа банальна, але важлива для найменших — це те, що героями переказу стали звірі.</p>
<div className='blockOrderBooksWrap'>
<div className='prodPricLikeCartNovun'>

            <div className='prdeProdPricingCartSale'>
            <div className='prdeProdPricingRotateCart'>
            
            <p className='salePriceCartSale'>203</p>
            <p className='fullPriceCart'>грн</p>
            </div>
           </div>
           <div className='likeCardWrapSmall'>

<div className='likeProductSmallSaleNovu'>
<HandySvg 
                    src={iconSrcCardWhite}
                    width="28.33"
        height="28.33"
                    />
</div>
<div className='likeProductSmallSaleNovuGr'>
<HandySvg 
                    src={iconSrcWhite}
                    width="34"
        height="31"
                    />
</div>
</div>
            </div>


<HandySvg 
                    src={arrow}
                    className="arrovIconBanner"
                    width="52"
        height="49.56"
                    />
</div>


        </div>



            </div>
        </div>
    )
}