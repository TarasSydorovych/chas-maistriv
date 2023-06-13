import css from './blog.module.css'
import BlogTitle from './blogTitle'
import BlogView from './blogView'
import {auth, db} from '../../firebase'
import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

import YouLikeIt from '../catalog/youLikeIt'


export default function Blog() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const q = query(collection(db, 'blog'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
  
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        console.log(data);
        setBlogData(data);
      };
  
      fetchData();
    }, []);



    return(
        <div>
            <BlogTitle/>
            <BlogView blogData={blogData}/>
            <YouLikeIt/>
        </div>
    )
}