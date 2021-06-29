import React, { useCallback, useRef, useState } from "react";
import { VideoCameraIcon, CheckIcon, BanIcon } from "@heroicons/react/outline";
import Webcam from "react-webcam";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";

function Record({ data, interviewId }) {
  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState({});
  const [finishCapturing, setFinishCapturing] = useState(false);

  const handleStartCapture = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks(data);
      }
    },
    [setRecordedChunks]
  );

  const handleStopCapture = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setFinishCapturing(true);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const lastSaveVideo = async () => {
    const blob = new Blob([recordedChunks], {
      type: "video/webm",
    });

    const video = new File([blob], `${Math.floor(Math.random() * 999)}-video`, {
      lastModified: new Date(),
      type: blob.type,
    });
    const formData = new FormData();
    formData.append("nom", data.nom);
    formData.append("prenom", data.prenom);
    formData.append("email", data.email);
    formData.append("telephone", data.telephone);
    formData.append("video", video);
    formData.append("interview", interviewId);
    formData.append("question", query.questionId);
    fetch(
      `http://localhost:5100/api/jobs/interview/${interviewId}/${query.questionId}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    history.push(location.pathname);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="position-relative mt-5">
        <Webcam
          videoConstraints={{ deviceId: localStorage.getItem("cameraId") }}
          ref={webcamRef}
        />
        {!capturing && (
          <>
            <div className="position-absolute top-0 right-0" />
            <button
              onClick={handleStartCapture}
              className="btn position-absolute d-flex top-2 right-3 bg-red text-white px-3 py-2"
            >
              <VideoCameraIcon style={{ height: "1.5rem" }} />
              <p>Record</p>
            </button>
          </>
        )}
        {capturing && (
          <button
            onClick={handleStopCapture}
            className="btn position-absolute d-flex top-2 right-3 bg-red text-white px-3 py-2"
          >
            <BanIcon style={{ height: "1.5rem" }} />
            <p>Stop</p>
          </button>
        )}
        {finishCapturing && (
          <button
            onClick={lastSaveVideo}
            className="btn position-absolute d-flex top-2 left-3 bg-green text-white px-3 py-2"
          >
            <CheckIcon style={{ height: "1.5rem" }} />
            <p>Save</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default Record;
