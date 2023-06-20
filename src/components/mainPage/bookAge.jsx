import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/ptah.svg';
import arrowDown from '../../svg/arrowDown.svg';
import arrowImp from '../../img/arrowDownPick.png'
import './mainPage.css'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchProductsAll, fetchProducts} from '../../function/productsSlice'
import { addFilter, removeFilter } from '../../function/filtersSlice';
import { useNavigate } from 'react-router-dom';




export default function BookAge() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const [selectedFilters, setSelectedFilters] = useState([]);
const obj = [{
    name: 'Вікова група',
    list: [
        'Книги для дітей до 1',
        'Книги для дітей 2 років',
        'Книги для дітей 3 років',
        'Книги для дітей 4 років',
        'Книги для дітей 5 років',
        'Книги для дітей 6 років',
        'Книги для дітей 7 років',
        'Книги для дітей 8 років',
        'Книги для дітей 9 років',
        'Книги для дітей 10 років',
        'Книги для дітей 11 років',
        'Книги для дітей 12 років',
        'Книги для дітей 13 років',
        'для підлітків',
        'Для батьків',
    ],
    transliter: "yearGroup",
}];
const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const filter = {
      field: obj[0].transliter,
      value: obj[0].list[selectedValue],
    };
  
    handleFilterClick(filter);
    handleFilterClickst(filter);
  };
  const handleFilterClickst = (filter) => {
    setSelectedFilters(prevFilters => {
      const index = prevFilters.findIndex(
        (selectedFilter) =>
          selectedFilter.field === filter.field && selectedFilter.value === filter.value
      );
  
      if (index === -1) {
        return [...prevFilters, filter];
      } else {
        return [
          ...prevFilters.slice(0, index),
          ...prevFilters.slice(index + 1),
        ];
      }
    });
  };
const handleFilterClick = (filter) => {
    if (filters.some((selectedFilter) =>
      selectedFilter.field === filter.field && selectedFilter.value === filter.value
    )) {
      dispatch(removeFilter(filter));
    } else {
      dispatch(addFilter(filter));
    }
  };
  useEffect(() => {
    dispatch(fetchProducts(selectedFilters));
    
  }, [selectedFilters]);
  const toCatalog = () => {

    navigate("/catalog")
  }

    return(
       <div className="bookAgeWrap">
        <div className="bookAgeWrapSmall">
        <HandySvg 
                    src={iconSrc}
                    width="263.82"
        height="310.38"
                    />

                    <div className='chousBooks'>
                        <h1 className='chousBooksH1'>
                        Обирай книгу за віком
                        </h1>
                        <div className='blockButtonSelectWrap'>
                        <div className='chousBooksSelect'>
                        <select className='customSelect' onChange={handleSelectChange}>
    {obj[0].list.map((item, index) => (
      <option className='customOpin' value={index} key={index}>
        {item}
      </option>
    ))}
  </select>
                            <img src={arrowImp}
        className="customArrowSelect"
                    />
                        </div>
<button className='buttonSelect' onClick={toCatalog}>Переглянути</button>

                        </div>
                    </div>
        </div>
       </div>
    )
}