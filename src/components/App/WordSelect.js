import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswer } from '../../redux/answer.js'

function WordSelect({pair}) {
    const [clickCount, setClickCount] = useState(0)
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch()
    
    const answer = useSelector((state) => state.answer.value)

   const handleMouseEnter = () => {
      setIsHover(true);
      //console.log("hover true")
   };
   const handleMouseLeave = () => {
      setIsHover(false);
      //console.log("hover false")
   };
   const wordStyle = {
       backgroundColor: isHover ? 'yellow' : (
        clickCount%2 == 0 ? '#e6d3c3' : 'lightblue'
       ),
       padding: 0.5

   };

   
    const handleClick = (s) => {
      
        let new_clickCount = clickCount + 1
        setClickCount(new_clickCount)
        
        let aggregate_answer = answer + '/' + s
        dispatch(setAnswer(aggregate_answer))
    }
    

        return (
            <>
        <span onClick={() => handleClick(pair.word)}
        style={wordStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
    {pair.word}
    { ((pair.next_word !== '.') && (pair.next_word !== ',') && (pair.next_word !== '!')  && (pair.next_word !== '?') )  && <span>&nbsp;</span>}
    </span>  
    </>
        )
    
   
}

export default WordSelect