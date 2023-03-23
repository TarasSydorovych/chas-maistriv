import {HandySvg} from 'handy-svg';

import IconSocial from './iconSocial';
import Number from './number';
import Search from './search';
import Sun from './sun';

export default function HeaderApp() {




    return(
        <section id="sectionHeaderApp">
<div className="headerAppWrap">
    <div className="language">
        
        <div className="iconLanguage">
        <div className='blue'></div>
        <div className='yellow'></div>
        </div>
        <div className="textLanguage">
            ua
        </div>
    </div>
    <IconSocial/>
<Sun/>
<Number/>
<Search/>
</div>
        </section>
    )
}