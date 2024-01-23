import React from 'react'

function TableRow({rowContent}) {
    let row = rowContent
        return (
            <tr>
                {row.map((val, index) => (
                    <>
                    <td key={index} >&nbsp;{val}&nbsp;&nbsp;&nbsp;</td>
                    <td><span id={val}>&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;</td>
                    </>
 ))}
            </tr>
        );
}
function LiveScoreBoard({class_id}) {
    //console.log(class_id)
    const get_students = (my_class_id) => {
        if (my_class_id === 1) {
            return [
                ['basic1','nguyenkhang'],
                ['honghoa', 'dinhchuong']
             
            ]
        }
        else if (my_class_id === 2 ) {
            return [
                ["basic2","linhdan"],
                ["lockim", "giabinh"],
                ["bichphuong", "khanhyen"],
                ["thienkim", "quocminh"], 
                ["nhatminh"]
            ]
        }
        else if (my_class_id === 3) {
            return [
                ["basic3","tramanh","nguyenchuong"]
            ]
        }
        else {
            return []
        }
    }
    
  return ( 
        <table> 
            <tbody>
                {get_students(class_id).map((rowContent, rowID) => (
                    <TableRow key={rowID}
                        rowContent={rowContent}
                    />
                ))}
            </tbody>
        </table>
     
  );
}

export default LiveScoreBoard