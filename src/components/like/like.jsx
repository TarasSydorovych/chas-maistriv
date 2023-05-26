import Footer from '../standartComponent/footer/footer'
import Header from '../standartComponent/header/header'
import css from './like.module.css'
import ProductToLike from './productToLike'






export default function Like() {





    return(
        <div>
            <Header/>
<div className={css.blueBlockHead}>
    <div className={css.blueBlockHeadSmall}>
        <p className={css.countJoin}>Вибране (1)</p>
    </div>
</div>
<div className={css.likeProductWrap}>
    <div className={css.likeProductWrapSmall}>
        <ProductToLike/>
        <ProductToLike/>
        <ProductToLike/>
    </div>
</div>
            <Footer/>
        </div>
    )
}