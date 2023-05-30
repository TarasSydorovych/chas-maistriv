import css from './priceOpt.module.css'
import soonPicProd from '../../img/soonPicProd.png'





export default function ProductInOpt() {




    return(
        <div className={css.blockSoonSecond}>
        <img src={soonPicProd} className={css.soonPicProdSt}/>
        <div className={css.soonPicProdStDesc}>
            <p className={css.soonAuthor}>Е.Портер</p>
            <h1 className={css.soonAuthorName}>"Поліанна"</h1>
            <div className={css.rombWrapSecond}>
<div className={css.rombWrapPod}>

<p className={css.pricePodRomb}>230</p>
<p className={css.pricePodRombText}>грн</p>

</div>
</div>
<div className={css.counterWrapSecond}>
<div className={css.boxCount}>-</div>
<p className={css.theCount}>
0
</p>
<div className={css.boxCount}>+</div>
</div>
        </div>
        </div>
    )
}