import css from "./userCabinet.module.css";
import picprodff from "../../img/picprodff.png";
import addToCart from "../../function/addToCard";
import { useNavigate } from "react-router-dom";
import transliterate from "../../function/transliterate";
export default function WaitProdLike({ tovar, setCartCounterC }) {
  const navigate = useNavigate();
  const addingToCart = (id) => {
    addToCart(id);
  };
  const sendToF = () => {
    navigate(`/product/${transliterate(tovar.bookName)}`);
  };
  return (
    <div className={css.prodInWrap}>
      <img src={tovar.imageList[0]} className={css.picProd} />
      <h1 className={css.bookName} onClick={sendToF}>
        {tovar.bookName}
      </h1>
      <div
        className={css.deliveryInform}
        onClick={() => addingToCart(tovar.uid)}
      >
        ДОДАТИ ДО КОШИКА{" "}
      </div>
    </div>
  );
}
