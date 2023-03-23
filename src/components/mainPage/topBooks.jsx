

import SmallProductCartSale from '../standartComponent/productComponent/smallProductCartSale'
import SmallProductCartTop from '../standartComponent/productComponent/SmallProductCartTop'
import './mainPage.css'





export default function TopBooks() {




    return(
       <div className='saleBlockWrap'>
        <div className='saleBlockWrapSmall'>
            <div className='saleBlockText'>
                <h1 className='saleActionsTop'>ТОП Книги</h1>
                <a className='saleActionsLinkTop' href='/'>Усі книги</a>
            </div>
            <div className='smalProductList'>
<SmallProductCartTop/>
<SmallProductCartTop/>
<SmallProductCartTop/>
<SmallProductCartTop/>
<SmallProductCartTop/>
<SmallProductCartTop/>

            </div>

        </div>
       </div>
    )
}