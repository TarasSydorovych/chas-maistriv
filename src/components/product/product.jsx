import ViewProductCatalog from "../catalog/viewProductCatalog";
import YouLikeIt from "../catalog/youLikeIt";
import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import Description from "./description";
import Hero from "./hero";
import HeroPage from "./heroPage";
import ProductPageTitle from "./productPageTitle";
import Respons from "./respons";
import ResponsTextArea from "./responsTextArea";
import VideoBlock from "./videoBlock";
import WhyNeedRead from "./whyNeedRead";






export default function Product() {




    return(
        <>
        <Header/>
<ProductPageTitle/>
<Description/>
<WhyNeedRead/>
<VideoBlock/>

<Hero/>
<HeroPage/>
<Respons/>
<ResponsTextArea/>
<ViewProductCatalog/>
        <Footer/>
        </>
    )
}