import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setStudentScores } from '../../redux/studentscores';
import { SocketContext } from './Home';
import ScoreRow from './ScoreRow';


function TableRow({rowContent}) {
    
    let row = rowContent
        return (
            <tr>
                {row.map((student_name, index) => (
                    <>
                    <td key={index} >&nbsp;{student_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td key={student_name}><ScoreRow student_name={student_name} /></td>
                    </>
 ))}
            </tr>
        );
}

const chunk = (arr, size) =>
//break arr into chunks of size 'size'
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
  /*
function chunk(arr, size) { //this code works , too,
    //recursively break arr into chunks 
    //basically turn arr into a two dimensional array
    var subArrayCount = arr.length / size;
    var res = []; 
    for (var i = 0; i < subArrayCount; i++) {
        var from = size * i;
        var to = (size * (1 + i));
        //console.log(to)
        var sliced = arr.slice(from, to);
        res.push(sliced);
    }   
    return res;
}
*/

 function LiveScoreBoard({class_id}) {
    const [studentnames, setStudentNames] = useState([])
    const student_scores = useSelector((state) => state.studentscores.value)
    const rootpath = useSelector((state) => state.rootpath.value)
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()

    useEffect(() => {
        
        async function fetchData() {
          // You can await here
          //console.log("in useEffect LiveScoreBoard")
            const url = rootpath + `/api/classes/${class_id}`
            const response = await axios.get(url)
            //setStudentNames(response.data)
            setStudentNames(chunk(response.data, 2))
            let temp = []
            response.data.forEach( (name) => {
                temp.push({student_name: name, score: 0 })
            })
            dispatch(setStudentScores(temp))
        }
        fetchData()
      
    },[socket, dispatch, class_id])
    
  return ( 
        <table> 
            <tbody>
            <tr>
                {student_scores.map((row, index) => (
                    <>
                    <td key={index} >&nbsp;{row.student_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td key={row.student_name}><ScoreRow student_name={row.student_name} /></td>
                    </>
 ))}
            </tr>
            </tbody>
        </table>
     
  );
}

export default LiveScoreBoard