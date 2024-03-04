import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from './Home';
import { useSelector, useDispatch } from 'react-redux';
import { setStudentScores } from '../../redux/studentscores';

/*
const styles={
    textContainer:{
      display:"flex", 
      justifyContent:'space-evenly', 
      alignItems:'center'}
  }
*/

function ScoreRow({student_name}) {
    const socket = useContext(SocketContext);
    //const [clearScoreboard, setClearScoreboard] = useState(false)
    const [score, setScore] = useState(null)
    const [totalscore, setTotalScore] = useState(null)
    const studentscores = useSelector((state) => state.studentscores.value)
    const dispatch = useDispatch()
    const [maxScore, setMaxScore] = useState(false)
    const [livequestionnumber, setLiveQuestionNumber] = useState(null)

    useEffect(() => {
        socket.on('reset_scoreboard', () => {
            //setClearScoreboard(true)
            setScore(null)
            setTotalScore(null)
            setLiveQuestionNumber(null)
        })
        return () => {
            //event registration cleanup (happens upon component dismount)
            //i.e, user goes to another link/route/page
            socket.off("reset_scoreboard")
        }   
    },[socket])

    useEffect(() => {
        socket.on('live_score', arg => {
            if(arg.user === student_name) {
                //console.log("XXXXXXXXXXXXXX",arg)
                setScore(arg.score)
                console.log(")))))))"+arg.livequestionnumber)
                setLiveQuestionNumber(parseInt(arg.livequestionnumber))
                //studentscores is a two-dimensional array. Convert to one-dimension to use the find function
                //const one_dimension_arr = [].concat(...studentscores);
                //find student object for this student in redux store
                const student_obj = studentscores.find(x => x.student_name === student_name);
                let total_score_for_this_student = parseInt(student_obj.score) + parseInt(arg.score)
                //update total_score state for this component
                setTotalScore(total_score_for_this_student)
                //also update state for this student in redux store
                const modifiedScores = studentscores.map(obj => {
                    if (obj.student_name === arg.user) {
                     return { ...obj, score: total_score_for_this_student };
                    }
                     return obj;
                });
                dispatch(setStudentScores(modifiedScores))
            }
        })
        
        return () => {
            socket.off("live_score")
        }   
    }, [socket, student_name, studentscores, dispatch])

    useEffect(() => {
        const maxObj = studentscores.reduce((p, c) => p.score > c.score ? p : c);
        if (maxObj.score > 0 ) { //make sure that there's at least a non-zero score
             //there may be more than one student with max total score
            // so filter them out
            const students_with_max_score = studentscores.filter(x => x.score === maxObj.score);
            //find me in list of students_with_max_score
            const match = students_with_max_score.find(x => x.student_name === student_name);
            if (match === undefined) {    //I am not list max score list
                setMaxScore(false)
            }
            else {  //I'm in max score list
                 setMaxScore(true)
            }
        }
    },[studentscores, student_name])

  return (
    <>
        <span>{student_name}&nbsp;</span>
        {livequestionnumber && 
            <span>{livequestionnumber}&nbsp;&nbsp;</span>
        }
        {score &&
            <span>{score}&nbsp;&nbsp;&nbsp;</span>
        }
        <span style={ maxScore ? {backgroundColor:"yellow"} : {backgroundColor:"lightgray"}}>{totalscore}</span>
    </>
  )
}

export default ScoreRow