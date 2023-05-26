import css from './userCabinet.module.css'
import picprodff from '../../img/picprodff.png'




export default function WaitProd() {






    return(
        <div className={css.prodInWrap}>
<img src={picprodff} className={css.picProd}/>
<h1 className={css.bookName}>Дивні пригоди (не) дивної</h1>
<div className={css.deliveryInform}>Вже в дорозі</div>
        </div>
    )
}