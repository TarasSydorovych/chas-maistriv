
import css from './card.module.css'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/xCardIcon.svg';
import ProdInCard from './prodInCard';

export default function Card() {

    console.log(window.innerHeight);

    return(
        <div className={css.cardWrap}>
            <div className={css.popUpWrap}>
             <div className={css.nameCountWrap}>
             <h2 className={css.countH2}>Ваш кошик (3)</h2>
             <HandySvg 
                    src={iconSrc}
                    width="28"
                    className={css.countSvg}
        height="28"
                    />
             </div>

             <div className={css.productInCardWrap}>

                <ProdInCard/>
                <ProdInCard/>
                <ProdInCard/>
               
             </div>


             <div className={css.fullPriceBlockWrap}>
<h3 className={css.finalPrice}>Всього: 650 грн</h3>
<div className={css.buttonPriceWrap}>
    <div className={css.nextJoin}>Продовжити вибір</div>
    <div className={css.finalOrder}>Оформити замовлення</div>
</div>





             </div>



            </div>



        </div>

    )
}