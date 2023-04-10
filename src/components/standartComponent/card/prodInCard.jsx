
import css from './card.module.css'
import pic from '../../../img/prodInCardPic.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/deleteSrc.svg';
import arrowImp from '../../../img/arrowDownPick.png'

export default function ProdInCard() {


    return(
        <div className={css.prodInCardWrap}>
              <img src={pic}/>

<div className={css.prodInfoWrap}>
<h1 className={css.booksNameCard}>У вечір святковий</h1>
<div className={css.chousLangSelect}>
<select className={css.customSelectInCard}>
                            <option className='customOpin'  value="0">Українською</option>
                            <option className='customOpin'  value="1">дітям до 4 року</option>
                            </select>
                            <img src={arrowImp} className={css.arrowDown}/>
                            </div>

                            <div className={css.chousLangSelect}>
<select className={css.customSelectInCard}>
                            <option className='customOpin'  value="0">Паперова</option>
                            <option className='customOpin'  value="1">дітям до 4 року</option>
                            </select>
                            <img src={arrowImp} className={css.arrowDown}/>
                            </div>



                            <div className={css.counterWrap}>
                                <div className={css.countPlusMinusValue}>
<div className={css.minus}>-</div>
<div className={css.countValue}>2</div>
<div className={css.plus}>+</div>
</div>
<h4 className={css.price}>190<span className={css.priceSpan}>грн</span></h4>
                            </div>
<div className={css.delete}>
<HandySvg 
                    src={iconSrc}
                    width="25"
        height="29"
                    />

</div>
</div>

            
        </div>
    )
}