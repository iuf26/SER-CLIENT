import RecorderControls from "./RecordingFunctionality/components/recorder-controls";
import RecordingsList from "./RecordingFunctionality/components/recordings-list";
import useRecorder from "./RecordingFunctionality/hooks/useRecorder";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { DragDropFiles } from "./components/DragDropFiles.jsx";
import useRecordingsList from "./RecordingFunctionality/hooks/use-recordings-list";

function App() {
  const { recorderState, addRecording, ...handlers } = useRecorder();
  const { audio } = recorderState;
  return (
    <section className="voice-recorder">
      <h1 className="title">Voice Recorder</h1>
      <div className="recorder-container">
        <RecorderControls
          recorderState={recorderState}
          handlers={handlers}
          addRecording={addRecording}
        />
        <RecordingsList audio={audio} />
      </div>
    </section>
  );
  // return <DragDropFiles/>
}

export default App;
