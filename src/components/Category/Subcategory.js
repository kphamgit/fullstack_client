import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Subcategory({id}) {

  const [post, setPost] = useState([]);
  console.log(" 1) in subcate... id ="+id)
  const url = "http://localhost:5000/api/subcategories/"+id
  console.log(" 2) in subcate... url ="+url)
  useEffect(() => {
    console.log(" 3) in sub_cat useEffect. About to call axios")
    axios.get(url).then((response) => {
      console.log(' 4) subcate useEffect get response data=',response.data)
      setPost(response.data);
    });
  }, [url]);
  
  console.log("5) in sub_cat post = ", post)
  return(
    <>
    <h2>In sub category </h2>
    <h2>{post.test}</h2>
    </>
  );
}