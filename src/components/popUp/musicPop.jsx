import css from './popUp.module.css'




export default function MusicPop({oneProd}) {





    return(
        <div className={css.musicWrap}>
 <audio controls>
          <source src={oneProd} type="audio/mpeg" />
          Ваш браузер не підтримує відтворення аудіо.
        </audio>
        </div>
       
    )
}