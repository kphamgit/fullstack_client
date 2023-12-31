import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

//export default function Dictaphone() {
  const Dictaphone = () => {
    const [message, setMessage] = useState('');
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      useEffect(() => {
        if (finalTranscript !== '') {
         console.log('Got final result:', finalTranscript);
        }
        }, [interimTranscript, finalTranscript]);

        if (!browserSupportsSpeechRecognition) {
            return <span>Browser doesn't support speech recognition.</span>;
          }

        const listenContinuously = () => {
            SpeechRecognition.startListening({
              continuous: true,
              language: 'en-US',
            });
          };

          return (
            <div>
              <div>
                <span>
                  listening:
                  {' '}
                  {listening ? 'on' : 'off'}
                </span>
                <div>
                  <button type="button" onClick={resetTranscript}>Reset</button>
                  <button type="button" onClick={listenContinuously}>Listen</button>
                  <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
                </div>
              </div>
              <div>
                {message}
              </div>
              <div>
                <span>{transcript}</span>
              </div>
            </div>
          );
};
export default Dictaphone;