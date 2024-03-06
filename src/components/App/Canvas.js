import React, { useRef, useEffect } from "react";

const Canvas = ({text}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext("2d");
    //default size of a canvas element is 300 * 150
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    // context.clearRe(0, 0, 500, 500);
    context.font = "24px Georgia";
    context.fillText(text, 150, 150);
  }, [text]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;