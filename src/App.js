import MainPage from "./components/mainPage/mainPage";
import Header from "./components/standartComponent/header/header";
import { Routes, Route } from "react-router-dom";
import Catalog from "./components/catalog/catalog";

function App() {
  return (
   <>
   <Routes>
   <Route path='/' element={<MainPage/>}/>
   <Route path='/catalog' element={<Catalog/>}/>
   </Routes>
   
   </>
  );
}

export default App;
