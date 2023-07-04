
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/footerIconBottom.svg';


export default function FooterBottom({windowDimensions}) {




    return(
        <div className="footerBottomWrap">
            {windowDimensions && <>
            <p className="copyWraitP">
            © Видавництво Час Майстрів 2023
            </p>
            <HandySvg 
                    src={iconSrc}
                    width="552.85"
        height="281.57"
                    />
                    <div className='listAutorDev'>
                    <p className="listAutorDevLi">
                    Логіка, тексти - <span className='listAutorDevLiSpan'>Олег Симоненко</span>
            </p>
            <p className="listAutorDevLi">
            Дизайн -<span className='listAutorDevLiSpan'>Анна Сезон</span>
            </p>
            <p className="listAutorDevLi">
            Розробник - <span className='listAutorDevLiSpan'><a href='https://webui-studio.com/' target="_blanck" className='listAutorDevLiSpan'>Тарас Сидорович</a></span>
            </p>
                    </div>
                    </>}
                    {!windowDimensions && <>
                        <HandySvg 
                    src={iconSrc}
                    width="300"
        height="155"
                    />
            <p className="copyWraitP">
           
            © Видавництво Час Майстрів 2023
            </p>
           
                    <div className='listAutorDev'>
                    <p className="listAutorDevLi">
                    Логіка, тексти - <span className='listAutorDevLiSpan'>Олег Симоненко</span>
            </p>
            <p className="listAutorDevLi">
            Дизайн -<span className='listAutorDevLiSpan'>Анна Сезон</span>
            </p>
            <p className="listAutorDevLi">
            Розробник - <span className='listAutorDevLiSpan'><a href='https://webui-studio.com/' target="_blanck" className='listAutorDevLiSpan'>Тарас Сидорович</a></span>
            </p>
                    </div>
                    </>}
        </div>
    )
}