
import './header.css'

import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/logo.svg';
import MainPop from '../../popUp/mainPop';
import { useState } from 'react';


export default function Logo() {

const [popUp, setPopUp] = useState(false);
const handleMouseEnter = () => {
    setPopUp(true);
  };

  const handleMouseLeave = () => {
    setPopUp(false);
  };

    return(<>
       <div className='wrapLogo'  onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
          <HandySvg 
                    src={iconSrc}
                    width="129.63"
        height="120.33"
                    />
                    <h1 className='logoH1'>
                        Видавництво<br/>
                        <span>ЧАС МАЙСТРІВ</span>
                    </h1>
       </div>
       {popUp &&
        <MainPop/>}
       </>
    )
}