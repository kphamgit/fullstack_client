import React, {useRef, useEffect} from 'react'

function Canvas1({text}) {
    const canvasRef = useRef();
    let ctx = useRef(null)

      useEffect(() => {
        // drawWords(text, x, y, maxWidth, lineHeight)
        const drawWords = (text_line, x, y, maxWidth, lineHeight) => {
            // ctx.wrapText(randomized[index].text,8,9,110,13);
            //function (text_line, x, y, maxWidth, lineHeight) {
            let words = text_line.split(' ');
            let line = '';
            for (var n = 0; n < words.length; n++) {
                //console.log("----------------------")
               //console.log(" n="+n+ " word ="+words[n])
                let testLine = line + words[n] + ' ';
                //console.log("testLine="+testLine)
                ctx.current.font = 'bolder 16px Arial'
                //need to set font before calling measureText!!!
                let metrics = ctx.current.measureText(testLine);
                //console.log("test width="+metrics.width)
                //console.log("max width="+maxWidth)
                let testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    //note: y is the distance from coordinate origin to text baseline
                    //default to "alphabetic" (baseline touches bottom of text)
                    ctx.current.fillText(line, x, y);
//
            //ctx.current.textBaseline = "alphabetic";
            //draw baselines for testing
            /*
            ctx.current.beginPath();
            ctx.current.moveTo(0, y + 0.5);
            ctx.current.lineTo(550, y + 0.5);
            ctx.current.stroke();
            */
//
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.current.fillText(line, x, y);
            y += lineHeight;
        }
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth
        canvas.lineHeight = window.innerHeight
        // get context of the canvas
         ctx.current = canvas.getContext("2d");
        canvas.width = 364;
        canvas.height = 900;
        //ctx.current.clearRect(0, 0, canvas.width, canvas.height);
        ctx.current.fillStyle = '#E1FFC7';
        //var rectHeight=50;
        //let text ="One two three four five six seven five nine ten eleven twelve thirteen";  
        var maxWidth = 150;
        var lineHeight = 25;
        var x = 20;
        var y = 35; //distance from viewport origin to baseline of first line
                    //default to alphabetic. See document for canvas/text baseline

        const words =  text.split(' ');
        ctx.current.fillRect(20,20,150,150);
        ctx.current.fillStyle = 'black';
        //drawWords(text, x, y, maxWidth, lineHeight,rectHeight,words)
        drawWords(text, x, y, maxWidth, lineHeight)
        const data_url = canvas.toDataURL('image/jpeg');
        //console.log(data_url)
        /*
        //ctx.current.font = 'italic bolder 50px Arial'
        ctx.current.font = 'bolder 50px Arial'
        const text = "Box green Text j12345";
        const textWidth = ctx.current.measureText(text).width + 20
        const textHeight = ctx.current.measureText(text).fontBoundingBoxAscent + ctx.current.
            measureText(text).fontBoundingBoxDescent + 10
            console.log("textWidth"+textWidth)
        ctx.current.fillStyle = 'red'
        ctx.current.fillRect(50, 50, textWidth, textHeight);

        ctx.current.fillStyle = 'blue'
        ctx.current.textAlign = 'center'
        ctx.current.textBaseline = 'middle'
        ctx.current.fillText(text,50+ (textWidth/2),50 + (textHeight/2))
        */
        //wrapText("I am a student and a teacher at the same time",8,9,110,13)
      }, [text]);

      const handleClick = (e) => {
        console.log("EEEEEEEEE")
      }
    return (
        <div className="App">
          <canvas onClick={handleClick} ref={canvasRef}></canvas>
        </div>
      );
}

export default Canvas1