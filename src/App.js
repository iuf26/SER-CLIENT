import "./App.css";
import "semantic-ui-css/semantic.min.css";
import RecorderControls from "./RecordingFunctionality/components/recorder-controls";
import RecordingsList from "./RecordingFunctionality/components/recordings-list";
import useRecorder from "./RecordingFunctionality/hooks/useRecorder";

function App() {
  const { recorderState, addRecording, ...handlers } = useRecorder();
  const { audio } = recorderState;
  return (
    <section className="voice-recorder">
      <h1 className="title">SER - Happy - Sad</h1>
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
}

export default App;
