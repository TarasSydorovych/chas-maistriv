import './header.css'
import like from '../../../svg/searchLik.svg'
import {HandySvg} from 'handy-svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsAll, fetchProductsInSearch } from '../../../function/productsSlice';
import { useNavigate } from 'react-router-dom';



export default function SearchInput() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
  
    const [searchTerm, setSearchTerm] = useState('');
  

    // const handleSearch = () => {
    //     if (searchTerm.trim() === '') {
    //       dispatch(fetchProductsAll());
    //       navigate('/catalog')
    //     } else {
    //       const lowercaseSearchTerm = searchTerm.toLowerCase(); // Змінюємо на нижній регістр
    //       dispatch(fetchProductsInSearch([{ field: 'bookName', value: lowercaseSearchTerm }]));
    //       navigate('/catalog')
    //     }
    //   };
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
          dispatch(fetchProductsAll());
          navigate('/catalog');
        } else {
          dispatch(fetchProductsInSearch(searchTerm));
          navigate('/catalog');
        }
      };

return(
    <div className='searchInputWrap'>
<input className='searchInput'   onChange={(e) => setSearchTerm(e.target.value)} type="text"
        value={searchTerm}/>
<HandySvg 
                 src={like}
                 width="28"
     height="22"
     className='seachDo'
     onClick={handleSearch}
                 />
            
    </div>
)

}