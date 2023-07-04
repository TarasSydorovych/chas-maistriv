import css from './blog.module.css'
import hokBlog from '../HOK/hokBlog';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import YouLikeIt from '../catalog/youLikeIt';

const BlogPage = ({blogData}) => {

    const { id } = useParams();
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const foundBlog = blogData.find((blog) => blog.uid === id);
        setSelectedBlog(foundBlog);
      }, [blogData, id]);

    return(
        <div className={css.blogWrapPage}>
 {selectedBlog ? (
        <div className={css.blogWrapPageSmall}> 
          <h1 className={css.blogWrapPageH1}>{selectedBlog.zag}</h1>
          <div className={css.wpaPicAbout}>
                    <p className={css.paragInWrap}>
                    {selectedBlog.chortDesc}
                    </p>
                    <div className={css.imgAboutWrap} >
                        <img src={selectedBlog.photo} className={css.imgAbout}/>
                    </div>
                </div>
                <p className={css.paragInWrapBig}>{selectedBlog.centrDesc}</p>
                {selectedBlog.videoId.length > 1 &&
                 <div className={css.wpaPicAbout}>
                     <div className={css.imgAboutWrapYou} >
                     <YouTube videoId={selectedBlog.videoId} className={css.youtube} opts={{ width: '600px', height: '400px' }} />
                 </div>
                 <p className={css.paragInWrapYou}>
                 {selectedBlog.longDesc}
                 </p>
                
             </div>
                }
                 {selectedBlog.videoId.length < 1 &&
                 <p className={css.paragInWrapBig}>{selectedBlog.longDesc}</p>
                 }
          {/* Додаткові поля блогу */}
          <YouLikeIt/>
        </div>
      ) : (
        <p>Завантаження блогу...</p>
      )}
        </div>
    )
}
export default hokBlog(BlogPage)