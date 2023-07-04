
import css from './catalog.module.css'


export default function DiscountAndAction() {




    return(
        <div className={css.discountAndACWrapp}>
<div className={css.discountAndACWrappFirst}>
<div className={css.freeDelyvery}>
Безкоштовна доставка від 1000 грн
</div>
<div className={css.procentSale}>
10% знижки від 700 грн
</div>
</div>
<div className={css.discountAndACWrappSecond}>
<div className={css.discountForNine}>15% знижки від 990 грн</div>
<div className={css.krohmalPackeg}>Фірмовий крохмаль пакет у подарунок</div>
<div className={css.smakolukForUser}>Смаколики для спільноти</div>


    
</div>
        </div>
    )
}