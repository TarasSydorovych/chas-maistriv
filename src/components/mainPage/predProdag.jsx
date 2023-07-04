import pic from '../../img/predProd.png'
import arrow from '../../svg/arrow.svg';
import './mainPage.css'
import {HandySvg} from 'handy-svg';
import React, { useState, useEffect } from "react";

import { Link, useNavigate } from 'react-router-dom';
import addToCart from '../../function/addToCard'
import withFieldData from '../HOK/withFieldData';
const PredProdag = ({products, windowDimensions}) => {
  
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
   
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [targetDate, setTargetDate] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if(currentProduct){
        const intervalId = setInterval(() => {
            
          const timeDiff = targetDate - new Date();
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    
          setCountdown({ days, hours, minutes });
    
          if (timeDiff <= 0) {
            clearInterval(intervalId);
          }
        }, 1000);
   
        return () => clearInterval(intervalId);
    }
      }, [targetDate]);
     

   

    
      useEffect(() => {
        setCurrentProduct(products[currentProductIndex]);
    
        if (products.length > 0) {
          const predprodDate = new Date(products[currentProductIndex].predprodDate);
          setTargetDate(predprodDate);
        }
      }, [products, currentProductIndex]);

      const handleNextProduct = () => {
        setCurrentProductIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= products.length ? 0 : nextIndex;
        });
      };
      const orderPredProdag = () => {
        addToCart(currentProduct.uid);
        navigate('/order')
      }

    return(
<>
{windowDimensions && 
      <div className="predProdazWrap">
       {currentProduct && 
        <>
         <div className="imgPredProdag">
        <div className="imgRelDiv">
           <img src={currentProduct.imageList[0]} className="imgRelDivImg"/>
           <div className='prdeProdPricing'>
            <div className='prdeProdPricingRotate'>
            <p className='fullPriceKr'>{currentProduct.priceSale}грн</p>
            <h2 className='salePrice'>{currentProduct.price}</h2>
            <p className='fullPrice'>грн</p>
            </div>
           </div>
        </div>
        </div>



        <div className="infoPredProdag">
            <div className='timerWrap'>
                <div className='redBlock'>
                    <h1>Предпродаж</h1>
                </div>
                <div className='timerBlue'>
                    <h2>Заллишилось</h2>
                    <div className='timer'>
                        <div className='time'>
                        <h1>{countdown.days}</h1>
                        <h2>День</h2>
                        </div>
                        <div className='time'>
                        <h1>{countdown.hours}</h1>
                        <h2>Годин</h2>
                        </div>
                        <div className='time'>
                        <h1>{countdown.minutes}</h1>
                        <h2>Хвилини</h2>
                        </div>
                    </div>
                </div>
            </div>
           
            <h1 className='nameBooks'><Link className='nameBooks' to={`/product/${currentProduct.uid}`}>{currentProduct.bookName}</Link></h1>
            <div className='autorInform'>
                <div className='autorInformSection'>
                    <p>Автор:&nbsp;</p><h4>{currentProduct.textAutor}</h4>
                </div>
                <div className='autorInformSection'>
                    <p>Вік:&nbsp;</p><h4>{currentProduct.yearGroup}</h4>
                </div>
                <div className='autorInformSection'>
                    <p>Художник:&nbsp;</p><h4>{currentProduct.bDesign}</h4>
                </div>
            </div>
            <p className='descriptionBooks'>{currentProduct.descriptionSe}</p>
<div className='blockOrderBooksWrap'>
<button className='kOrderBooksPredButton' onClick={orderPredProdag}>
    Замовити
</button>


<HandySvg 
                    onClick={handleNextProduct}
                    src={arrow}
                    className="arrovIconBanner"
                    width="52"
        height="49.56"
                    />
</div>


        </div>
        </> }
      </div>
      }
      {!windowDimensions && 
      <div className="predProdazWrap">
       {currentProduct && 
        <>
             <div className='timerWrap'>
                <div className='redBlock'>
                    <h1>Предпродаж</h1>
                </div>
                <div className='timerBlue'>
                    <h2>Заллишилось</h2>
                    <div className='timer'>
                        <div className='time'>
                        <h1>{countdown.days}</h1>
                        <h2>День</h2>
                        </div>
                        <div className='time'>
                        <h1>{countdown.hours}</h1>
                        <h2>Годин</h2>
                        </div>
                        <div className='time'>
                        <h1>{countdown.minutes}</h1>
                        <h2>Хвилини</h2>
                        </div>
                    </div>
                </div>
            </div>
         <div className="imgPredProdag">
        <div className="imgRelDiv">
           <img src={currentProduct.bookFoto} className="imgRelDivImg"/>
           <div className='prdeProdPricing'>
            <div className='prdeProdPricingRotate'>
            <p className='fullPriceKr'>{currentProduct.priceSale}грн</p>
            <h2 className='salePrice'>{currentProduct.price}</h2>
            <p className='fullPrice'>грн</p>
            </div>
           </div>
        </div>
        </div>

        <div className='blockOrderBooksWrap'>
<button className='kOrderBooksPredButton' onClick={orderPredProdag}>
    Замовити
</button>


<HandySvg 
                    onClick={handleNextProduct}
                    src={arrow}
                    className="arrovIconBanner"
                    width="52"
        height="49.56"
                    />
</div>

        <div className="infoPredProdag">
       
           
            <h1 className='nameBooks'><Link className='nameBooks' to={`/product/${currentProduct.uid}`}>{currentProduct.bookName}</Link></h1>
            <div className='autorInform'>
                <div className='autorInformSection'>
                    <p>Автор:&nbsp;</p><h4>{currentProduct.textAutor}</h4>
                </div>
                
                <div className='autorInformSection'>
                    <p>Художник:&nbsp;</p><h4>{currentProduct.bDesign}</h4>
                </div>
                <div className='autorInformSection'>
                    <p>Вік:&nbsp;</p><h4>{currentProduct.yearGroup}</h4>
                </div>
            </div>
            <p className='descriptionBooks'>{currentProduct.descriptionSe}</p>



        </div>
        </> }
      </div>
      }
      </>
    )
}
export default withFieldData('predprodag', 'product', 'true')(PredProdag);
