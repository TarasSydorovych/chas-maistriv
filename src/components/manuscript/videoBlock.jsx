import css from './product.module.css'
import YouTube from 'react-youtube';


export default function VideoBlock() {

  


    return(
      <div className={css.videoBlockWrap}>

<div className={css.videoBlock}>
<YouTube videoId="rg-wgk2_4FQ" opts={{ width: '635px', height: '342px' }} />
</div>
      </div>

    )
}