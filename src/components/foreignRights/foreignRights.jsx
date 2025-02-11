import Banner from "./banner";
import css from "./foreignRights.module.css";
import bigPhotoForForeight from "../../img/bigPhotoForForeight.png";
import forLocationsForei from "../../img/forLocationsForei.png";
import facceForForeight from "../../img/facceForForeight.png";
import mailForForeight from "../../img/mailForForeight.png";
import tgForForeight from "../../img/tgForForeight.png";
const ForeignRights = () => {
  return (
    <div className={css.wrapForeight}>
      <Banner />
      <img
        src={bigPhotoForForeight}
        className={css.bigPhotoForForeight}
        alt="Фото"
      />
      <div className={css.wrpaBlockForTxt}>
        <div className={css.withButtonm}>
          <p className={css.bigTetIn}>
            Illustrations for a classic book, world best раджу: World best
            illustrations for classic books
          </p>
        </div>
        <p className={css.pIndescNotBan}>
          Our mission is to create innovative books for children as part of the
          environment of love, that special setting where children are helped to
          form knowledge, intelligence, wisdom, and culture – resulting in a
          unique HUMAN PERSON. Children are people, yet small now, but who will
          very soon be shaping the future of mankind. Every day we learn, grow
          in wisdom, open ourselves to life itself, giving us a love to create
          books which are needed in the world now.
          <br />
          <span className={css.spanInNotBanner}>
            Location: Kyiv, UKRAINE
            <br /> Year established: 1999
            <br /> Focus: literature for children, textbooks, popular science,
            educational literature
          </span>
        </p>
      </div>
      <div className={css.locations}>
        <img
          src={forLocationsForei}
          className={css.forLocationsForei}
          alt="Фото"
        />
        <div className={css.locationsInformations}>
          <p className={css.locationsPBig}>
            Location: Kyiv, UKRAINE
            <br /> Foreign rights manager: Alina Mekhed,
            <br />
            alina.mekhed@masterclassbook.com
          </p>
          <div className={css.wrapSocialIconDown}>
            <a
              href="https://www.facebook.com/chasmaistriv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facceForForeight}
                className={css.facceForForeight}
                alt="Facebook"
              />
            </a>
            <a href="mailto:alina.mekhed@masterclassbook.com">
              <img
                src={mailForForeight}
                className={css.facceForForeight}
                alt="Email"
              />
            </a>
            <a
              href="https://t.me/chas_maistriv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={tgForForeight}
                className={css.facceForForeight}
                alt="Telegram"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForeignRights;
