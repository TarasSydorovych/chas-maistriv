import css from './like.module.css'
import {HandySvg} from 'handy-svg';
import pic from '../../img/picprodff.png'
import iconSrc from '../../svg/smallProductLike.svg';
import iconSrcCard from '../../svg/smallProductCard.svg';
import audio from '../../svg/audioSvg.svg'





export default function ProductToLike() {






    return(
        <div className={css.productWrap}>
         <img src={pic} className={css.likePicWrap}/>
         <div className={css.dexcriptionProdactWrap}>
            <h1 className={css.h1DescName}>У вечір святковий</h1>
            <p className={css.autorDesc}>Автор:&nbsp;<span className={css.autorDescSpan}>Юрій Лігуна</span></p>
            <p className={css.autorDesc}>Художник:&nbsp;<span className={css.autorDescSpan}>Олександра Продана</span></p>
            <p className={css.powerBook}>Сила</p>
            <p className={css.powerBookDesc}>Ця книга пренесе у ваш дім диво перед святом Миколая.</p>
            <p className={css.smallDescription}>Вік: 10+ років</p>
            <p className={css.smallDescription}>Жанр: короткі оповідання </p>
            <p className={css.smallDescription}>Призначення: святкова/створює традиції/створює образи/ для еволюції душі</p>
         </div>


         <div className={css.iconWithPrice}>

<div className={css.rombWrap}>
<div className={css.rombWrapRotate}>
<p className={css.salePriceCartBigProd}>290</p>
<p className={css.fullPriceCartBigProd}>грн</p>
</div>
</div>
<div className={css.wrapIconAu}>
<div className={css.likeProductBig}>
<HandySvg 
        src={iconSrc}
        width="34"
height="31"
        />
</div>
<div className={css.likeProductBig}>
<HandySvg 
        src={iconSrcCard}
        width="28.33"
height="28.33"
        />
</div>


</div>
</div>





        </div>
    )
}