import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InterviewForm from "./InterviewForm";

function Interview({ match }) {
  const [interview, setInterview] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5100/api/jobs/${match.params.id}/interview`)
      .then((data) => {
        setInterview(data.data.interview);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8 flex flex-col items-center">
        <h2 className="text-center text-white">{`${interview?.job?.title} Interview`}</h2>
        <Link
          className="mt-3 bg-gray-400 px-5 py-2 text-white"
          to="/admin/tab2"
        >
          Home
        </Link>
      </div>
      <InterviewForm interview={interview} interviewId={match.params.id} />
    </>
  );
}

export default Interview;
