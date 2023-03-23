import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/ptah.svg';
import arrowDown from '../../svg/arrowDown.svg';
import arrowImp from '../../img/arrowDownPick.png'
import './mainPage.css'






export default function BookAge() {




    return(
       <div className="bookAgeWrap">
        <div className="bookAgeWrapSmall">
        <HandySvg 
                    src={iconSrc}
                    width="263.82"
        height="310.38"
                    />

                    <div className='chousBooks'>
                        <h1 className='chousBooksH1'>
                        Обирай книгу за віком
                        </h1>
                        <div className='blockButtonSelectWrap'>
                        <div className='chousBooksSelect'>
                            <select className='customSelect'>
                            <option className='customOpin'  value="0">дітям до 1 року</option>
                            <option className='customOpin'  value="1">дітям до 4 року</option>
                            </select>
                            <img src={arrowImp}
        className="customArrowSelect"
                    />
                        </div>
<button className='buttonSelect'>Переглянути</button>

                        </div>
                    </div>
        </div>
       </div>
    )
}