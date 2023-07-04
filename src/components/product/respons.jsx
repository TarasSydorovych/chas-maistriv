import css from './product.module.css'
import pic from '../../img/autorRespons.png'
import starLike from '../../svg/starLike.svg'
import starDontLike from '../../svg/starDontLike.svg'
import {HandySvg} from 'handy-svg';

export default function Respons({rewievList}) {




    return(
        <div className={css.responsWrap}>
        <div className={css.responsWrapSmall}>
            <h1 className={css.h1Response}>
                Відгуки
            </h1>
            
            {rewievList.map((el, index) => {
           return   <div key={index} className={css.respons}>
                <div className={css.responsAuthPic}>
                    <img src={pic} className={css.responsAuthPic}/>
                </div>
                <div className={css.responsAuthText}>
                    <p className={css.autorName}>{el.nameAutor}</p>
                    <p className={css.autorRespons}>{el.vidguk}</p>
                    <div className={css.autorRating}>
                    <HandySvg 
                    src={starLike}
                    className={css.starStyle}
                    width="23"
        height="22"
                    />
                      <HandySvg 
                    src={starLike}
                    className={css.starStyle}
                    width="23"
        height="22"
                    />
                      <HandySvg 
                    src={starLike}
                    className={css.starStyle}
                    width="23"
        height="22"
                    />
                      <HandySvg 
                    src={starLike}
                    className={css.starStyle}
                    width="23"
        height="22"
                    />
                     <HandySvg 
                    src={starDontLike}
                    className={css.starStyle}
                    width="23"
        height="22"
                    />
                    </div>
                </div>
              </div>

            })}
             



              

        </div>
        </div>

    )
}