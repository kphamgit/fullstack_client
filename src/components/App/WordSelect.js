import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswerArray } from '../../redux/answerarray.js'

function WordSelect({pair, addWordToAnswer, removeWordFromAnswer}) {
    const [clickCount, setClickCount] = useState(0)
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch()
    
    const answerarray = useSelector((state) => state.answerarray.value)

   const handleMouseEnter = () => {
      setIsHover(true);
   };
   const handleMouseLeave = () => {
      setIsHover(false);
   };
   const wordStyle = {
       backgroundColor: (
         clickCount%2 == 0 ? '#e6d3c3' : 'lightblue'
        ),
       textDecoration: isHover && "underline #4b85bf" ,
       textDecorationThickness:  isHover && '2px',
       textDecorationSkipInk: 'none',
       padding: 0.5,
       userSelect: 'none'

   };

    const handleClick = (word) => {
        let new_clickCount = clickCount + 1
        setClickCount(new_clickCount)
        if (clickCount%2 == 0) {
            dispatch(setAnswerArray([...answerarray, word]))
        }
        else {
            let word_index = answerarray.findIndex(e => e === word )
            dispatch(setAnswerArray(answerarray.filter((word, idx) => idx !== word_index)) )
        }
 
    }
    
        return (
            <>
        <span onClick={() => handleClick(pair.word)}
        style={wordStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
    {pair.word}
    </span>
    { ((pair.next_word !== '.') && (pair.next_word !== ',') 
            && (pair.next_word !== '!')  
             && (pair.next_word !== '?') )  
                && <span>&nbsp;</span>} 
    </>
        )
    
   
}

export default WordSelect