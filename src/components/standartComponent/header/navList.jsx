
import { useState } from 'react'
import './header.css'

import { Link, useNavigate } from 'react-router-dom';



export default function NavList({setAllBooks, allBooks, setAllManus, allManus}) {
  
const changState = (e) => {

setAllBooks(!allBooks)
setAllManus(false)
}
const changStateFilter = (e) => {

    setAllBooks(false)
    setAllManus(!allManus)
    }

    return(
     <div className='navigationWrap'>
        <ul className='navigationUl'>
            <li className='navigationLi' onClick={changState}>
             Усі Книги
            </li>
            <li className='navigationLi'><Link to="/opt">
             Прайс-гурт</Link>
            </li>
            <li className='navigationLi'><Link to="/author">
             Майстри</Link>
            </li>
            <li className='navigationLi'><Link to="/hero">
             Герої</Link>
            </li>
            <li className='navigationLi'><Link to="/blog">
             Блог</Link>
            </li>
            <li className='navigationLi' onClick={changStateFilter}>
             Рукописи
            </li>
            <li className='navigationLi'><Link to="/video">
             Відеоогляд за віком</Link>
            </li>
        </ul>
     </div>
    )
}