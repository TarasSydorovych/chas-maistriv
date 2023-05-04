import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/face.svg';
import iconSrctele from '../../../svg/tele.svg';
import iconSrcYou from '../../../svg/you.svg';
import './header.css'
import { GrInstagram } from "react-icons/gr";



export default function IconSocial() {




    return(
        <div className='wrapSocial'>
            <a href='https://www.facebook.com/chasmaistriv' target="_blanck">
            <div className='socialBlock'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrc}
                    width="13.03"
        height="24.33"
                    />
                </div>
            </div>
            </a>
            <a href='https://www.instagram.com/chas_maistriv/' target="_blanck">
            <div className='socialBlock'>
                <div className='socialIcon'>
                <GrInstagram className='instaIcon'/>
                   
                </div>
            </div>
            </a>
            <a href='https://t.me/chasmaistriv_bot' target="_blanck">
            <div className='socialBlock'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrctele}
                    width="22.13"
        height="19.94"
                    />
                </div>
            </div>
            </a>
            <a href='https://www.youtube.com/channel/UCdb7uU00naXsUedOHXOBBYQ' target="_blanck">
            <div className='socialBlock'>
                <div className='socialIcon'>
                    <HandySvg 
                    src={iconSrcYou}
                    width="20"
        height="14"
                    />
                </div>
            </div>
            </a>
        </div>
    )
}