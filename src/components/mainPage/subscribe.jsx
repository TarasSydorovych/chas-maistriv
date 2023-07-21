import { Link } from 'react-router-dom'
import imgLogog from '../../img/logSubscribe.png'



export default function Subscribe() {




    return(

        <div className="subscribeWrap">
            <img src={imgLogog} className="logSubscribe"/>
            <p className='subscribeP'>
            Підпишись щоб <br/><span className='subscribePSpan'>отримати знижку</span>
            </p>
            <Link className='linkSubscrib' to='/user'>
            <button className='subscribeButton'>
                Підписатися
            </button>
            </Link>
        </div>
    )
}