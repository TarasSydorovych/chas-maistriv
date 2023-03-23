
import SmallProductCart from '../standartComponent/productComponent/smallProductCart'
import SmallProductCartSale from '../standartComponent/productComponent/smallProductCartSale'
import './mainPage.css'





export default function ActionPrice() {




    return(
       <div className='saleBlockWrap'>
        <div className='saleBlockWrapSmall'>
            <div className='saleBlockText'>
                <h1 className='saleActionsPrice'>Розпродаж</h1>
                <a className='saleActionsLinkPrice' href='/'>Усі книги</a>
            </div>
            <div className='smalProductList'>
<SmallProductCartSale/>
<SmallProductCartSale/>
<SmallProductCartSale/>

            </div>

        </div>
       </div>
    )
}