import MainPage from "./components/mainPage/mainPage";
import Header from "./components/standartComponent/header/header";
import { Routes, Route } from "react-router-dom";
import Catalog from "./components/catalog/catalog";
import Product from "./components/product/product";

function App() {
  return (
   <>
   <Routes>
   <Route path='/' element={<MainPage/>}/>
   <Route path='/catalog' element={<Catalog/>}/>
   <Route path='/product' element={<Product/>}/>
   </Routes>
   
   </>
  );
}

export default App;
