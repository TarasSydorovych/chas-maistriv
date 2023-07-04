import css from './product.module.css'
import YouTube from 'react-youtube';


export default function VideoBlock({windowDimensions}) {

  


    return(
      <div className={css.videoBlockWrap}>

<div className={css.videoBlock}>
  {windowDimensions &&
  <YouTube videoId="rg-wgk2_4FQ" opts={{ width: '635px', height: '342px' }} />
  }
 {!windowDimensions &&
  <YouTube videoId="rg-wgk2_4FQ" opts={{ width: '100%', height: '204px' }} />
  }
</div>
      </div>

    )
}