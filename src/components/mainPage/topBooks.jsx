

import SmallProductCartSale from '../standartComponent/productComponent/smallProductCartSale'
import SmallProductCartTop from '../standartComponent/productComponent/SmallProductCartTop'
import './mainPage.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import {auth, db} from '../../firebase'
import { useSelector, useDispatch } from 'react-redux';
import {fetchProductsAll, fetchProducts} from '../../function/productsSlice'
import withFieldData from '../HOK/withFieldData';




const TopBooks = ({products}) => {

  

    const [selectedFilters, setSelectedFilters] = useState([]);
    const dispatch = useDispatch();
    


    return(
       <div className='saleBlockWrap'>
            {products && 
        <div className='saleBlockWrapSmall'>
            <div className='saleBlockText'>
                <h1 className='saleActionsTop'>ТОП Книги</h1>
                <Link className='saleActionsLinkTop' onClick={() => dispatch(fetchProductsAll())} to="/catalog">Усі книги</Link>
            </div>
            <div className='smalProductList'>
            {products.map((el, index) => {
         return <SmallProductCartTop el={el} key={index}/>
                })}



            </div>

        </div>
      }
       </div>
    )
}

export default withFieldData('top', 'product', 'true')(TopBooks);
