import picSmallProd from '../../img/smallProduct.png';
import './mainPage.css';
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/smallBlue.svg';
import iconSrc2 from '../../svg/icanicon.svg';
import authPic from '../../img/fotoAutor.png'
import { useState, useEffect} from 'react';
import {auth, db} from '../../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore';
import withFieldData from '../HOK/withFieldData';
import withFirebaseCollection from '../HOK/withFirebaseCollection';
import withFirebaseCollectionReserv from '../HOK/withFirebaseCollectionReserv';
import { Link } from 'react-router-dom';
import { addFilter, removeFilter, clearFilters  } from '../../function/filtersSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const BlockAutor = ({data, product, windowDimensions}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  const handleSelectChange = () => {
    console.log('Ми в функції');
    dispatch(clearFilters());    
      const filter = {
        field: 'textAutor',
        value: data[0].name,
      };
     
      handleFilterClick(filter);
      handleFilterClickst(filter);
      navigate("/catalog")
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

  const [prodList, setProdList] = useState([]);
  useEffect(() => {
    const filteredProducts = product.filter((item) => item.textAutor === data[0].name);
    setProdList(filteredProducts);
  }, [data, product]);

    return(
        <div className='blockAutorBig'>
            {data.length > 0 &&
            <>
            <div className='imgAutorWrap'>
           
           <img src={authPic} className="imgAutor"/>
           
           </div>
           <button className="allProdactAutor" onClick={handleSelectChange}>
        Усі книги автора
        </button>
        <div className='blockAutorWrap'>
            
            
            <div className='infoAutor'>
                <h1 className='autorName'>
                {data[0].name}
                </h1>
                <p className='autorDescription'>
                {data[0].smallDesc}
                </p>
                <div className='autorYelowBlock'>
                    <p className='autorPYellow'>
                    {data[0].history}
                    </p>
                    <div className='hvist'></div>
                </div>
                <h2 className='AllBooksAutorH2'>Книги автора</h2>
                <div className='abrakadabra'>



                


      
        {prodList.length > 0 && 
        <>
        {windowDimensions && <>
        {prodList.map((el, index) => {
          if(index < 3){
          return   <div className="productAutorWrapSM">
          <img src={el.imageList[0]} className="picSmallProdAutor"/>
          <h3 className='smalProdName'><Link className='smalProdName' to={`/product/${el.uid}`}>
          {el.bookName}</Link>
          </h3>
          <div className='smallProdIcon'>
              <div className='iconCartSMBlue'>
              <HandySvg 
                      src={iconSrc}
                      width="34"
          height="34"
                      />
              </div>
              <div className='iconCartSMGreen'>
              <HandySvg 
                      src={iconSrc2}
                      width="37"
          height="34"
                      />
  </div>
          </div>
          </div>
          }
        })}
</>}
            </>
        }




                </div>
            </div>
        </div>
        </>
        }

          {prodList.length > 0 && 
        <div className='prodMpbileWrapToAutor'>
        {!windowDimensions && <>
        {prodList.map((el, index) => {
          if(index < 3){
          return   <div className="productAutorWrapSM">
          <img src={el.bookFoto} className="picSmallProdAutor"/>
          <h3 className='smalProdName'><Link className='smalProdName' to={`/product/${el.uid}`}>
          {el.bookName}</Link>
          </h3>
          <div className='smallProdIcon'>
              <div className='iconCartSMBlue'>
              <HandySvg 
                      src={iconSrc}
                      width="34"
          height="34"
                      />
              </div>
              <div className='iconCartSMGreen'>
              <HandySvg 
                      src={iconSrc2}
                      width="37"
          height="34"
                      />
  </div>
          </div>
          </div>
          }
        })}
</>}
            </div>
        }
        </div>
    )
    
}


export default withFirebaseCollection('author')(
  withFirebaseCollectionReserv('product')(BlockAutor)
);

