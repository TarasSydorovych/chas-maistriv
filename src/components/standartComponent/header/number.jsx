import { HandySvg } from "handy-svg";
import iconSrc from "../../../svg/phone.svg";
// import arrowDownHeaderContact from "../../../svg/arrowDownHeaderContact.svg";
import arrowDownHeaderContact from "../../../img/arrowDownHeaderContact.png";
import viberSvgContactPop from "../../../svg/viberSvgContactPop.svg";
import telegramOpenL from "../../../svg/telegramOpenL.svg";
import mailOpenL from "../../../svg/mailOpenL.svg";
import mailPng from "../../../img/mail-1.png";
import phoneOpenL from "../../../svg/phoneOpenL.svg";
import { useState } from "react";
export default function Number() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    //   <a className='phoneHref' href="tel:+380672315737">
    // <div className='numberWrap'>
    //    <HandySvg
    //               src={iconSrc}
    //               width="18"
    //   height="16.37"
    //               />
    //               <p className='phoneNumber'>
    //              +38&nbsp;067&nbsp;231&nbsp;57&nbsp;37
    //               </p>
    // </div>
    // </a>
    <div
      className="wrapAllConnectInMenuHeader"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="wrapConnectMenu">
        <HandySvg src={iconSrc} width="18" height="16.37" />
        <p className="connectPinHeader">Зв’яжіться з нами</p>
        <img src={arrowDownHeaderContact} className="arrowDownHeaderContact" />
      </div>
      {isHovered && (
        <div className="wrapAllContacWhaTelVib">
          <a href="tel:+380508893545" className="linkViberOr">
            <div className="wrapNumberWithIconCon">
              <HandySvg src={viberSvgContactPop} width="21" height="22" />
              <p className="connectToViberA">Зв’затися у Viber</p>
            </div>
          </a>
          <a
            href="https://www.facebook.com/chasmaistriv"
            className="linkViberOr"
          >
            <div className="wrapNumberWithIconCon">
              <HandySvg src={telegramOpenL} width="21" height="22" />
              <p className="connectToViberA">Зв’затися у Telegram</p>
            </div>
          </a>
          <a href="mailto:sales@chasmaistriv.com.ua" className="linkViberOr">
            <div className="wrapNumberWithIconCon">
              <img src={mailPng} alt="img" className="mailPhotoSvg" />
              <p className="connectToViberA">Зв’язатися у Mail</p>
            </div>
          </a>
          <a href="tel:+380508893545" className="linkViberOr">
            <div className="wrapNumberWithIconCon">
              <HandySvg src={phoneOpenL} width="21" height="22" />
              <p className="connectToViberA">+38 050 88 93 545</p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
