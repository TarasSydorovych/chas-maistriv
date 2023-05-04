
import { useState } from 'react'
import './header.css'





export default function NavList({setAllBooks, allBooks}) {
  
const changState = (e) => {

setAllBooks(!allBooks)
console.log(allBooks);
}


    return(
     <div className='navigationWrap'>
        <ul className='navigationUl'>
            <li className='navigationLi' onClick={changState}>
             Усі Книги
            </li>
            <li className='navigationLi'><a href="/">
             Прайс-гурт</a>
            </li>
            <li className='navigationLi'><a href="/">
             Майстри</a>
            </li>
            <li className='navigationLi'><a href="/">
             Герої</a>
            </li>
            <li className='navigationLi'><a href="/">
             Блог</a>
            </li>
            <li className='navigationLi'><a href="/">
             Рукописи</a>
            </li>
            <li className='navigationLi'><a href="/">
             Відеоогляд за віком</a>
            </li>
        </ul>
     </div>
    )
}