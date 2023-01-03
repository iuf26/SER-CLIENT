import { useState, useRef } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { convert } from "../utils/convert";

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const [response,setResponse] = useState("");
  const inputRef = useRef();
  const [url, setUrl] = useState();
  const recorderControls = useAudioRecorder();

  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    setUrl(url);
    const file = new File([blob],'voice',{type:blob.type});
    let sourceAudioFile = file;
    let targetAudioFormat = 'wav'
    let convertedAudioDataObj = await convert(sourceAudioFile, targetAudioFormat);
    fetch(convertedAudioDataObj.data).then(resp => resp.blob()).then(blob => {
      const wavFile = new File([blob],"voice-wav",{type:blob.type})
      setFiles([wavFile])
    })
    
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
    console.log(event.dataTransfer.files);
  };

  // send files to the server // learn from my other video
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("recording", files[0]);
    fetch("http://localhost:8081", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {console.log(response);setResponse(JSON.stringify(response))})
      .catch((error) => console.error(error));
  };

  if (files)
    return (
      <div className="uploads">
        <ul>
          {Array.from(files).map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
        <div className="actions">
          <button onClick={() => setFiles(null)}>Cancel</button>
          <button onClick={handleUpload}>Upload</button>
        </div>
        <div>
            Response: {response}
        </div>
      </div>
    );

  return (
    <>
      <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
        <h1>Drag and Drop Files to Upload</h1>
        <h1>Or</h1>
        <input
          type="file"
          multiple
          onChange={(event) => setFiles(event.target.files)}
          hidden
          accept="audio/wav"
          ref={inputRef}
        />
        <button onClick={() => inputRef.current.click()}>Select Files</button>
        <button>Record</button>
        <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
      </div>
    </>
  );
};

export default DragDropFiles;
