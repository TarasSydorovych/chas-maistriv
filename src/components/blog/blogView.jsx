import css from "./blog.module.css";
import YouTube from "react-youtube";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BlogView({ blogData, windowDimensions }) {
  const [showCount, setShowCount] = useState(6);

  const handleShowMore = () => {
    setShowCount((prevCount) => prevCount + 6);
  };

  return (
    <div className={css.bigVideoWrap}>
      {blogData.length > 0 && (
        <div className={css.bigVideoWrapSmall}>
          <div className={css.bigWrap}>
            {windowDimensions && (
              <img className={css.bigImgBlog} src={blogData[0].photo} />
            )}
            {!windowDimensions && (
              <img className={css.bigImgBlog} src={blogData[0].photo} />
            )}

            <div className={css.someTextWrap}>
              <Link
                to={`/blog/${blogData[0].uid}`}
                className={css.videoViewvH1}
              >
                {blogData[0].zag}
              </Link>
              <p className={css.bigVideoP}>{blogData[0].chortDesc}</p>
            </div>
          </div>
          <div className={css.smallVideoWrap}>
            <div className={css.smallvidelListWrap}>
              {blogData.map((el, index) => {
                if (index < showCount) {
                  return (
                    <div key={index} className={css.smalVideoPro}>
                      {windowDimensions && (
                        <div className={css.imgWrapBorder}>
                          <Link to={`/blog/${el.uid}`}>
                            <img src={el.photo} className={css.smallImgBlog} />
                          </Link>
                        </div>
                      )}
                      {!windowDimensions && (
                        <div className={css.imgWrapBorder}>
                          <img src={el.photo} className={css.smallImgBlog} />
                        </div>
                      )}
                      <Link to={`/blog/${el.uid}`} className={css.videoName}>
                        {el.zag}
                      </Link>
                      <p className={css.videoNameDesc}>{el.chortDesc}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          {showCount < blogData.length && (
            <button className={css.mareVideo} onClick={handleShowMore}>
              Більше статей
            </button>
          )}
        </div>
      )}
    </div>
  );
}
