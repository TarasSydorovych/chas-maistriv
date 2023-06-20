import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import {auth, db} from '../../firebase'


const hokBlog = (WrappedComponent) => {
    const HokBlog = (props) => {
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
  
      return <WrappedComponent blogData={blogData} {...props} />;
    };
  
    return HokBlog;
  };
  
  export default hokBlog;