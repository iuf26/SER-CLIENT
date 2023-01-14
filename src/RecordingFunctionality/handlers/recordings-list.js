export function deleteAudio(audioKey, setRecordings) {
  setRecordings((prevState) =>
    prevState.filter((record) => record.key !== audioKey)
  );
}

export const predictEmotion = (file,setIsFinished,setIsLoading,setPrediction) => {
  const formData = new FormData();
  const MODEL_URL = "https://18.192.42.57:8081";
  const LOCAL_URL = "http://localhost:8081";
  formData.append("recording", file);
  fetch(MODEL_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((response) => {
      setIsFinished(true);
      setIsLoading(false);
      setPrediction(response)
    })
    .catch((error) => console.error(error));
};
