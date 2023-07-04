import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import authPic from '../../img/fotoAutor.png'

import withFirebaseCollection from '../HOK/withFirebaseCollection'



const  AllAutors = ({data}) => {

useEffect(() => {

})




    return(
        <div className="allAutorsWrap">
            <div className="allAutorsWrapSmall">
<h1 className="ourAutor">Наші митці</h1>
<div className="autorListSmal">
   {data && data.length > 0 && 
   <>
              {data.map((el, index) => {
               return <><div key={index} className='imgAutorWrapSmall'>
           <Link to={`/author/${el.uid}`}>
                <img src={el.foto} className="imgAutorSmall"/>
                <p className='autorNameM'>{el.name}</p>
                </Link>
                </div>
                <div key={index} className='imgAutorWrapSmall'>
                <Link to={`/author/${el.uid}`}>
                     <img src={el.foto} className="imgAutorSmall"/>
                     <p className='autorNameM'>{el.name}</p>
                     </Link>
                     </div></>
            })}
            </>
         }
           
           
</div>
            </div>
        </div>
    )
}
export default withFirebaseCollection('author')(AllAutors);
  