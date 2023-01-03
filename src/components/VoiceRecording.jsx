import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import ReactPlayer from "react-player";

export const VoiceRecording = () => {
  const [url, setUrl] = useState();
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setUrl(url);
    console.log(url);
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
      
        {/* <ReactPlayer
          url={url}
          playing
          onReady={() => console.log("onReady")}
          onStart={() => console.log("onStart")}
        /> */}
        
      
    </div>
  );
};
