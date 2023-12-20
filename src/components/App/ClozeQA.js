import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function ClozeQuestionAttempt() {
 
    //console.log(" in ClozeQuestionAttempt component")
    const question = useSelector((state) => state.question.value)
    const [clozehtml, setClozehmtl] = useState('')
    //let questionhtml = format_cloze_question_content(question)
    useEffect( () => {
        //console.log("in ClozeQuestion...useEffect ****************question=", question)
        setClozehmtl(format_cloze_question_content(question))
    },[question])
    
    //const [questionhtml, setQuestionhmtl] = useState('')
    //console.log("in ClozeQuestionAttempt question = ", question)
    function format_cloze_question_content(question) {
        console.log(" calling format_cloze_question")
        let cloze_question_form = ''
         let isDropdown = false;
             var regExp = /\[.*?\]/g
             var matches = question.content.match(regExp);
             //matches =  [ '[^am/is]', '[^was/were]' ]
             for (var i = 0; i < matches.length; i++) {
                 var str = matches[i];
                 if (str.indexOf('/') >= 0 ) {
                     isDropdown = true;
                 }
             }
         // pound signs (#) denote new lines
         var content_with_new_lines = question.content.replace(/#/g,'<br><br>')
         //replace bracket contents with '*'
         var temp_sentence_with_stars = content_with_new_lines.replace(/ *\[[^\]]*]/g, ' * ');
         var sentence_parts = temp_sentence_with_stars.split(' ');
         //  sentence_parts =  [ 'I', '*', '', 'a', 'student.' ]
         let bracket_index = 0;
         let length_of_longest_word = 4;
        var self = this;
         sentence_parts.forEach(function (part) {
             if (part.trim() === '*' )  {
                     let bracket_content = matches[bracket_index].substring(1, matches[bracket_index].length - 1)
                                             let name = `answer_${bracket_index}`
                     let id = `cloze_answer_${bracket_index}`
                                         if (bracket_content.indexOf('^') >= 0 ) { //dropdown
                                                 cloze_question_form += `<select class = "cloze_answer" name="${name}" id="${id}">`
                                                 let words = bracket_content.split('/');
                     self.shuffle(words).forEach( (word, index)  => {
                         if (word.indexOf('^') >= 0 ) {
                             cloze_question_form += `<option value="${word.trim().slice(1)}">${word.trim().slice(1)}</option>`
                         }
                         else {
                             cloze_question_form += `<option value="${word}">${word}</option>`
                         }
                     })
                     cloze_question_form += `</select>`
                                         }
                                         else { //fill in the blank
                         let intput_length = length_of_longest_word + 2;
                     //cloze_question_form += `<input type="text" id= "cloze_answer_${bracket_index}" name= "answer_${bracket_index}" size = "${intput_length}">`
                     cloze_question_form += `<input type="text" class = "cloze_answer" id= "${id}" name= "${name}" size = "${intput_length}">`
                                         }
              bracket_index++;
             }
             else {
                 cloze_question_form += ( part + ' ' );
             }
         })
         return cloze_question_form
}



  return (
    <>
    <div>Question: {question.question_number}</div>
    <pre></pre>
    <div dangerouslySetInnerHTML={{ __html: clozehtml }}></div>
    </>
  )
}

export default ClozeQuestionAttempt