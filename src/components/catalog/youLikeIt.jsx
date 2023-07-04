import SmallProductCartSaleWhithout from "../standartComponent/productComponent/smallProductCartSaleWhithout";
import '../standartComponent/productComponent/productStyle.css'
import css from './catalog.module.css'


export default function YouLikeIt() {




    return(
       <div className={css.youLikeItWrap}>
        <div className={css.youLikewrapSmall}>
        <h2 className={css.youLikeItH2}>
        Вам сподобається
        </h2>
        <div className={css.youLikeProductWrap}>
            <SmallProductCartSaleWhithout/>
            <SmallProductCartSaleWhithout/>
            <SmallProductCartSaleWhithout/>
            
        </div>
        </div>
       </div>
    )
}