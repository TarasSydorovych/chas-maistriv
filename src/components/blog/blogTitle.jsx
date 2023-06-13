import css from './blog.module.css'

import {HandySvg} from 'handy-svg';
import iconSrc from '../../img/blogTitleAitor.png';
import arrowImp from '../../img/arrowDownPick.png'
import you from '../../svg/youVideo.svg'

export default function BlogTitle() {



    return(
        <div className={css.videoTitleWrap}>
            <div className={css.totalVideoWrap}>
            <div className={css.firstBlockWrap}>
                <h1 className={css.videoViewvH1}>Як залучити дитину до читання змалку?</h1>
                <p className={css.videoViewvP}>Олег Симоненко дослідив це питання і допоможе Вам розібратися</p>
           <button className={css.buttonRead}>Читати</button>

            </div>
            <div className={css.secondBlockWrap}>
            <img 
                    src={iconSrc}
                    className={css.svgForVideo}
        
                    />
            </div>
            </div>
        </div>
    )
}