import React from "react";
import Record from "./Record";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";

function ShowInterview({ questions, data, interviewId }) {
  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search);

  return (
    <div className="flex items-center w-full">
      {/* questions */}
      <div className="flex flex-col px-2 mt-3 space-y-4 w-1/2">
        {questions.map((question) => (
          <div
            key={question._id}
            onClick={() =>
              history.push(`${location.pathname}?questionId=${question._id}`)
            }
            className="w-1/2 bg-gray-300 shadow-lg rounded-md px-2 cursor-pointer"
          >
            <p className="text-center text-black font-semibold">
              {question.question}
            </p>
          </div>
        ))}
      </div>
      {/* video interview  */}
      <div className="w-1/2">
        {!query.questionId && <h3>Please select a question to start!</h3>}
        {query.questionId && <Record data={data} interviewId={interviewId} />}
      </div>
    </div>
  );
}

export default ShowInterview;
