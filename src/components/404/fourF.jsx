import css from "./fourF.module.css";
import pic from "../../img/Group1665.png";
import { Link } from "react-router-dom";
export default function FourF() {
  return (
    <section className={css.wrap}>
      <img src={pic} alt="404" className={css.fours} />
      <p className={css.pfor}>Ця сторінка, нажаль, не працює</p>
      <Link to="/" className={css.linkGFi}>
        Повернутись на головну
      </Link>
    </section>
  );
}
