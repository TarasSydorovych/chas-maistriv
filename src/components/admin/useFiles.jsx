import { useState } from "react";
import css from "./adm.module.css";
import ProductListEditor from "./photoEditor";
import HeroFotoEditor from "./heroFotoEditor";
import AudioEditor from "./audioEditor";
import PdfEditor from "./pdfEditor";
const UseFiles = () => {
  const [changeFoto, setChangeFoto] = useState(false);
  const [changeFotoHero, setChangeFotoHero] = useState(false);
  const [changeAudio, setChangeAudio] = useState(false);
  const [changePdf, setChangePdf] = useState(false);
  const foto = () => {
    setChangeFoto(!changeFoto);
    setChangeFotoHero(false);
    setChangeAudio(false);
    setChangePdf(false);
  };
  const fotoHero = () => {
    setChangeFoto(false);
    setChangeFotoHero(!changeFotoHero);
    setChangeAudio(false);
    setChangePdf(false);
  };
  const audio = () => {
    setChangeFoto(false);
    setChangeFotoHero(false);
    setChangeAudio(!changeAudio);
    setChangePdf(false);
  };
  const pdf = () => {
    setChangeFoto(false);
    setChangeFotoHero(false);
    setChangeAudio(false);
    setChangePdf(!changePdf);
  };
  return (
    <section className={css.changeFotoWrap}>
      <div className={css.buttonWrap}>
        <button onClick={foto}>Змінити фото</button>
        <button onClick={fotoHero}>Змінити фото героя</button>
        <button onClick={audio}>Змінити аудіо</button>
        <button onClick={pdf}>Змінити pdf</button>
      </div>
      {changeFoto && <ProductListEditor />}
      {changeFotoHero && <HeroFotoEditor />}
      {changeAudio && <AudioEditor />}
      {changePdf && <PdfEditor />}
    </section>
  );
};
export default UseFiles;
