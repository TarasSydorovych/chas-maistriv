import React, { useEffect, useState } from "react";
import css from "./videoView.module.css";
import YouTube from "react-youtube";
import transliterate from "../../function/transliterate";

const YouBinIntr = ({ windowDimensions, data }) => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    // Перевірка, чи data визначена і є масивом
    if (!data || !Array.isArray(data)) {
      console.error("Data is undefined or not an array");
      return;
    }

    // Отримуємо масиви з localStorage
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    const visitedProducts =
      JSON.parse(localStorage.getItem("visitedProducts")) || [];

    // Створюємо новий масив, що містить всі елементи з likedProducts
    const combinedProducts = [...likedProducts];

    // Додаємо до масиву тільки ті елементи з visitedProducts, яких немає в likedProducts
    visitedProducts.forEach((item) => {
      const isDuplicate = likedProducts.some(
        (likedItem) => likedItem.uid === item.uid
      );
      if (!isDuplicate) {
        combinedProducts.push(item);
      }
    });

    // Відбираємо відео з масиву data, які відповідають товарам із об'єднаного масиву
    const selectedVideos = data.filter((video) =>
      combinedProducts.some((product) => product === video.book_uid)
    );

    setRecommendedVideos(selectedVideos);
  }, [data]);

  return (
    <div className={css.smallVideoWrap}>
      <h1 className={css.smallWrapH1}>Вам буде цікаво</h1>
      <div className={css.smallvidelListWrap}>
        {recommendedVideos.length > 0 ? (
          recommendedVideos.map((video, index) => (
            <div key={index} className={css.smalVideoPro}>
              <YouTube
                videoId={video.videoId}
                opts={{
                  width: windowDimensions ? "376px" : "290px",
                  height: windowDimensions ? "224px" : "200px",
                }}
              />
              <p className={css.videoName}>{video.videoName}</p>
            </div>
          ))
        ) : (
          <p>Немає рекомендованих відео.</p>
        )}
      </div>
    </div>
  );
};

export default YouBinIntr;
