import BigVideo from './bigVideo'
import VideoTitle from './videoTitle'
import css from './videoView.module.css'


export default function VideoView({windowDimensions}) {





    return(
        <div>
           <VideoTitle windowDimensions={windowDimensions}/>
           <BigVideo windowDimensions={windowDimensions}/>
        </div>
    )
}