import css from './blog.module.css'
import YouTube from 'react-youtube';
import { useState } from 'react';


export default function BlogView({blogData}){

    const [showCount, setShowCount] = useState(6);

    const handleShowMore = () => {
      setShowCount((prevCount) => prevCount + 6);
    };


    return(
<div className={css.bigVideoWrap}>

{blogData.length > 0 &&
    <div className={css.bigVideoWrapSmall}>
   
   <div className={css.bigWrap}>
      
       <YouTube videoId="rg-wgk2_4FQ" opts={{ width: '758px', height: '454px' }} />
       <div className={css.someTextWrap}>
               <h1 className={css.videoViewvH1}>Дитина не хоче читати. Що робити?</h1>
               <p className={css.bigVideoP}>Наші відеоогляди допоможуть Вам ближче ознайомитися з нашими книгами та обрати саме ті, які будуть Вам найбільше до душі! Цей відеоогляд покликаний обрати книгу саме для дітей 3х та 4х років.</p>
           </div>
       </div>
       <div className={css.smallVideoWrap}>
      
           <div className={css.smallvidelListWrap}>
           {blogData.map((el, index) => {
                if (index < showCount) {
                  return (
                    <div key={index} className={css.smalVideoPro}>
                      <YouTube videoId={el.videoId} opts={{ width: '376px', height: '224px' }} />
                      <p className={css.videoName}>{el.zag}</p>
                      <p className={css.videoNameDesc}>{el.chortDesc}</p>
                    </div>
                  );
                }
                return null;
              })}
              
            
           </div>
       </div>
       {showCount < blogData.length && (
            <button className={css.mareVideo} onClick={handleShowMore}>
              Більше відео
            </button>
          )}
        
</div>
}

</div>
    )
}