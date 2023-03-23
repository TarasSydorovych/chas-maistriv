import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/searsh.svg';
import iconSrctele from '../../../svg/like.svg';
import iconSrcYou from '../../../svg/cabinetIcon.svg';
import shopIco from '../../../svg/shopIco.svg';

import './header.css'
import { GrInstagram } from "react-icons/gr";



export default function Search() {




    return(
        <div className='wrapSearch'>
            <a href='/'>
            <div className='searchBlock'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrc}
                    width="28"
        height="28"
                    />
                </div>
            </div>
            </a>
           
            <a href='/'>
            <div className='searchBlock'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrctele}
                    width="30"
        height="28"
                    />
                </div>
            </div>
            </a>
            <a href='/'>
            <div className='searchBlock'>
                <div className='socialIcon'>
                <HandySvg 
                    src={shopIco}
                    width="28.33"
        height="28"
                    />
                   
                </div>
            </div>
            </a>
            <a href='/'>
            <div className='searchBlock'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrcYou}
                    width="28"
        height="28"
                    />
                </div>
            </div>
            </a>
        </div>
    )
}