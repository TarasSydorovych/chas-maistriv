import './catalog.css'
import picBook from '../../img/catfirstBook.png'

import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/likeSvgSale.svg';
import iconSrcCard from '../../svg/shapCartSale.svg';


export default function FirstBlockCat(){




    return(
        <div className='firstBlockBooksHoNeedWrap'>
            <div className='firstBlockWhisPic'>
                <img src={picBook} className="picBookTitle"/>
            </div>
            <div className='secondBlockWhisPic'>
                <h2 className='firstBlockBooksHoNeedH1'>
                Книга яку треба прочитати до дня Святого Миколая
                </h2>
                <div className='descParametr'>
                    <p className='descForRecoPage'>
                    Мова: українська, російська
                    </p>
                    <p className='descForRecoPage'>
                    Жанр: короткі оповідання
                    </p>
                    <p className='descForRecoPage'>
                    Вік: 4 - 8 років
                    </p>
                </div>
                <p className='firstBlockCatPFullDesc'>
                Ця книга пренесе у ваш дім диво перед святом Миколая.Дітям дуже цікаво дізнатись хто такий Миколай і чому він всім дарить подарунки
                </p>
                <div className='wrapIconBlocCatFirst'>

                <div className='prdeProdPricingCart'>
            <div className='prdeProdPricingRotateCart'>
            <p className='fullPriceCart'>290</p>
            <p className='salePriceCart'>203</p>
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
            </div>
        </div>
    )
}