
import SmallProductCart from '../standartComponent/productComponent/smallProductCart'
import './mainPage.css'





export default function SaleBooks() {




    return(
       <div className='saleBlockWrap'>
        <div className='saleBlockWrapSmall'>
            <div className='saleBlockText'>
                <h1 className='saleActions'>Акції</h1>
                <a className='saleActionsLink' href='/'>Усі книги</a>
            </div>
            <div className='smalProductList'>
<SmallProductCart/>
<SmallProductCart/>
<SmallProductCart/>

            </div>

        </div>
       </div>
    )
}