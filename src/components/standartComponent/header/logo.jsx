
import './header.css'

import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/logo.svg';


export default function Logo() {




    return(
       <div className='wrapLogo'>
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
    )
}