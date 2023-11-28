import imgBlog from "../../img/blogimg.png";
import hokBlog from "../HOK/hokBlog";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
const MainPageBlog = ({ blogData }) => {
  return (
    <div className="mainPageBlogWrap">
      <h2 className="mainPageBlogH2">Блог</h2>
      <div className="blogList">
        {blogData.length > 0 && (
          <div className="publishListWrap">
            {blogData.map((el, index) => {
              if (index < 3) {
                return (
                  <div key={index} className="blogProdPage">
                    <div className="vidoPic">
                      <img
                        src={el.photo}
                        className="blogFotoInMain"
                        alt={`blog`}
                      />
                    </div>
                    <h3 className="nameBlog">{el.zag}</h3>
                    <p className="descriptionBlogSmall">{el.chortDesc}</p>
                  </div>
                );
              }
            })}
          </div>
        )}

        <button className="moreBlogBut">
          <Link className="moreBlogBut" to="/blog">
            Більше
          </Link>
        </button>
      </div>
    </div>
  );
};
export default hokBlog(MainPageBlog);
