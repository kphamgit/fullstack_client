import { faL } from '@fortawesome/free-solid-svg-icons';
import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
//import {Dictaphone} from './Dictaphone'
//import  Dictaphone  from './Dictaphone.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function RecordView({socket})  {
 
  const [isBlocked, setIsBlocked] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [hasbeenSent, setHasBeenSent] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [myblob, setMyBlob] = useState([0])
  const [receivedBlobURL, setReceivedBlobURL] = useState('')
  const username = useSelector((state) => state.username.value)

  const isTeacher = (username === 'kpham');

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();  


  //console.log("XXXXXXXXXXXXXXXXXXXXMMMMMMMMM "+isTeacher)
  //const startRecognition = useRef(null)
  //const stopRecognition = useRef(null)

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
  },[isBlocked])

  
  useEffect(() => {
    if (username == 'kpham') {
    socket.on('recording', arg => {
       console.log(" in socket ON Chat Recording arg.blob = ",arg.blob)     
       const the_blob = new Blob([arg.blob], {type:'audio/mp3'});
       const ablobURL = URL.createObjectURL(the_blob)
       setReceivedBlobURL(ablobURL)

        //setChats(senderChats)
        //setChats([...chats , senderChats])
    })
      return () => {
          //event registration cleanup
          console.log("cleaned up recording")
          socket.off("recording")
        };
      }
  }, [socket, username]);

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
           setIsRecording(true);
           //startRecognition.current();
           resetTranscript()
           listenContinuously()
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
        setMyBlob(blob)
        setHasBeenSent(false)
        //stopRecognition.current();
        //socket.emit('recording', blob);
        console.log("STOPPING ")
        SpeechRecognition.stopListening()
        //this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  const send = () => {
    socket.emit('recording', {blob: myblob, username: username});
    setHasBeenSent(true)
  };
  //speech recognition
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });
  };

  return (
    <>
    <div>
             <div>
                <span>{transcript}</span>
              </div>
          <button 
              style={{backgroundColor: isRecording ? "green" : "red"  }} 
              onClick={start} disabled={isRecording}>Record
          </button>
          &nbsp;&nbsp;
          <button onClick={stop} disabled={!isRecording}>Stop</button>
          &nbsp;&nbsp;
          <button onClick={send} disabled={hasbeenSent} >Send</button>
          <br />
          <audio src={blobURL} controls="controls" />
          {isTeacher && <audio src={receivedBlobURL} controls="controls" />}

    </div>
    </>
  );
};

