import React from "react";
import MicRecorder from 'mic-recorder-to-mp3';
//import {RecordView} from './RecordView'
import RecordView from './RecordView.js'

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function Home() {
  
  return (
    <>
      <div>HOME</div>
      <RecordView />
      </>
  );
}
