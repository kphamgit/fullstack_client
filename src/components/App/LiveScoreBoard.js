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
function LiveScoreBoard() {
    
    let students_basic = [
        ["basic","linhdan"],
        ["lockim", "giabinh"],
        ["bichphuong", "khanhyen"],
        ["thienkim", "quocminh"], 
        ["nhatminh"]
    ];
    let students_intermediate = [
        ['basic','nguyenkhang'],
        ['honghoa', 'dinhchuong']
    ];

  return ( 
        <table> 
            <tbody>
                {students_basic.map((rowContent, rowID) => (
                    <TableRow
                        rowContent={rowContent}
                    />
                ))}
            </tbody>
        </table>
     
  );
}

export default LiveScoreBoard