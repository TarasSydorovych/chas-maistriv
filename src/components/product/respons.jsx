import css from './product.module.css'
import pic from '../../img/autorRespons.png'
import starLike from '../../svg/starLike.svg'
import starDontLike from '../../svg/starDontLike.svg'
import {HandySvg} from 'handy-svg';

export default function Respons() {




    return(
        <div className={css.responsWrap}>
        <div className={css.responsWrapSmall}>
            <h1 className={css.h1Response}>
                Відгуки
            </h1>
              <div className={css.respons}>
                <div className={css.responsAuthPic}>
                    <img src={pic}/>
                </div>
                <div className={css.responsAuthText}>
                    <p className={css.autorName}>Галина</p>
                    <p className={css.autorRespons}>Замовила книжечку. Дуже чекаю на неї! Будемо по вечорах читати сім’єю</p>
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



              <div className={css.respons}>
                <div className={css.responsAuthPic}>
                    <img src={pic}/>
                </div>
                <div className={css.responsAuthText}>
                    <p className={css.autorName}>Галина</p>
                    <p className={css.autorRespons}>Замовила книжечку. Дуже чекаю на неї! Будемо по вечорах читати сім’єю</p>
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

        </div>
        </div>

    )
}