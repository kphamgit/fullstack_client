import React, {useEffect, useState} from 'react'
import WordSelect from './WordSelect';
import { useSelector } from 'react-redux';


function WordsSelect({question}) {
    const answer = useSelector((state) => state.answer.value)
    const [words, setWords] = useState([])
    const sentence = 'The sky is blue, and I am happy. Is the grass green? The stop sign is red!'

    useEffect(() => {
    const temp_arr = sentence.split(' ');
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
            //let next_word = my_arr[i+1]
            pair.word = word
            pair.next_word = my_arr[i+1]
        }
        else {
            pair.word = word
            pair.next_word = "non"
        }
        my_arr1.push(pair)
    }

    setWords(my_arr1)
    },[])
    
    return (
        <>
        <div>
            {
                words.map((pair, index) => {
                    return <WordSelect key = {index} pair ={pair} />
                })
            }
        </div>
        <div style={{color:"red"}}>{answer}</div>
        </>
    );

}

export default WordsSelect