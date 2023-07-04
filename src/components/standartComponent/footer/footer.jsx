import FooterBottom from "./footerBottom";
import FooterCenter from "./footerCenter";
import FooterUp from "./footerUp";





export default function Footer({windowDimensions}) {




    return(
        <footer>
            <FooterUp/>
            <FooterCenter/>
            <FooterBottom windowDimensions={windowDimensions}/>
        </footer>
    )
}