import css from './product.module.css'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/sendMess.svg';



export default function ResponsTextArea(){


    return(
        <div className={css.respTextAreaWrap}>
            <div className={css.respTextAreaWrapSmall}>
                <textarea placeholder='Залишити відгук...' className={css.textAreaStyle}>
                </textarea>
                <div className={css.sendMessage}>
                <HandySvg 
                    src={iconSrc}
                    width="40.25"
        height="43.2"
                    />
                </div>
            </div>
        </div>

    )
}