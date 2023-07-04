import IconSocial from '../header/iconSocial'
import './footer.css'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/face.svg';
import iconSrctele from '../../../svg/tele.svg';
import iconSrcYou from '../../../svg/you.svg';
import phoneFooter from '../../../svg/phoneFooter.svg';
import emailFooter from '../../../svg/emailFooter.svg';

import '../header/header.css'
import { GrInstagram } from "react-icons/gr";
import { Link } from 'react-router-dom';

export default function FooterUp() {






    return(
        <div className="footerUpWrap">
            <div className='footerUpTitleSocial'>
            <h1 className='footerUpH1'>
            Видавництво<br/><span className='footerUpH1Span'>Час Майстрів</span> 
            </h1>
            <p className='footerUpP'>
            ми розробляю новітні концепцію і створюємо книгу як ноу-хау
            </p>


            <div className='wrapSocialFo'>
            <a href='/'>
            <div className='socialBlockFooter'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrc}
                    width="19.98"
        height="38"
                    />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className='socialBlockFooter'>
                <div className='socialIcon'>
                <GrInstagram className='instaIconFooter'/>
                   
                </div>
            </div>
            </a>
            <a href='/'>
            <div className='socialBlockFooter'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrctele}
                    width="33.09"
        height="29.71"
                    />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className='socialBlockFooter'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrcYou}
                    width="29.91"
        height="20.86"
                    />
                </div>
            </div>
            </a>
        </div>


            </div>
            <div className='footerUpSomeList'>
            <ul className='listUpSomeUl'>
                <li className='listUpSomeUlLi'>Для авторів</li>
                <li className='listUpSomeUlLi'>Для художників</li>
                <li className='listUpSomeUlLi'><Link to="/about" className="listUpSomeUlLi">Вакансії</Link></li>
                <li className='listUpSomeUlLi'>Foreign rights</li>
            </ul>
            </div>
            <div className='footerUpPhone'>
           <h1 className='onlineStoreFooter'>
           Інтернет магазин
           </h1>
           <div className='phoneFooter'>
           <HandySvg 
                    src={phoneFooter}
                    width="18"
        height="18"
                    />
                    <p className='numberPhone'>+38&nbsp;067&nbsp;231&nbsp;57&nbsp;37</p>
           </div>
           <div className='emailFooterUp'>
           <HandySvg 
                    src={emailFooter}
                    width="24"
        height="17.14"
                    />
                    <p className='numberPhone'>sales@chasmaistriv.com.ua</p>
           </div>
            </div>

        </div>
    )
}