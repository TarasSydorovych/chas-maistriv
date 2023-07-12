import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import CatalogProductComponent from "../standartComponent/productComponent/catalogProductComponent";
import Filter from "./filter";
import FirstBlockCat from "./firstBlockCat";
import YouLikeIt from "./youLikeIt";
import '../standartComponent/productComponent/productStyle.css'
import DiscountAndAction from "./discountAndAction";
import ViewProductCatalog from "./viewProductCatalog";
import Card from "../standartComponent/card/card";
import ListButtonCount from "./listButtonCount";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import FirstBlockMan from "./firstBlockMan";
import ManuscriptProductComponent from "../standartComponent/productComponent/manuscriptProductComponent";
import css from './catalog.module.css'



export default function CatalogMan({setVisitedProducts, visitedProducts, productsAll}) {
   
    const products = useSelector((state) => state.manuscript.items);
    const filters = useSelector(state => state.manuscriptFilter);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
   
    
    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    
    const numberOfPages = Math.ceil(products.length / productsPerPage);
    const maxDisplayedPages = 5; // Максимальна кількість відображуваних сторінок
    const firstDisplayedPages = Math.max(currentPage - Math.floor(maxDisplayedPages / 2), 1);
    const lastDisplayedPages = Math.min(firstDisplayedPages + maxDisplayedPages - 1, numberOfPages);
    
    const pageNumbers = [];
    for (let i = firstDisplayedPages; i <= lastDisplayedPages; i++) {
      pageNumbers.push(i);
    }
    return(
        <>
        
        {/* 
        <Filter filters={filters}/>
        */}
        <FirstBlockMan/>
        <div className={css.manTextWrapUp}>
          <div className={css.manTextWrapUpSmall}>
            <p className={css.manTextWrapUpP}>
            Читати важливо. <br/>Від того, що ти читаєш, залежить твоє життя. Перед Вами рукописи, подані авторами на розгляд до видавництва. Допоможіть обрати найкращий серед них. Для цього почніть їх читати. Якщо Вам сподобається, Ви можете замовити доступ до повного тексту, після прочитання якого можна залишити відгук і побажання автору.<br/><br/> Любі читачі, зараз Вас не так багато серед спільноти. Ваша цінність від того росте. Ілон Маск згадує, що в дитинстві читав усе, до чого могла дотягнутись рука. Ймовірність досягти його рівня більша у дітей, які читають, вища, ніж в інших. Тому ми вас цінуємо і працюємо на вас. Та робити для Вас без Вас — неправильно. Тому долучайтесь до книготворення!<br/><br/> Ми шукаємо рукопис, який прославив би Україну на цілий світ. Рукопис, який був би цінним і через десятки років. Для нас важливо, щоб він читався на одному подиху, але цього не достатньо. Ми дивимося на те, які зерна сіє текст у дитячі серця, та чим ці зерна проростають. Наше завдання — створити НЕОБХІДНІ ДІТЯМ КНИЖКИ. Наше прагнення — зробити їх витворами мистецтва.
            </p>
          </div>
        </div>
        {currentProducts.map((el, index) => {
                return <ManuscriptProductComponent visitedProducts={visitedProducts} setVisitedProducts={setVisitedProducts} el={el} key={index}/>
        })


        }
        
       
        <ListButtonCount pageNumbers={pageNumbers} handlePageClick={handlePageClick}/>
       {/*<YouLikeIt/>*/} 
        <DiscountAndAction/>
        <ViewProductCatalog products={productsAll}/>
        <Footer/>
        </>
    )
}