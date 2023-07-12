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
import withFirebaseCollection from "../HOK/withFirebaseCollection";




const Catalog = ({setVisitedProducts, visitedProducts, productsAll, data}) => {

// const [currentPage, setCurrentPage] = useState(1);
// const productsPerPage = 1;
// const products = useSelector((state) => state.products.items);
// const filters = useSelector((state) => state.filters);

// const handlePageClick = (pageNumber) => {
//   setCurrentPage(pageNumber);
// };

// const startIndex = (currentPage - 1) * productsPerPage;
// const endIndex = startIndex + productsPerPage;
// const currentProducts = products.slice(startIndex, endIndex);

// const numberOfPages = Math.ceil(products.length / productsPerPage);
// const maxDisplayedPages = 2; // Максимальна кількість відображуваних сторінок

// let startPage = currentPage - Math.floor(maxDisplayedPages / 2);
// let endPage = currentPage + Math.floor(maxDisplayedPages / 2);

// if (startPage < 1) {
//   startPage = 1;
//   endPage = startPage + maxDisplayedPages - 1;
// }

// if (endPage > numberOfPages) {
//   endPage = numberOfPages;
//   startPage = endPage - maxDisplayedPages + 1;
//   if (startPage < 1) {
//     startPage = 1;
//   }
// }

// const pageNumbers = [];
// for (let i = startPage; i <= endPage; i++) {
//   pageNumbers.push(i);
// }
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 10;
const products = useSelector((state) => state.products.items);
const filters = useSelector((state) => state.filters);

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
        
        
        <Filter filters={filters}/>
        <FirstBlockCat/>
        {currentProducts.map((el, index) => {
                return <CatalogProductComponent visitedProducts={visitedProducts} setVisitedProducts={setVisitedProducts} el={el} key={index}/>
        })


        }
        
       
        <ListButtonCount pageNumbers={pageNumbers} handlePageClick={handlePageClick}/>
        {/*<YouLikeIt/>*/}
        <DiscountAndAction/>
        <ViewProductCatalog products={productsAll}/>
        
        </>
    )
}
export default withFirebaseCollection('seo')(Catalog);