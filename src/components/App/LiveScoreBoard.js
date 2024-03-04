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
                {row.map((student_data, index) => (
                    <>
                    <td key={index}>
                        <ScoreRow 
                        student_name={student_data.student_name} 
                        />
                    </td>
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


 function LiveScoreBoard({class_id}) {
    const [studentnames, setStudentNames] = useState([])
    const student_scores = useSelector((state) => state.studentscores.value)
    const [tempArr, setTempArr] = useState([])
    //const [studentscoresmap, setStudentScoresMap] = useState([]) 
    const rootpath = useSelector((state) => state.rootpath.value)
    const socket = useContext(SocketContext);
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
          // You can await here
            const url = rootpath + `/api/classes/${class_id}`
            const response = await axios.get(url)
            //response.data is an array of strings = [ "nguyenkhang", "honghoa", "dinhchuong" ];
            //turn response.data into an array of objects with property "student_name"
            const arr_of_objects = response.data.map(student_name => ({student_name}));
            //add property "score:0" to this array and save to redux store
            dispatch(setStudentScores( arr_of_objects.map( item => ({ ...item, score:0 }) )) )
            //format a 2-dimension students scores array for display
            let temp_arr = []
            response.data.forEach( (name) => {
                temp_arr.push({student_name: name, score: 0 })
            })
            setTempArr(chunk(temp_arr,2) )       // 2 students each row
        }
        fetchData()
    },[socket, dispatch, class_id])
    
  return ( 
        <>
        <table> 
            <tbody>
                {tempArr.map((row, index) => (
                    <TableRow key={index}  rowContent={row} />
                ))}
            </tbody>
        </table>
     </>
  );
}

export default LiveScoreBoard