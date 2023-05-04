
import { Link } from 'react-router-dom'
import './header.css'
import Logo from './logo'
import NavList from './navList'




export default function HeaderDown({setAllBooks, allBooks}) {




    return(
       <div className='headeDownWrap'>
       <Link to="/" className='logoH1'><Logo/></Link> 
        <NavList allBooks={allBooks} setAllBooks={setAllBooks}/>
       </div>
    )
}