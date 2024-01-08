import React, {useEffect, useState} from 'react'
import WordSelect from './WordSelect';
import { useDispatch } from 'react-redux';
import { setAnswer, clear } from '../../redux/answer';
import { clearAnswerArray } from '../../redux/answerarray'

function WordsSelect({question}) {
    const [words, setWords] = useState([])
    const[tempAnswer, setTempAnswer] = useState([])
   
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clear())
        dispatch(clearAnswerArray())
    },[dispatch])

    useEffect(() => {
    const temp_arr = question.sentence.split(' ');
    let my_arr = []
    
    temp_arr.forEach( word => { 
        if(word.indexOf('.') >= 0 ) { 
                my_arr.push(word.slice(0, -1))
                my_arr.push('.') 
        }
        else if (word.indexOf(',') >= 0) {
            my_arr.push(word.slice(0, -1))
            my_arr.push(',') 
        }
        else if (word.indexOf('?') >= 0) {
            my_arr.push(word.slice(0, -1))
            my_arr.push('?') 
        }
        else if (word.indexOf('!') >= 0) {
            my_arr.push(word.slice(0, -1))
            my_arr.push('!') 
        }
        else {
                my_arr.push(word)
        }
    })


    let my_arr1 = []
    for (var i=0; i < my_arr.length; i++) { 
        let word = my_arr[i]
        let pair = {}
        if (i < (my_arr.length-1)) {
            pair.word = word
            pair.next_word = my_arr[i+1]
        }
        else {
            pair.word = word
            //pair.next_word = "non"
        }
        my_arr1.push(pair)
    }
    setWords(my_arr1)
    },[question.sentence])
    

    function addAWordToAnswer(word) {
        setTempAnswer(tempAnswer => [...tempAnswer, word])
        let temp_str = tempAnswer.join('/')
        dispatch(setAnswer(temp_str))
     }

     function removeAWordFromAnswer(word) {
        setTempAnswer(tempAnswer.splice(tempAnswer.findIndex(e => e === word ),1))
        let temp_str = tempAnswer.join('/')
        dispatch(setAnswer(temp_str))
     }

    return (
        <>
        <div>
            {
                words.map((pair, index) => {
                    return <WordSelect key = {index} pair ={pair} addWordToAnswer={addAWordToAnswer} removeWordFromAnswer={removeAWordFromAnswer}/>
                })
            }
        </div>
        </>
    );

}

export default WordsSelect