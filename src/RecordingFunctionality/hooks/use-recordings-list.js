import { useState, useEffect } from "react";
import { deleteAudio, predictEmotion } from "../handlers/recordings-list";
import generateKey from "../utils/generate-key";

export default function useRecordingsList(audio) {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audio) {
      setRecordings((prevState) => {
        return [...prevState, { key: generateKey(), audio }];
      });
    }
  }, [audio]);


  return {
    recordings,
    deleteAudio: (audioKey) => deleteAudio(audioKey, setRecordings),
    predictEmotion: (audioKey,setIsFinished,setIsLoading,setPrediction) => {
      const file = recordings.find((elem) => elem.key === audioKey).audio;
      predictEmotion(file,setIsFinished,setIsLoading,setPrediction);
    },
  };
}
