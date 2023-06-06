import css from './userCabinet.module.css'
import picprodff from '../../img/picprodff.png'
import addToCart from '../../function/addToCard'



export default function WaitProdLike({tovar}) {






    return(
        <div className={css.prodInWrap}>
<img src={tovar.bookFoto} className={css.picProd}/>
<h1 className={css.bookName}>{tovar.bookName}</h1>
<div className={css.deliveryInform} onClick={() => addToCart(tovar.uid)}>Додати в корзину</div>
        </div>
    )
}