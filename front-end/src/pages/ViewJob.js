import { BriefcaseIcon } from "@heroicons/react/outline";
import axios from "axios";
import Questions from "components/Questions";
import UpdateForm from "components/UpdateForm";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

function ViewJob({ jobId }) {
  const history = useHistory();
  const [job, setJob] = useState({});
  const [created, setCreated] = useState("");
  const [interviewUrl, setInterviewUrl] = useState("");
  const [affiche, setAffiche] = useState({
    update: false,
    questions: false,
  });
  useEffect(() => {
    axios.get(`http://localhost:5100/api/jobs/${jobId}`).then((resp) => {
      setJob(resp.data.job);
      setCreated(resp.data.job.createdAt);
      setInterviewUrl(resp.data.job.interview.url);
    });
  }, [jobId]);

  const deleteJob = () => {
    axios.delete(`http://localhost:5100/api/jobs/${jobId}`).then(() => {
      history.push("/admin/tab2");
    });
  };
  return (
    <>
      <div className="flex items-center space-x-3 mb-2 pt-2 border-b-2 border-gray-800 pb-2 bg-gray-300">
        <BriefcaseIcon className=" h-24 border-2 text-purple-500 rounded-full border-purple-400 p-4" />
        <h2>View Job</h2>
      </div>
      <div className="flex space-x-5">
        <div className="flex flex-col space-y-3 bg-white shadow-lg px-3 py-3 w-1/3 ml-2 h-1/3">
          <div className="flex space-x-2 items-center pb-2 border-b border-gray-500">
            <BriefcaseIcon className="h-8" />
            <h4>{job.title}</h4>
          </div>
          <span className="pt-2 font-bold text-black">
            Created at: {`${created.slice(0, 10)} ${created.slice(11, 19)}`}
          </span>
          <span className="pt-2 font-bold text-black">Created by: </span>
          <span className="pt-2 font-bold text-black">
            Interview:{" "}
            <Link
              to={`/interview/${job?.interview?._id}`}
              className="text-blue-700 font-semibold"
            >
              {interviewUrl}
            </Link>
          </span>
          <div className="flex space-x-2">
            <button
              className="btn-update"
              onClick={() =>
                setAffiche({ questions: false, update: !affiche.update })
              }
            >
              {affiche.update ? "Hide" : "Update"}
            </button>
            <button className="btn-delete" onClick={deleteJob}>
              Delete
            </button>
            <button
              className="btn-qs"
              onClick={() =>
                setAffiche({ questions: !affiche.questions, update: false })
              }
            >
              {affiche.questions ? "Hide" : "Questions"}
            </button>
          </div>
        </div>
        {affiche.questions && <Questions jobId={jobId} />}
        {affiche.update && <UpdateForm jobId={jobId} />}
      </div>
    </>
  );
}

export default ViewJob;
