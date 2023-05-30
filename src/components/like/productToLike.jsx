import css from './like.module.css'
import {HandySvg} from 'handy-svg';
import pic from '../../img/picprodff.png'
import iconSrc from '../../svg/smallProductLike.svg';
import iconSrcCard from '../../svg/smallProductCard.svg';
import audio from '../../svg/audioSvg.svg'
import addToCart from '../../function/addToCard'




export default function ProductToLike({el, handleRemove}) {






    return(
        <div className={css.productWrap}>
         <img src={el.bookFoto} className={css.likePicWrap}/>
         <div className={css.dexcriptionProdactWrap}>
            <h1 className={css.h1DescName}>{el.bookName}</h1>
            <p className={css.autorDesc}>Автор:&nbsp;<span className={css.autorDescSpan}>{el.textAutor}</span></p>
            <p className={css.autorDesc}>Художник:&nbsp;<span className={css.autorDescSpan}>{el.bDesign}</span></p>
            <p className={css.powerBook}>Сила</p>
            <p className={css.powerBookDesc}>{el.bookPower}</p>
            <p className={css.smallDescription}>Вік: {el.yearGroup}</p>
            <p className={css.smallDescription}>Жанр: {el.ganr}</p>
            <p className={css.smallDescription}>Призначення: {el.forWho}</p>
         </div>


         <div className={css.iconWithPrice}>

<div className={css.rombWrap}>
<div className={css.rombWrapRotate}>
<p className={css.salePriceCartBigProd}>{el.price}</p>
<p className={css.fullPriceCartBigProd}>грн</p>
</div>
</div>
<div className={css.wrapIconAu}>
<div className={css.likeProductBig} onClick={() => handleRemove(el.uid)}>
<HandySvg 
        src={iconSrc}
        width="34"
height="31"
        />
</div>
<div className={css.likeProductBig} onClick={() => addToCart(el.uid)}>
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