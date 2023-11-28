import zaVikom from "../../img/zavikom.png";

export default function VideoViewAge() {
  return (
    <div className="videoViewAgeWrap">
      <div className="vidoViewBlockVideo">
        <img src={zaVikom} className="zaVikomImg" alt={`video`} />
        <div className="playButton"></div>
      </div>
      <div className="zaVikomOpus">
        <h1 className="zaVikomOpusH1">
          Відеоогляди книги для дітей віком 3-4 роки
        </h1>
        <p className="zaVikomOpusP">
          Наші відеоогляди допоможуть вам ближче познайомитися з нашими книгами
          та обрати саме ті, які будуть вам найближче до душі! Цей відеооглад
          допоможе обрати книгу саме для 3х та 4х річок.
        </p>
        <button className="zaVikomOpusButton">Відеоогляд за віком</button>
      </div>
    </div>
  );
}
