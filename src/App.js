import RecorderControls from "./RecordingFunctionality/components/recorder-controls";
import RecordingsList from "./RecordingFunctionality/components/recordings-list";
import useRecorder from "./RecordingFunctionality/hooks/useRecorder";
import "./App.css"
import 'semantic-ui-css/semantic.min.css'
import {DragDropFiles} from "./components/DragDropFiles.jsx"

function App() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  return (
    <section className="voice-recorder">
    <h1 className="title">Voice Recorder</h1>
    <div className="recorder-container">
      <RecorderControls recorderState={recorderState} handlers={handlers} />
      <RecordingsList audio={audio}/>
    </div>
  </section>
  );
 // return <DragDropFiles/>
}

export default App;
