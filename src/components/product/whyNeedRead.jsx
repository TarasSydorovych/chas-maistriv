import css from './product.module.css'



export default function WhyNeedRead({oneProd}) {


    return(
<div className={css.whyNeedWrapp}>

<div className={css.whyNeedWrappSmall}>
<h2 className={css.whyNeedH2}>Чому варто читати цю книгу? </h2>
<div className={css.whyNeedBlock}>
    <div className={css.blockWhy}>
    {oneProd.whyNeedReadO}
    </div>
    <div className={css.blockWhy}>
    {oneProd.whyNeedReadT}
    </div>
    <div className={css.blockWhy}>
    {oneProd.whyNeedReadTH}
    </div>
</div>
<div className={css.wrapRecent}>
<div className={css.startText}>
    <div className={css.startTextFirst}>
    Прочитати приклад тексту
    </div>
    <div className={css.startTextSecond}>
    Рецензія психолога
    </div>
    <div className={css.startTextThree}>
    Рецензія мовознавзя
    </div>
</div>
<div className={css.startText}>
    <div className={css.startTextSecondFirst}>
    Рецензія критика
    </div>
    <div className={css.startTextSecondSecond}>
    Рецензія історика
    </div>
</div>


</div>
</div>


</div>

)
}