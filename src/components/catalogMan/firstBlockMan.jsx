import css from './catalog.module.css'
import img1 from '../../img/manuscript.png'
import img2 from '../../img/saleNewOne.png'
import img3 from '../../img/pic2.png'

export default function FirstBlockMan() {





    return(
        <div className={css.wrapManus}>
         <div className={css.wrapFirstManus}>
            <div className={css.someTextWramMan}>
                <h3 className={css.manuscriptH3}>Рукописи</h3>
                <p className={css.manuscriptP}>читай першим! </p>
            </div>
            <img src={img1} className={css.firstImg}/>
            <img src={img2} className={css.secondImg}/>
            <img src={img3} className={css.threImg}/>
         </div>
        </div>
    )
}