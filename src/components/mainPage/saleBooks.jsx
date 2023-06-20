
import SmallProductCart from '../standartComponent/productComponent/smallProductCart'
import './mainPage.css'

import { getDocs, collection, query, where } from 'firebase/firestore';
import {auth, db} from '../../firebase'
import { useSelector, useDispatch } from 'react-redux';
import {fetchProductsAll, fetchProducts} from '../../function/productsSlice'
import { Link } from 'react-router-dom';
import withFieldData from '../HOK/withFieldData';

const SaleBooks = ({products}) => {
    const dispatch = useDispatch();
   


    return(
       <div className='saleBlockWrap'>
      
        <div className='saleBlockWrapSmall'>
            <div className='saleBlockText'>
                <h1 className='saleActions'>Акції</h1>
                <Link className='saleActionsLink' onClick={() => dispatch(fetchProductsAll())} to="/catalog">Усі книги</Link>
            </div>
            <div className='smalProductList'>
                {products.map((el, index) => {
                 return   <SmallProductCart key={index} el={el}/>
                })}



            </div>

        </div>

       </div>
    )
}
export default withFieldData('sale', 'product', 'true')(SaleBooks);
