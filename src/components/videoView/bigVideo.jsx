import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from "./videoView.module.css";
import YouTube from "react-youtube";
import transliterate from "../../function/transliterate";
import YouBinIntr from "./youBinIntr";

export default function BigVideo({ windowDimensions, data }) {
  const [visibleVideos, setVisibleVideos] = useState(3); // Кількість відео, що відображаються

  const loadMoreVideos = () => {
    setVisibleVideos((prevVisibleVideos) => prevVisibleVideos + 3);
  };

  return (
    <div className={css.bigVideoWrap}>
      <div className={css.bigVideoWrapSmall}>
        {data &&
          data.slice(0, visibleVideos).map((el, index) => {
            // Відображаємо лише частину відео
            return (
              <div className={css.bigWrap} key={index}>
                {windowDimensions && (
                  <YouTube
                    videoId={`${el.videoId}`}
                    opts={{ width: "758px", height: "454px" }}
                  />
                )}
                {!windowDimensions && (
                  <YouTube
                    videoId={`${el.videoId}`}
                    opts={{ width: "300px", height: "200px" }}
                  />
                )}
                <div className={css.someTextWrap}>
                  {el && el.bookName && (
                    <Link
                      to={`/product/${transliterate(el.bookName)}`}
                      className={css.videoViewvH1}
                    >
                      {el.videoName}
                    </Link>
                  )}
                  {el && !el.bookName && (
                    <h1 className={css.videoViewvH1}>{el.videoName}</h1>
                  )}
                  <p className={css.bigVideoP}>{el.videoDesc}</p>
                </div>
              </div>
            );
          })}

        {visibleVideos < data.length && ( // Відображаємо кнопку, лише якщо є більше відео
          <button className={css.mareVideo} onClick={loadMoreVideos}>
            Більше відео
          </button>
        )}

        <YouBinIntr windowDimensions={windowDimensions} data={data} />
      </div>
    </div>
  );
}
