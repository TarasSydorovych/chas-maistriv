import './mainPage.css'

import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/pta.svg';
import arrow from '../../svg/arrow.svg';

export default function Banner() {




    return(
        <div className='bannerWrapperAll'>
       <div className='bannerWrapper'>
        <div className='bannerText'>
         <h1 className='banerH1'>
         Knowhowbook
         </h1>
         <p className='bannerP'>
         Ми ті, хто створює книгу з нуля, від першо елемента Малевича - чорного квадрату, до великого світу по якому цікаво і корисно мандрувати.<br/> Know where to go <br/>Know how to show,<br/> Know where to blow <br/>Кожна наша книга містить НОУ-ХАУ.
         </p>
         <button className='bannerButton'>Допомагаємо обрати книгу</button>

        </div>
        <div className='bannerIcon'>
        <HandySvg 
                    src={iconSrc}
                    width="972.27"
        height="512.83"
                    />
        </div>
       </div>
       <HandySvg 
                    src={arrow}
                    className="arrovIconBanner"
                    width="52"
        height="49.56"
                    />
       </div>
    )
}