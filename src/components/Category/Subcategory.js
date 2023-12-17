import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import { sub_categories } from '../../../../../server/models';
import Unit from './Unit';
import { useSelector } from 'react-redux';

export default function Subcategory({id}) {

  const rootpath = useSelector((state) => state.rootpath.value)

  const [post, setPost] = useState([]);
  //console.log(" 1) in subcate... id ="+id)
  console.log("in sub_cat HERE")
  const url = rootpath + "/" + "api/sub_categories" + '/' +id
  console.log(" 2) in subcate... url ="+url)
  useEffect(() => {
    console.log(" 3) in sub_cat useEffect. About to call axios")
    axios.get(url).then((response) => {
      console.log(' 4) subcate useEffect get response data=',response.data)
      setPost(response.data);
      console.log("5) in sub_cat response data = ", response.data)
    });
  }, [url]);

  console.log("6) in sub_cat post = ", post)
  
  const links = [{id: 1, name: 'Google'},
      {id: 2, name: 'Facebook'}
  ]
  //
  return(
    <>

      {post.units && <ul>
        {post.units.map((unit) =>  
              (<li key = {unit.id}>
                <Unit content={unit}/>
              </li> 
              )
          )}
      </ul>}
      </>
  );
}