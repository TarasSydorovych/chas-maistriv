import css from './blog.module.css'
import BlogTitle from './blogTitle'
import BlogView from './blogView'
import YouLikeIt from '../catalog/youLikeIt'
import hokBlog from '../HOK/hokBlog';

const Blog = ({blogData}) => {
 

    return(
        <div>
            <BlogTitle/>
            {blogData &&
            <BlogView blogData={blogData}/>
          }
            <YouLikeIt/>
        </div>
    )
}
export default hokBlog(Blog)