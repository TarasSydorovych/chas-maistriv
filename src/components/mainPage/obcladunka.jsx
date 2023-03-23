import pic1 from '../../img/pic1.png'
import pic2 from '../../img/pic2.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/likeBook.svg';

import './mainPage.css'

export default function Obcladunka() {




    return(
       <div className="opWrap">
        <div className="obSmallWrap">
            <h1 className="obcladH1">
            Яка обкладинка вам більше довподоби ?
            </h1>
            <div className="wrapTwoPic">
                <div className="wrapPicAndIcon">
                    <img src={pic1}  className="picOb"/>
                    <div className='likeBook'>
                    <HandySvg 
                    src={iconSrc}
                    className="likeBookIcon"
                    width="50"
        height="40"
                    />
                    
                    </div>
                </div>
                <div className="wrapPicAndIcon">
                    <img src={pic1}  className="picOb"/>
                    <div className='likeBook'>
                    <HandySvg 
                    src={iconSrc}
                    className="likeBookIcon"
                    width="50"
        height="40"
                    />
                    
                    </div>
                </div>
            </div>
        </div>
       </div>
    )
}