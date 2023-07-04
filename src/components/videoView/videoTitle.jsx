import css from './videoView.module.css'

import {HandySvg} from 'handy-svg';
import iconSrc from '../../img/withLeg.png';
import arrowImp from '../../img/arrowDownPick.png'
import you from '../../svg/youVideo.svg'

export default function VideoTitle({windowDimensions}) {



    return(
        <div className={css.videoTitleWrap}>
            <div className={css.totalVideoWrap}>
            <div className={css.firstBlockWrap}>
                <h1 className={css.videoViewvH1}>Відеоогляд за віком</h1>
                <p className={css.videoViewvP}>ми допоиожемо Вам обрати саме ту книгу!</p>
                <div className={css.chousBooksSelect}>
  <select className={css.customSelect} >
    <option className={css.customOpin} value="0">10 років</option>
    <option className={css.customOpin} value="1">8 років</option>
   
  </select>
  <img src={arrowImp} className={css.customArrowSelect} />
</div>
<div className={css.joinYouWrap}>
    <h2 className={css.joinH2}>Підписуйтесь на нас на Youtube</h2>
    <a href='https://www.youtube.com/@chasmaistriv' target='_blanck'>
    <div className={css.youWrap}>
        
    <HandySvg 
                    src={you}
                  
                    width="43.67"
        height="30.45"
                    />
    </div>
    </a>
</div>
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