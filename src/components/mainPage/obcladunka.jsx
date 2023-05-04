import pic1 from '../../img/pic1.png'
import pic2 from '../../img/pic2.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/likeBook.svg';

import './mainPage.css'
import { useState } from 'react';

export default function Obcladunka() {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
const likepick = (lab) => {
if(lab === 'first'){
    setFirst(true)
    setSecond(false)
}else if(lab === 'second'){
    setFirst(false)
    setSecond(true)
}



}


    return(
       <div className="opWrap">
        <div className="obSmallWrap">
            <h1 className="obcladH1">
            Яка обкладинка вам більше довподоби ?
            </h1>
            <div className="wrapTwoPic">
                <div className="wrapPicAndIcon">
                    <img src={pic1}  className="picOb"/>
                    <div onClick={() => likepick('first')} className={`likeBook ${
                        first ? "selected" : ""
                      }`}>
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
                    <div onClick={() => likepick('second')} className={`likeBook ${
                        second ? "selected" : ""
                      }`}>
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