import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import css from './userCabinet.module.css'
import authPic from '../../img/userPic.png'
import iconProp from '../../img/iconProp.png'
import Group16 from '../../img/Group16.png'
import facForUs from '../../img/facForUs.png'
import mailForSoc from '../../img/mailForSoc.png'
import tgUser from '../../img/tgUser.png'
import whatUser from '../../img/whatUser.png'
import { useState } from "react";
import WaitProd from "./waitProd";
import discIcon from '../../img/discIcon.png'
import elefant from '../../img/elefant.png'
import ViewProductCatalog from "../catalog/viewProductCatalog";
export default function UserCabinet({products, setAddressChanged, addressChanged}) {


    const [selectedText, setSelectedText] = useState('');
    
    const handleBlockClick = (text) => {
      setSelectedText(text);
    };
  
    const blocks = [
      { id: 1, text: 'Очікувані замовлення' },
      { id: 2, text: 'Чекають опрацювання' },
      { id: 3, text: 'Бажане' },
    ];
   

    return(
        <div>
            <Header/>
<div className={css.bleuLabel}>
<div className={css.blueLabelWnutr}>
<p className={css.firstTextInBlock}>Наша місія — допомогти батькам ростити дітей людьми, які вміють бути щасливими</p>
<p className={css.firstTextInBlock}>Наша мета — створювати якісні дитячі книги, від яких важко відірватися, та які збагачують.</p>
</div>

</div>


<div className={css.userInformationWrap}>
    <div className={css.userInformationWrapSmall}>
        <div className={css.yourInformation}>
<div className={css.userData}>
<div className={css.imgAutorWrapSmall}>
           
           <img src={authPic} className={css.imgAutorSmall}/>
           </div>
           <div className={css.nameAndPropWr}>
            <h4 className={css.userNameHello}>Олено Іванівно, вітаємо!</h4>
            <div className={css.propWrap}>
                <img src={iconProp}/>
                <p className={css.propP}>Налаштування</p>
            </div>
           </div>
</div>

<img src={Group16} className={css.iconPicBird}/>

        </div>
        <div className={css.ourInformation}>
<h4 className={css.yourRegistration}>Ви зареєстровані як член клуба “Час майстрів”</h4>
<p className={css.yourDescription}>Це дає вам знижки та доступ до коментів, а також ви потрапляєте під роздачу слонів (бонусів), можете брати участь в опікунських радах і тестуванні книг, впливати на вибір обкладинок, назв текстів та обговорювати злободенні питання. Якщо ви довіряєте нам як спеціалістам у виборі та створенні дитячої книги, запрошуємо вас встановити з нами прямий контакт через імейл, вайбер, телеграм, або вотсап. Приєднуйтесь до спільноти поціновувачів книжок, підписавшись на наші соцмережі. Настав Час майстрів.</p>
<div className={css.socialWrap}>
<a href='https://www.facebook.com/chasmaistriv' target="_blanck">
    <div className={css.standartsocial}>
    <img src={facForUs} />
    </div>
    </a>
    <a href="mailto:sales@chasmaistriv.com.ua" target="_blanck">
    <div className={css.standartsocial}>
    <img src={mailForSoc} />
    </div>
    </a>
    <a href='https://t.me/chasmaistriv_bot' target="_blanck">
    <div className={css.standartsocial}>
    <img src={tgUser} />
    </div>
    </a>
    <a href="https://wa.me/+380672315737" target="_blanck">
    <div className={css.standartsocial}>
    <img src={whatUser} />
    </div>
    </a>
</div>
        </div>
    </div>
</div>


<div className={css.orderingProductWrap}>
<div className={css.orderingProductWrapSmall}>
    <div className={css.wrapLab}>
    {blocks.map((block) => (
        <div
          key={block.id}
          className={`${css.block} ${block.id === selectedText ? css.selected : ''}`}
          onClick={() => handleBlockClick(block.id)}
        >
          {block.text}
        </div>
      ))}
</div>

<div className={css.waitOrderInPostWrap}>
    <WaitProd/>
    <WaitProd/>
    <WaitProd/>
    
</div>
</div>



</div>


<div className={css.yourDiscountWrap}>
    <div className={css.yourDiscountWrapSmall}>
        <div className={css.dicsTextWr}>
            <p className={css.yourDicrFive}>Ваша знижка*<br/><span className={css.yourDicrFiveSpan}>5%</span></p>
            <p className={css.yourDicrFiveSmall}>До знижки не додаються акції, розпродаж, предпродаж </p>
        </div>
        <img src={discIcon} className={css.discIconIc}/>
        <div className={css.buttonConfFRW}>
            <p className={css.confirmP}>Запросити друга</p>
            <div className={css.likeButton}>Запросити</div>
        </div>
    </div>

</div>


<div className={css.elefantWrap}>
    <div className={css.elefantWrapSmall}>
        <div className={css.elef}>
<img src={elefant} className={css.elefant}/>
<p className={css.howMathElefant}>Ваші слони (бонуси) <br/><span className={css.howMathElefantSpan}>135</span></p>
        </div>
        <p className={css.elefantDescription}>Ви можете <br/> сплачувати слонами<br/> за наші книги<br/> курс <span className={css.elefantDescriptionSpan}>1 Слон = 1 Грн</span></p>
    </div>
</div>
<ViewProductCatalog products={products} setAddressChanged={setAddressChanged}/>


<Footer/>
        </div>
    )
}