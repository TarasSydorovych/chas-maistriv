import css from './userCabinet.module.css'
import picprodff from '../../img/picprodff.png'




export default function WaitProd({tovar, el}) {






    return(
        <div className={css.prodInWrap}>
<img src={tovar.bookFoto} className={css.picProd}/>
<h1 className={css.bookName}>{tovar.bookName}</h1>
<div className={css.deliveryInform}>{el.status}</div>
        </div>
    )
}