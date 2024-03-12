import React, {useRef, useState, useEffect} from 'react'
import styles from './MatchCard.module.css';

function TextCard({text, handleChoice, flipped}) {
    const canvasRef = useRef();
    let ctx = useRef(null)

    const [ourText, setOurText] = useState("")
    const msg = new SpeechSynthesisUtterance()
    msg.volume = 1; // From 0 to 1
    msg.rate = .8; // From 0.1 to 10
    //msg.pitch = 2; // From 0 to 2
    msg.lang = 'en';

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
        canvas.width = 130;
        canvas.height = 130;
        //ctx.current.clearRect(0, 0, canvas.width, canvas.height);
        ctx.current.fillStyle = '#E1FFC7';
        //var rectHeight=50;
        //let text ="One two three four five six seven five nine ten eleven twelve thirteen";  
        var maxWidth = 0;
        var lineHeight = 20;
        var x = 15;
        var y = 20; //distance from viewport origin to baseline of first line
                    //default to alphabetic. See document for canvas/text baseline
        //console.log(">>>>>>"+text.index)
        //let y = 35 + parseInt(text.index) * 160
        const words =  text.src.split(' ');
        //console.log("text = ",text)
        ctx.current.fillRect(0,0,130,130);
        ctx.current.fillStyle = 'blue';
        //drawWords(text, x, y, maxWidth, lineHeight,rectHeight,words)
        drawWords(text.src, x, y, maxWidth, lineHeight)
        //const data_url = canvas.toDataURL('image/jpeg');
        //console.log(data_url)
        //wrapText("I am a student and a teacher at the same time",8,9,110,13)
      }, [text]);

      const handleClick = (e) => {
        handleChoice(text)
        //console.log(text)
        msg.text = text.src
        msg.voice = window.speechSynthesis.getVoices()[1];
        window.speechSynthesis.speak(msg)
      }
    return (
      <>
      
        <div className={styles.card}>
          <div className= {flipped ? styles.flipped : ""} >
          <canvas className={styles.front} onClick={handleClick} ref={canvasRef}></canvas>
          <img 
            className = {styles.back}
            src="https://kevinphambucket.s3.amazonaws.com/images/b/basketball.jpeg" 
            onClick={handleClick}
            alt="card back" 
          />
          </div>
        </div>
      </>
      );
}

export default TextCard