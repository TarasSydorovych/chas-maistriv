
import './header.css'





export default function NavList() {




    return(
     <div className='navigationWrap'>
        <ul className='navigationUl'>
            <li className='navigationLi'><a href="/">
             Усі Книги</a>
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