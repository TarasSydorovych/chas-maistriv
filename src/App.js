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
import Order from "./components/order/order";
import UserCabinet from "./components/userCabinet/userCabinet";
import Like from "./components/like/like";
import Hero from "./components/product/hero";
import HeroPage from "./components/hero/hero";
import PriceOpt from "./components/priceOpt/priceOpt";
import HeroAdm from "./components/heroAdm/heroAdm";
import AddPromo from "./components/admin/addPromo";
import VideoView from "./components/videoView/videoView";
import Blog from "./components/blog/blog";
import AddBlog from "./components/admBlog/addBlog";
import AddRuk from "./components/addRuk/addRuk";
import Manuscript from "./components/manuscript/manuscript";
import CatalogMan from "./components/catalogMan/catalogMan";
import Author from "./components/autor/author";
import AutorAdm from "./components/autorAdm/autorAdm";
import Obcladunka from "./components/mainPage/obcladunka";
import Carton from "./components/admin/carton";
import SurveyForm from "./components/admin/surveyForm";

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
  const [addressChanged, setAddressChanged] = useState(false);
 
  const [login, setLogin] = useState(false);
  const [enterUser, setEnterUser] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollHeight = window.pageYOffset;
      setScrollHeight(currentScrollHeight);
     
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


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
  const [haveManu, setHaveManu] = useState(false);
  const [manuscript, setManuscript] = useState([]);
  useEffect(() => {
    const fetchManuscript = async () => {
      const productsRef = collection(db, 'manuscript');
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setHaveManu(true)
      setManuscript(productsList);
      console.log('Список продуктів',products);
    };
    fetchManuscript();
  }, []);


 
  return (
   <>
    <MyContext.Provider value={{ selectedFilters, setSelectedFilters }}>
    {haveProduct && 
    <>
    <Header scrollHeight={scrollHeight} setLogin={setLogin} login={login} setEnterUser={setEnterUser} enterUser={enterUser}/>
    <Routes>
    <Route path='/' element={<MainPage />}/>
    <Route path='/catalog' element={<Catalog visitedProducts={visitedProducts} productsAll={products} setVisitedProducts={setVisitedProducts}/>}/>
    <Route path='/manuscriptCatalog' element={<CatalogMan visitedProducts={visitedProducts} productsAll={manuscript} setVisitedProducts={setVisitedProducts}/>}/>
    <Route path='/product/' element={<Product/>}/>
    <Route path='/product/:id' element={<Product setLogin={setLogin} products={products} addressChanged={addressChanged} setAddressChanged={setAddressChanged}/>}/>
    <Route path='/order' element={<Order setLogin={setLogin}/>}/>
    <Route path='/like' element={<Like/>}/>
    <Route path='/syrv' element={<SurveyForm/>}/>
    <Route path='/hero' element={<HeroPage/>}/>
    <Route path='/hero/:id' element={<HeroPage/>}/>
    <Route path='/opt' element={<PriceOpt/>}/>
    <Route path='/user' element={<UserCabinet  products={products} addressChanged={addressChanged} setAddressChanged={setAddressChanged}/>}/>
    <Route path='/adm' element={<AddBooks/>}/>
    <Route path='/admRuk' element={<AddRuk/>}/>
    <Route path='/admHero' element={<HeroAdm/>}/>
    <Route path='/admBlog' element={<AddBlog/>}/>
    <Route path='/manuscript/:id' element={<Manuscript setLogin={setLogin} products={manuscript} addressChanged={addressChanged} setAddressChanged={setAddressChanged}/>}/>
    <Route path='/promo' element={<AddPromo/>}/>
    <Route path='/video' element={<VideoView/>}/>
    <Route path='/blog' element={<Blog/>}/>
    <Route path='/author' element={<Author/>}/>
    <Route path='/author/:id' element={<Author/>}/>
    <Route path='/admAutor' element={<AutorAdm/>}/>
    <Route path='/obcladunka' element={<Carton/>}/>
    
    </Routes>
    </>
    }
   
   
   </MyContext.Provider>
   
   </>
  );
}

export default App;
