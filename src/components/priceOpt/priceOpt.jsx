import Footer from '../standartComponent/footer/footer'
import Header from '../standartComponent/header/header'
import css from './priceOpt.module.css'






export default function PriceOpt() {





    return(
        <div>
            <Header/>
<div className={css.titleWrap}>
    <h3 className={css.h3Title}>На цій сторінці зручно робити гуртові замовлення</h3>
    <div className={css.birdWrapFirst}>

    </div>
    <div className={css.birdWrapSecond}>
        
    </div>

</div>
            <Footer/>
        </div>
    )




    }