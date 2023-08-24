
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/Rectangle.svg';
import withFirebaseCollection from '../../HOK/withFirebaseCollection';


const Sun = ({data}) => {



    return(
      
       <div className="sunWrap">
        {data.length > 0 &&
        <>
  <span className='spanFast'>Незабаром!&nbsp; </span><p className='pFast'>{data[0].soon}</p>
  </>
}
       </div>
    )
}
export default withFirebaseCollection('seo')(Sun);