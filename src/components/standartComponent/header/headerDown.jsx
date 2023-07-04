
import { Link } from 'react-router-dom'
import './header.css'
import Logo from './logo'
import NavList from './navList'
import { useState, useEffect } from 'react'
import burger from '../../../img/BURGER.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/hres.svg';
import IconSocial from './iconSocial'
import IconSocialMob from './iconSocialMob'
export default function HeaderDown({setAllBooks, allBooks, setAllManus, allManus, setWindowDimensions, windowDimensions}) {


    
  const [burgerTrue, setBurgerTrue] = useState(false);
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
const burgerMen = () => {
    setBurgerTrue(true);
}
const closeBurger = () => {
  setBurgerTrue(false);
}


    return(
        <>
        {windowDimensions && 
       <div className='headeDownWrap'>
       <Link to="/" className='logoH1'><Logo/></Link> 
        <NavList allManus={allManus} setAllManus={setAllManus} allBooks={allBooks} setAllBooks={setAllBooks}/>
       </div>
       }
        {!windowDimensions && 
       <div className='headeDownWrap'>
       <Link to="/" className='logoH1'><Logo/></Link> 
        <img src={burger} className="burger" onClick={burgerMen}/>
       </div>
       }
       {burgerTrue && 
       <div className='burgerWrap'>
           <HandySvg 
        onClick={closeBurger}
        className="iconFromBurger"
                    src={iconSrc}
                    width="28"
        height="28"
                    />
        <div className='smallWrap'>
     
                    <ul className='burgerList'>
                      <li className='burgerListLi' onClick={() => setAllBooks(!allBooks)}>Усі книги</li>
                      <li className='burgerListLi'><Link className='burgerListLi' to="/opt">Прайс-гурт</Link></li>
                      <li className='burgerListLi'><Link className='burgerListLi' to="/author">Майстри</Link></li>
                      <li className='burgerListLi'><Link className='burgerListLi' to="/hero">Герої</Link></li>
                      <li className='burgerListLi'><Link className='burgerListLi' to="/blog">Блог</Link></li>
                      <li className='burgerListLi'><Link className='burgerListLi' to="">Рукописи</Link></li>
                      <li className='burgerListLi'><Link className='burgerListLi' to="/video">Відеоогляд за віком</Link></li>
                    </ul>
                    <IconSocialMob/>
        </div>

       </div>
       }
       </>
    )
}