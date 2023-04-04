
import imgBlog from '../../img/blogimg.png'









export default function MainPageBlog() {




    return(
        
        <div className="mainPageBlogWrap">
<h2 className="mainPageBlogH2">
    Блог
</h2>
<div className="blogList">
    <div className="publishListWrap">
      <div className="blogProdPage">
         <div className="vidoPic">
            <img src={imgBlog} className="vidoPicImg"/>
         </div>
         <h3 className='nameBlog'>
         Як зробити щоб дитина читала?
         </h3>
<p className='descriptionBlogSmall'>
Наші митці дослідили це питання і допоможуть вам вирішити цю проблему. Пргнемо щоб діти читали більше
</p>

      </div>


      <div className="blogProdPage">
         <div className="vidoPic">
            <img src={imgBlog} className="vidoPicImg"/>
         </div>
         <h3 className='nameBlog'>
         Ігри в читанні. Як правильно залучити дитину до читання
         </h3>
<p className='descriptionBlogSmall'>
Наші митці дослідили це питання і допоможуть вам вирішити цю проблему. Пргнемо щоб діти читали більше
</p>

      </div>


      <div className="blogProdPage">
         <div className="vidoPic">
            <img src={imgBlog} className="vidoPicImg"/>
         </div>
         <h3 className='nameBlog'>
         Читання з малюками
         </h3>
<p className='descriptionBlogSmall'>
Наші митці дослідили це питання і допоможуть вам вирішити цю проблему. Пргнемо щоб діти читали більше
</p>

      </div>

    </div>
    <button className='moreBlogBut'>
        Більше
    </button>
</div>
        </div>
    )
}