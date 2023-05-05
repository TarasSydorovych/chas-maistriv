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




export default function Catalog({setVisitedProducts, visitedProducts, productsAll}) {
    const [indexPage, setIndexPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 2;
    const products = useSelector((state) => state.products.items);
    const filters = useSelector(state => state.filters);

const maxDisplayedPages = 6; // максимальна кількість кнопок для відображення
const firstDisplayedPages = 0; // кількість кнопок з початку
const lastDisplayedPages = 1;
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber + 1);
      };


      const numberOfPages = Math.ceil(products.length / productsPerPage);
      const pageNumbers = [];
      let startPage = currentPage - Math.floor(maxDisplayedPages / 2) + firstDisplayedPages;
let endPage = currentPage + Math.floor(maxDisplayedPages / 2) + lastDisplayedPages;
if (startPage < firstDisplayedPages) {
  startPage = firstDisplayedPages;
  endPage = startPage + maxDisplayedPages - 1;
}
if (endPage > numberOfPages - lastDisplayedPages) {
  endPage = numberOfPages - lastDisplayedPages;
  startPage = endPage - maxDisplayedPages + 1;
}
for (let i = startPage; i <= endPage; i++) {
  pageNumbers.push(i);
}

// відображаємо останні сторінки
for (let i = numberOfPages - lastDisplayedPages; i < numberOfPages; i++) {
  if (i >= firstDisplayedPages && !pageNumbers.includes(i)) {
    pageNumbers.push(i);
  }
}
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

    return(
        <>
        <Header/>
        
        <Filter filters={filters}/>
        <FirstBlockCat/>
        {currentProducts.map((el, index) => {
                return <CatalogProductComponent visitedProducts={visitedProducts} setVisitedProducts={setVisitedProducts} el={el} key={index}/>
        })


        }
        
       
        <ListButtonCount pageNumbers={pageNumbers} handlePageClick={handlePageClick}/>
        <YouLikeIt/>
        <DiscountAndAction/>
        <ViewProductCatalog products={productsAll}/>
        <Footer/>
        </>
    )
}