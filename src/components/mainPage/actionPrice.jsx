
import SmallProductCart from '../standartComponent/productComponent/smallProductCart'
import SmallProductCartSale from '../standartComponent/productComponent/smallProductCartSale'
import './mainPage.css'
import {fetchProductsAll, fetchProducts} from '../../function/productsSlice'
import { Link } from 'react-router-dom';
import withFieldData from '../HOK/withFieldData';
import { useDispatch } from 'react-redux';


const  ActionPrice = ({products}) => {
  
   const dispatch = useDispatch();

    return(
       <div className='saleBlockWrap'>
       {products.length > 0 &&
        <div className='saleBlockWrapSmall'>
       
            <div className='saleBlockText'>
                <h1 className='saleActionsPrice'>Розпродаж</h1>
                <Link className='saleActionsLinkPrice' onClick={() => dispatch(fetchProductsAll())} to="/catalog">Усі книги</Link>
            </div>
            <div className='smalProductList'>
                {products.map((el, index) => {
                    return <SmallProductCartSale el={el} key={index}/>
                })}



            </div>

        </div>
    }
       </div>
    )
}
export default withFieldData('rozprodaz', 'product', 'true')(ActionPrice);
