
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/phone.svg';


export default function Number() {



    return(
     
        <a className='phoneHref' href="tel:+380672315737">
      <div className='numberWrap'>
         <HandySvg 
                    src={iconSrc}
                    width="18"
        height="16.37"
                    />
                    <p className='phoneNumber'>
                   +38&nbsp;067&nbsp;231&nbsp;57&nbsp;37
                    </p>
      </div>
      </a>
  
  
    )
}