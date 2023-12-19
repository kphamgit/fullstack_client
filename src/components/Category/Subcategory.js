import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Unit from './Unit';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setSubcategory } from '../../redux/subcategory';

export default function Subcategory({id, name}) {

  const rootpath = useSelector((state) => state.rootpath.value)
  const dispatch = useDispatch()
  dispatch(setSubcategory(name))

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
  //
  return(
    <>
    {post.units && <ul>
        {post.units.map((unit) =>  
              (<ListGroup key = {unit.id}>
                <Unit content={unit}/>
              </ListGroup> 
              )
          )}
      </ul>}
      </>
  );
}