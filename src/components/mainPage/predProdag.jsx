import pic from '../../img/predProd.png'
import arrow from '../../svg/arrow.svg';
import './mainPage.css'
import {HandySvg} from 'handy-svg';


export default function PredProdag() {




    return(

      <div className="predProdazWrap">
        <div className="imgPredProdag">
        <div className="imgRelDiv">
           <img src={pic} className="imgRelDivImg"/>
           <div className='prdeProdPricing'>
            <div className='prdeProdPricingRotate'>
            <p className='fullPrice'>290грн</p>
            <h2 className='salePrice'>203</h2>
            <p className='fullPrice'>грн</p>
            </div>
           </div>
        </div>
        </div>



        <div className="infoPredProdag">
            <div className='timerWrap'>
                <div className='redBlock'>
                    <h1>Предпродаж</h1>
                </div>
                <div className='timerBlue'>
                    <h2>Заллишилось</h2>
                    <div className='timer'>
                        <div className='time'>
                        <h1>1</h1>
                        <h2>День</h2>
                        </div>
                        <div className='time'>
                        <h1>12</h1>
                        <h2>Годин</h2>
                        </div>
                        <div className='time'>
                        <h1>54</h1>
                        <h2>Секунди</h2>
                        </div>
                    </div>
                </div>
            </div>
           
            <h1 className='nameBooks'> Маленький принц</h1>
            <div className='autorInform'>
                <div className='autorInformSection'>
                    <p>Автор:&nbsp;</p><h4>Сент - Екзюпері А.</h4>
                </div>
                <div className='autorInformSection'>
                    <p>Вік:&nbsp;</p><h4>10+</h4>
                </div>
                <div className='autorInformSection'>
                    <p>Художник:&nbsp;</p><h4>Сілівончик Г.</h4>
                </div>
            </div>
            <p className='descriptionBooks'>Під час зимових свят у кожній оселі, де є діти, таємничим чином з’являються подарунки. Звідки ж вони беруться? Ця книжка може стати першим поясненням такої дивовижної події для маленьких чомучок, бо...Передусім це переказ знаменитого вірша Клемента Кларка Мура «Ніч проти Різдва». Саме в цьому творі Санта-Клаус уперше постав таким, яким його знає і любить увесь англомовний світ. Маленький вірш справив величезний вплив на святкові традиції — і це справжня дивовижа. Друга дивовижа — атмосферні малюнки Кріса Данна. Третя дивовижа банальна, але важлива для найменших — це те, що героями переказу стали звірі. </p>
<div className='blockOrderBooksWrap'>
<button className='kOrderBooksPredButton'>
    Замовити
</button>


<HandySvg 
                    src={arrow}
                    className="arrovIconBanner"
                    width="52"
        height="49.56"
                    />
</div>


        </div>
      </div>
    )
}