import MainPage from "./components/mainPage/mainPage";
import Header from "./components/standartComponent/header/header";
import { Routes, Route } from "react-router-dom";
import Catalog from "./components/catalog/catalog";
import Product from "./components/product/product";
import AddBooks from "./components/admin/addBooks";
import {auth, db} from './firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore"; 
import {useState, useEffect} from 'react'
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const MyContext = React.createContext({
  value: "",
  setValue: () => {},
});
function App() {
  const [visitedProducts, setVisitedProducts] = useState([]);
  const [value, setValue] = useState([]);
  const [products, setProducts] = useState([]);
  const [haveProduct, setHaveProduct] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([]);
  useEffect(() => {
    // отримати з localStorage список відвіданих товарів
    const storedProducts = JSON.parse(localStorage.getItem('visitedProducts'));
    if (storedProducts) {
      setVisitedProducts(storedProducts);
          }
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'product');
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setHaveProduct(true)
      setProducts(productsList);
      console.log('Список продуктів',products);
    };
    fetchProducts();
  }, []);


 
  return (
   <>
    <MyContext.Provider value={{ selectedFilters, setSelectedFilters }}>
    {haveProduct && 
    <Routes>
    <Route path='/' element={<MainPage/>}/>
    <Route path='/catalog' element={<Catalog visitedProducts={visitedProducts} productsAll={products} setVisitedProducts={setVisitedProducts}/>}/>
    <Route path='/product/' element={<Product/>}/>
    <Route path='/product/:id' element={<Product products={products}/>}/>
    
    <Route path='/adm' element={<AddBooks/>}/>
    </Routes>
    }
   
   
   </MyContext.Provider>
   
   </>
  );
}

export default App;
