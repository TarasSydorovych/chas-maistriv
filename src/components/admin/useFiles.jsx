import { useState } from "react";
import css from "./adm.module.css";
import ProductListEditor from "./photoEditor";
import HeroFotoEditor from "./heroFotoEditor";
import AudioEditor from "./audioEditor";
import PdfEditor from "./pdfEditor";
import AuthorFotoEditor from "./authorFotoEditor";
const UseFiles = () => {
  const [changeFoto, setChangeFoto] = useState(false);
  const [changeFotoHero, setChangeFotoHero] = useState(false);
  const [changeAudio, setChangeAudio] = useState(false);
  const [changePdf, setChangePdf] = useState(false);
  const [changeAutorPhoto, setChangeAutorPhoto] = useState(false);
  const foto = () => {
    setChangeFoto(!changeFoto);
    setChangeFotoHero(false);
    setChangeAudio(false);
    setChangePdf(false);
    setChangeAutorPhoto(false);
  };
  const fotoHero = () => {
    setChangeFoto(false);
    setChangeFotoHero(!changeFotoHero);
    setChangeAudio(false);
    setChangePdf(false);
    setChangeAutorPhoto(false);
  };
  const audio = () => {
    setChangeFoto(false);
    setChangeFotoHero(false);
    setChangeAudio(!changeAudio);
    setChangePdf(false);
    setChangeAutorPhoto(false);
  };
  const pdf = () => {
    setChangeFoto(false);
    setChangeFotoHero(false);
    setChangeAudio(false);
    setChangePdf(!changePdf);
    setChangeAutorPhoto(false);
  };
  const autor = () => {
    setChangeFoto(false);
    setChangeFotoHero(false);
    setChangeAudio(false);
    setChangePdf(false);
    setChangeAutorPhoto(!changeAutorPhoto);
  };
  return (
    <section className={css.changeFotoWrap}>
      <div className={css.buttonWrap}>
        <button onClick={foto}>Змінити фото</button>
        <button onClick={fotoHero}>Змінити фото героя</button>
        <button onClick={audio}>Змінити аудіо</button>
        <button onClick={pdf}>Змінити pdf</button>
        <button onClick={autor}>Змінити фото автора</button>
      </div>
      {changeFoto && <ProductListEditor />}
      {changeFotoHero && <HeroFotoEditor />}
      {changeAudio && <AudioEditor />}
      {changePdf && <PdfEditor />}
      {changeAutorPhoto && <AuthorFotoEditor />}
    </section>
  );
};
export default UseFiles;
