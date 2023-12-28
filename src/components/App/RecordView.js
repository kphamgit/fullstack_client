import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState } from 'react';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function RecordView()  {
 
  const [isBlocked, setIsBlocked] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [blobURL, setBlobURL] = useState('')

  useEffect( () => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        setIsBlocked(false)
      },
      () => {
        console.log('Permission Denied');
        //this.setState({ isBlocked: true })
        setIsBlocked(true)
      },
    );
  })

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
           setIsRecording(true);
        }).catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setIsRecording(false);
        setBlobURL(blobURL)
        console.log("STOPPING ")
        //this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  return (
    <div>
            <button onClick={start} disabled={isRecording}>Record</button>
          <button onClick={stop} disabled={!isRecording}>Stop</button>
          <audio src={blobURL} controls="controls" />
    </div>
  );
};

