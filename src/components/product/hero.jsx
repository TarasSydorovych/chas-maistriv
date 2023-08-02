import css from './product.module.css'
import hero from '../../img/hero.png'


export default function Hero({oneProd}) {




    return(
       <div className={css.heroWrapp}>
<div className={css.heroPicRo}>
<div className={css.heroPicRoteta}>
<img src={hero} />

</div>
</div>

<div className={css.wrapHeroText}>
    <h1 className={css.wrapHeroTextH1}>
    {oneProd.heroLabelText}
    </h1>
    <p className={css.wrapHeroTextP}>
    {oneProd.heroParagrafText}
    </p>

</div>

       </div>

    )
}