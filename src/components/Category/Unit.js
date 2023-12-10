import React from "react";
import Quiz from "./Quiz";

export default function Unit(props) {

    return(
        <>
        <h2>{props.content.name}</h2>
        <ul>
        {props.content.quizzes && <ul>
        {props.content.quizzes.map((quiz) =>  
              (<li key = {quiz.id}>
                <Quiz quiz_content={quiz}/>
              </li> 
              )
          )}
      </ul>}
        </ul>
        </>
    )
}