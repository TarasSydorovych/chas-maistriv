import picSmallProd from '../../img/smallProduct.png';
import './mainPage.css';
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/smallBlue.svg';
import iconSrc2 from '../../svg/icanicon.svg';
import authPic from '../../img/fotoAutor.png'

export default function BlockAutor() {



    return(
        <div className='blockAutorBig'>
            <div className='imgAutorWrap'>
           
           <img src={authPic} className="imgAutor"/>
           
           </div>
           <button className="allProdactAutor">
        Усі книги автора
        </button>
        <div className='blockAutorWrap'>
            
            
            <div className='infoAutor'>
                <h1 className='autorName'>
                Юрій Нікітінський
                </h1>
                <p className='autorDescription'>
                автор книжок, що малюють на вустах посмішку: «Будинок двірників», «Вовчик, який осідлав бомбу», «Страшенно-хуліганська книга» (у співавторстві з В.Кириченком), «Дивні пригоди (не)дивної вчительки» та ін.
                </p>
                <div className='autorYelowBlock'>
                    <p className='autorPYellow'>
                    Пише зазвичай з іронією і не дуже любить мандрувати вигаданими світами. Переважно дія його творів відбувається «тут» і «тепер», герої – сучасні дітлахи (але інколи – пінгвіни чи навіть Діди Морози). Він не публічна особа, не намагається активно рекламувати свою творчість, але вже чверть століття його тексти читають і люблять діти різного віку – від малечі до підлітків.
                    </p>
                    <div className='hvist'></div>
                </div>
                <h2 className='AllBooksAutorH2'>Книги автора</h2>
                <div className='abrakadabra'>



                <div className="productAutorWrapSM">
        <img src={picSmallProd} className="picSmallProdAutor"/>
        <h3 className='smalProdName'>
        Дивні пригоди (не) дивної вчительки
        </h3>
        <div className='smallProdIcon'>
            <div className='iconCartSMBlue'>
            <HandySvg 
                    src={iconSrc}
                    width="34"
        height="34"
                    />
            </div>
            <div className='iconCartSMGreen'>
            <HandySvg 
                    src={iconSrc2}
                    width="37"
        height="34"
                    />
</div>
        </div>
        </div>


        <div className="productAutorWrapSM">
        <img src={picSmallProd} className="picSmallProdAutor"/>
        <h3 className='smalProdName'>
        Дивні пригоди (не) дивної вчительки
        </h3>
        <div className='smallProdIcon'>
            <div className='iconCartSMBlue'>
            <HandySvg 
                    src={iconSrc}
                    width="34"
        height="34"
                    />
            </div>
            <div className='iconCartSMGreen'>
            <HandySvg 
                    src={iconSrc2}
                    width="37"
        height="34"
                    />
</div>
        </div>
        </div>
        
        <div className="productAutorWrapSM">
        <img src={picSmallProd} className="picSmallProdAutor"/>
        <h3 className='smalProdName'>
        Дивні пригоди (не) дивної вчительки
        </h3>
        <div className='smallProdIcon'>
            <div className='iconCartSMBlue'>
            <HandySvg 
                    src={iconSrc}
                    width="34"
        height="34"
                    />
            </div>
            <div className='iconCartSMGreen'>
            <HandySvg 
                    src={iconSrc2}
                    width="37"
        height="34"
                    />
</div>
        </div>
        </div>



                </div>
            </div>
        </div>
        </div>
    )
}