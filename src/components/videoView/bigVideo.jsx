import css from './videoView.module.css'
import YouTube from 'react-youtube';



export default function BigVideo({windowDimensions}){




    return(
<div className={css.bigVideoWrap}>
<div className={css.bigVideoWrapSmall}>
    <div className={css.bigWrap}>
        {windowDimensions && 
    <YouTube videoId="rg-wgk2_4FQ" opts={{ width: '758px', height: '454px' }} />
}
{!windowDimensions && 
    <YouTube videoId="rg-wgk2_4FQ" opts={{ width: '300px', height: '200px' }} />
}
    <div className={css.someTextWrap}>
            <h1 className={css.videoViewvH1}>Булава Іллі Муромця” наша історія!</h1>
            <p className={css.bigVideoP}>Наші відеоогляди допоможуть Вам ближче ознайомитися з нашими книгами та обрати саме ті, які будуть Вам найбільше до душі! Цей відеоогляд покликаний обрати книгу саме для дітей 3х та 4х років.</p>
        </div>
    </div>
    <div className={css.bigWrap}>
        {windowDimensions && 
    <YouTube videoId="rg-wgk2_4FQ" opts={{ width: '758px', height: '454px' }} />
}
{!windowDimensions && 
    <YouTube videoId="rg-wgk2_4FQ" opts={{ width: '300px', height: '200px' }} />
}
    <div className={css.someTextWrap}>
            <h1 className={css.videoViewvH1}>Булава Іллі Муромця” наша історія!</h1>
            <p className={css.bigVideoP}>Наші відеоогляди допоможуть Вам ближче ознайомитися з нашими книгами та обрати саме ті, які будуть Вам найбільше до душі! Цей відеоогляд покликаний обрати книгу саме для дітей 3х та 4х років.</p>
        </div>
    </div>
        <div className={css.smallVideoWrap}>
            <h1 className={css.smallWrapH1}>Вам буде цікаво</h1>
            <div className={css.smallvidelListWrap}>
                {windowDimensions && 
                <div className={css.smalVideoPro}>
                <YouTube videoId="rg-wgk2_4FQ" opts={{ width: '376px', height: '224px' }} />
                <p className={css.videoName}>Як заохотити дитину читати?</p>
                </div>
                }
                {!windowDimensions && 
                <div className={css.smalVideoPro}>
                <YouTube videoId="rg-wgk2_4FQ" opts={{ width: '290px', height: '200px' }} />
                <p className={css.videoName}>Як заохотити дитину читати?</p>
                </div>
                }
           
            </div>
        </div>
        <button className={css.mareVideo}>Більше відео</button>
</div>
</div>
    )
}