import HeaderApp from "./headerApp";
import './header.css'
import HeaderDown from "./headerDown";
import { useState } from 'react'
import FilterMenu from "./filterMenu";
import LogIn from "../logIn/logIn";
import EnterUser from "../enterUser/enterUser";
import Card from "../card/card";



export default function Header() {
    const [allBooks, setAllBooks] = useState(false);
    const [login, setLogin] = useState(false);
    const [enterUser, setEnterUser] = useState(false);
    const [cart, setCart] = useState(false);
    const [countProductForCart, setCountProductForCart] = useState();

    return(
        <>
        <HeaderApp countProductForCart={countProductForCart} setLogin={setLogin} login={login} setCart={setCart}/>
        <HeaderDown setAllBooks={setAllBooks} allBooks={allBooks}/>
        {allBooks && 
        <FilterMenu/>
        }
        {login && 
        <LogIn setLogin={setLogin} login={login} setEnterUser={setEnterUser}/>
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