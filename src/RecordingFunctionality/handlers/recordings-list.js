export function deleteAudio(audioKey, setRecordings) {
  setRecordings((prevState) =>
    prevState.filter((record) => record.key !== audioKey)
  );
}

export const predictEmotion = (file,setIsFinished,setIsLoading,setPrediction) => {
  const formData = new FormData();
  formData.append("recording", file);
  console.log({file});
  fetch("http://localhost:8081", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setIsFinished(true);
      setIsLoading(false);
      setPrediction(response)
    })
    .catch((error) => console.error(error));
};
