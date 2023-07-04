import HeaderApp from "./headerApp";
import './header.css'
import HeaderDown from "./headerDown";
import { useState } from 'react'
import FilterMenu from "./filterMenu";
import LogIn from "../logIn/logIn";
import EnterUser from "../enterUser/enterUser";
import Card from "../card/card";
import FilterMenuManu from "./filterMenuManu";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


export default function Header({setLogin, login, setEnterUser, enterUser, scrollHeight}) {
    const [allBooks, setAllBooks] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(true)
    const [allManus, setAllManus] = useState(false);
    const [cart, setCart] = useState(false);
    const [countProductForCart, setCountProductForCart] = useState();
    const location = useLocation();
    useEffect(() => {
      
        function handleResize() {
         
          if(window.innerWidth < 1100){
      
          setWindowDimensions(false);
        }else{
          setWindowDimensions(true);
        }
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location, allBooks]);
    return(
        <>
        <HeaderApp windowDimensions={windowDimensions} setWindowDimensions={setWindowDimensions} countProductForCart={countProductForCart} setLogin={setLogin} login={login} setCart={setCart}/>
        <HeaderDown windowDimensions={windowDimensions} setWindowDimensions={setWindowDimensions} setAllBooks={setAllBooks} allManus={allManus} setAllManus={setAllManus} allBooks={allBooks}/>
        {allBooks && 
        <FilterMenu allBooks={allBooks} setAllBooks={setAllBooks} windowDimensions={windowDimensions} setWindowDimensions={setWindowDimensions}/>
        }
         {allManus && 
        <FilterMenuManu setAllManus={setAllManus} windowDimensions={windowDimensions} setWindowDimensions={setWindowDimensions}/>
        }
        {login && 
        <LogIn scrollHeight={scrollHeight} setLogin={setLogin} login={login} setEnterUser={setEnterUser}/>
        }
        {enterUser &&
        <EnterUser setEnterUser={setEnterUser} enterUser={enterUser} setLogin={setLogin}/>
        }
        {cart &&
        <Card setCart={setCart} setCountProductForCart={setCountProductForCart}/>
        }
        
        </>
    )
}