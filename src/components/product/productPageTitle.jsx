import css from './product.module.css'
import icon from '../../img/productPageImg.png'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/smallProductLike.svg';
import iconSrcCard from '../../svg/smallProductCard.svg';
import audio from '../../svg/audioSvg.svg'
import arrow from '../../img/arrowToSvg.png'
import autorPic from '../../img/productAutorPic.png'

export default function ProductPageTitle() {




    return(
        <div className={css.productPageTitleWrap}>
             <div className={css.productPicWrap}>
                <div className={css.imgWrap}>
<img src={icon} className={css.icon}/>
<div className={css.new}>Новинка</div>
<div className={css.laureat}>Лауреат Корнійчуковської премії</div>
</div>
<div className={css.iconWithPrice}>

<div className={css.rombWrap}>
<div className={css.rombWrapRotate}>
<p className='salePriceCartBigProd'>203</p>
<p className='fullPriceCartBigProd'>грн</p>
</div>
</div>
<div className={css.wrapIconAu}>
<div className='likeProductBig'>
<HandySvg 
        src={iconSrc}
        width="34"
height="31"
        />
</div>
<div className='likeProductBig'>
<HandySvg 
        src={iconSrcCard}
        width="28.33"
height="28.33"
        />
</div>
<div className={css.audioBook}>
<HandySvg 
        src={audio}
        width="36.24"
height="28"
        />
        
        <img src={arrow} />
</div>

</div>
</div>

             </div>
             <div className={css.productTitleWrap}>
                <h1 className={css.nameBook}>Булава Іллі Муромця</h1>
                <div className={css.wrapHud}>
                <p className={css.autor}>Автор:&nbsp;<span className={css.autorNameSpan}>Юрій Лігуна&nbsp;</span><span className={css.autorDesc}>- мега-мозок, християнин, знаток теорії літератури, майстер слова</span></p>
                <p className={css.autor}>Художник:&nbsp;<span className={css.autorNameSpan}>Олександра Продана&nbsp;</span><span className={css.autorDesc}>- майстер іллюстрації, реаліст, графік, захоплюється історією</span></p>
                </div>
               <div className={css.powerWrap}>
                <p className={css.power}>Сила</p>
                <p className={css.powerDesc}>Без віри, життя позбавлене дива, без дива не здійснити подвига
                
                </p>
                <br/>
                </div>
               <p className={css.opusBook}> Під час зимових свят у кожній оселі, де є діти, таємничим чином з’являються подарунки. Звідки ж вони беруться? Ця книжка може стати першим поясненням такої дивовижної події для маленьких чомучок, бо...Передусім це переказ знаменитого вірша Клемента Кларка Мура «Ніч проти Різдва». Саме в цьому творі Санта-Клаус уперше постав таким, яким його знає і любить увесь англомовний світ. Маленький вірш справив величезний вплив на святкові традиції — і це справжня дивовижа. Друга дивовижа — атмосферні малюнки Кріса Данна. Третя дивовижа банальна, але важлива для найменших — це те, що героями переказу стали звірі.</p>
                
                <div className={css.comentAutorWrap}>
<div className={css.autorPicWrap}>
<div className={css.autorPic}>
<div className={css.autorPicRotate}>
<img src={autorPic} />

</div>
</div>
<h3 className={css.autorNameInComment}>
Коментар автора<br/><span className={css.autorNameInCommentSpan}>Юрія Лігуна</span> 
</h3>
</div>
<div className={css.commentAndMoreWrapp}>
<p className={css.comment}>Ця книга пренесе у ваш дім диво перед зимовими святами. Лови мудрість книги! Герої допоможуть</p>
<h3 className={css.moreBooks}>Ще книги автора</h3>

</div>



                </div>


             </div>
        </div>
    )
}