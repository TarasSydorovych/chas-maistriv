import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import CatalogProductComponent from "../standartComponent/productComponent/catalogProductComponent";
import Filter from "./filter";
import FirstBlockCat from "./firstBlockCat";
import YouLikeIt from "./youLikeIt";
import '../standartComponent/productComponent/productStyle.css'
import DiscountAndAction from "./discountAndAction";
import ViewProductCatalog from "./viewProductCatalog";





export default function Catalog() {



    return(
        <>
        <Header/>
        <Filter/>
        <FirstBlockCat/>
        <CatalogProductComponent/>
        <CatalogProductComponent/>
        <YouLikeIt/>
        <DiscountAndAction/>
        <ViewProductCatalog/>
        <Footer/>
        </>
    )
}