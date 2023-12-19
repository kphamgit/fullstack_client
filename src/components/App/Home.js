import React from 'react'
import { useDispatch } from 'react-redux'
//import { setSubcategory } from '../../redux/subcategory'
import {clear }  from '../../redux/subcategory'

function Home() {
  const dispatch = useDispatch()
  dispatch(clear())
  return (
    <h1>Home</h1>
  )
}

export default Home