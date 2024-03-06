import React, {useRef, useEffect} from 'react'

function Canvas2({text}) {
    const canvasRef = useRef();
    let ctx = useRef(null)

    
    function drawWords(context, text, x, y, maxWidth, lineHeight, rectHeight, words) {
      var line = '';
      for(var n = 0; n < words.length; n++) {
           var testLine = line + words[n] + ' ';
           var metrics = context.measureText(testLine);
           var testWidth = metrics.width;
           if (testWidth > maxWidth && n > 0) {
             context.fillText(line, x, y);
             line = words[n] + ' ';
             y += lineHeight;
           }
           else {
             line = testLine;
           }
         }
         context.fillText(line, x, y);
          rectHeight=rectHeight + lineHeight; 
   }

      useEffect(() => {
        //
        const drawALine = (text) => {
          console.log("drawing a line"+text)
          const textWidth = ctx.current.measureText(text).width + 20
          const textHeight = ctx.current.measureText(text).fontBoundingBoxAscent + ctx.current.
              measureText(text).fontBoundingBoxDescent + 10
              console.log("textWidth"+textWidth)
              console.log("textHeight="+textHeight)
        }

      
        
        var drawMe = function() {
          const canvas = canvasRef.current;
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
          // get context of the canvas
           ctx.current = canvas.getContext("2d");
          //ctx.current.font = 'italic bolder 50px Arial'
          ctx.current.font = 'bolder 40px Arial'
          //var img = document.getElementById('bg');
          canvas.width = 150;
          canvas.height = 150;
          ctx.current.clearRect(0, 0, canvas.width, canvas.height);
          //ctx.drawImage(img, 0, 0, 364, 662, 0, 0, 364,662);
          ctx.current.fillStyle = '#E1FFC7';
          var rectHeight=50;
          let text ="Maecenas blandit metus ac pretium tincidunt. Et congue consectetur";
          var maxWidth = 220;
              var lineHeight = 25;
              var x = 30;
              var y = 30; 
          const words =  text.split(' ');
          ctx.current.fillRect(20,20,250,words.length*4);
          ctx.current.fillStyle = 'black';
          drawWords(ctx.current, text, x, y, maxWidth, lineHeight,rectHeight,words)
        
        }

        const drawWords = (context, text, x, y, maxWidth, lineHeight, rectHeight, words) =>
         {
          var line = '';
          for(var n = 0; n < words.length; n++) {
               var testLine = line + words[n] + ' ';
               var metrics = context.measureText(testLine);
               var testWidth = metrics.width;
               if (testWidth > maxWidth && n > 0) {
                 context.fillText(line, x, y);
                 line = words[n] + ' ';
                 y += lineHeight;
               }
               else {
                 line = testLine;
               }
             }
             context.fillText(line, x, y);
             rectHeight=rectHeight + lineHeight; 
       }
       drawMe()
        //
      }, []);

    return (
        <div className="App">
          <h3>Write text on Canvas</h3>
          <canvas ref={canvasRef}></canvas>
        </div>
      );
}

export default Canvas2