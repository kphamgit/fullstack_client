//import { faL } from '@fortawesome/free-solid-svg-icons';
import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//import {Dictaphone} from './Dictaphone'
//import  Dictaphone  from './Dictaphone.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function RecordView({socket, studentGroup})  {
 
  const [isBlocked, setIsBlocked] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [hasbeenSent, setHasBeenSent] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [myblob, setMyBlob] = useState([0])
  //const [receivedBlobURL, setReceivedBlobURL] = useState('')
  const username = useSelector((state) => state.username.value)
  //const [studentGroup, setStudentGroup] = useState('intermediate')

  const isTeacher = (username === 'kpham');

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();  

/*
  useEffect(() => {
    if (finalTranscript !== '') {
     console.log('Got final result:', finalTranscript);
    }
    }, [interimTranscript, finalTranscript]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
      */
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
    if (username === 'kpham') {
    socket.on('recording', arg => {
       //console.log(" in socket ON Chat Recording arg.blob = ",arg.username)     
       let audio_tag = document.getElementById(arg.username)
       const the_blob = new Blob([arg.blob], {type:'audio/mp3'});
       audio_tag.src = URL.createObjectURL(the_blob)
       //setReceivedBlobURL(ablobURL)
        //setChats(senderChats)
        //setChats([...chats , senderChats])
    })
      return () => {
          //event registration cleanup
          //console.log("cleaned up recording")
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
        //console.log("STOPPING ")
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
    //console.log("listening continuously")
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });
  };

  let students_intermediate = ["basic","linhdan", "lockim", "giabinh", "khanhyen", "thienkim", "quocminh"]
  let students_big = ['basic','nguyenkhang', 'honghoa', 'dinhchuong']

  return (
    <>
    <div>
      
             <div style={{color:'white'}}>
                <p>{listening && 'Listening...'}</p>
                <span style={{color:'white'}}>{transcript}</span>
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
          {isTeacher && (
            <div>
            {studentGroup === 'intermediate' ? (
              <> 
              {students_intermediate.map((student, index) =>  
                (<div key = {index}>
                   <div><audio id = {student} src="" controls="controls" /></div> 
                </div> 
                )
            )}
              </>
            )
             :
             (
              <>
             {students_big.map((student, index) =>  
                (<div key = {index}>
                   <div><audio id = {student} src="" controls="controls" /></div> 
                </div> 
                )
            )}
              </>
             )
            }
            </div>
          )}
    </div>
    </>
  );
};

