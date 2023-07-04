import css from './catalog.module.css'
import picBook from '../../img/catfirstBook.png'

import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/likeSvgSale.svg';
import iconSrcCard from '../../svg/shapCartSale.svg';


export default function FirstBlockCat(){




    return(
        <div className={css.firstBlockBooksHoNeedWrap}>
            <div className={css.firstBlockWhisPic}>
                <img src={picBook} className={css.picBookTitle}/>
            </div>
            <div className={css.secondBlockWhisPic}>
                <h2 className={css.firstBlockBooksHoNeedH1}>
                Книга яку треба прочитати до дня Святого Миколая
                </h2>
                <div className={css.descParametr}>
                    <p className={css.descForRecoPage}>
                    Мова: українська, російська
                    </p>
                    <p className={css.descForRecoPage}>
                    Жанр: короткі оповідання
                    </p>
                    <p className={css.descForRecoPage}>
                    Вік: 4 - 8 років
                    </p>
                </div>
                <p className={css.firstBlockCatPFullDesc}>
                Ця книга пренесе у ваш дім диво перед святом Миколая.Дітям дуже цікаво дізнатись хто такий Миколай і чому він всім дарить подарунки
                </p>
                <div className={css.wrapIconBlocCatFirst}>

                <div className={css.prdeProdPricingCart}>
            <div className={css.prdeProdPricingRotateCart}>
            <p className={css.fullPriceCart}>290</p>
            <p className={css.salePriceCart}>203</p>
            <p className={css.fullPriceCart}>грн</p>
            </div>
           </div>
<div className={css.likeCardWrapSmall}>
<div className={css.likeProductSmallSale}>
<HandySvg 
        src={iconSrc}
        width="34"
height="31"
        />
</div>
<div className={css.likeProductSmallSale}>
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